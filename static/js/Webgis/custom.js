/* Sửa các tham số ở dưới */
var baseUrl = "http://localhost:8080";
var workspace = "Webgis";
var layerName = "vnm_adminboundaries_candidate_vnm_admbnda_adm0_gov_20200103";
var layerName1 = "vnm_adminboundaries_candidate_vnm_admbnda_adm1_gov_20201027";
var layerName2 = "vnm_adminboundaries_candidate_vnm_admbnda_adm2_gov_20201027";

var styleDefault = "adm0";
var styleDefault1 = "adm1";
var styleDefault2 = "adm2";

// Tạo bản đồ OpenLayers
var layerPlus = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: `${baseUrl}/geoserver/${workspace}/wms`,
        params: {
            LAYERS: `${workspace}:${layerName2}`,
            STYLES: styleDefault2,
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }),
});

var layerProvince = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: `${baseUrl}/geoserver/${workspace}/wms`,
        params: {
            LAYERS: `${workspace}:${layerName1}`,
            STYLES: styleDefault1,
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }),
});

var layerPort = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: `${baseUrl}/geoserver/${workspace}/wms`,
        params: {
            LAYERS: `${workspace}:${layerName}`,
            STYLES: styleDefault,
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }),
});
var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
        })
    })
});
var vietnamCenter = ol.proj.fromLonLat([105.6958835, 16.762622]);
var format = "image/png";
// Khởi tạo bản đồ và thêm cả 2 lớp
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        layerPlus,
        layerPort,
        layerProvince,
        vectorLayer,
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([105.85, 21.02]), // Hà Nội
        zoom: 6
    })
});
  
map.on("singleclick", async function (evt) {
    var layer = $("#switchPort").is(":checked") ? layerPort : layerProvince;
    var view = map.getView();
    var viewResolution = view.getResolution();
    var url = layer.getSource().getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        view.getProjection(),
        {
            INFO_FORMAT: "application/json",
            FEATURE_COUNT: 10
        }
    );

    window.listInfor = [];

    if (url) {
        await $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resp) {
                if (resp && resp.features?.length > 0) {
                    for (const item of resp.features) {
                        listInfor.push(item.properties);
                    }

                    // Vẽ lại lớp vector
                    var vectorSource = new ol.source.Vector({
                        features: new ol.format.GeoJSON().readFeatures(resp),
                    });
                    vectorLayer.setSource(vectorSource);

                    // Tạo HTML bảng thông tin
                    let htmlInfo = `<h5>Thông tin hành chính</h5>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Tên tỉnh</th>
                                <th scope="col">Dân số trung bình</th>
                                <th scope="col">Tổng diện tích</th>
                                <th scope="col">Tuổi thọ trung bình</th>
                                <th scope="col">Đường đi</th>

                            </tr>
                        </thead>
                        <tbody>`;
                    
                    let htmlImage = `<h5>Những địa danh nổi tiếng</h5>
                    <table class="table table-bordered table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Tên địa danh</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Đường đi</th>
                            </tr>
                        </thead>
                        <tbody>`;

                  listInfor.forEach(infor => {
                    htmlInfo += `<tr>
                        <td>${infor.admin1na_1 || ""}</td>
                        <td>${infor.admin1altn || ""}</td>
                        <td>${infor.admin1refn || ""} Km</td>
                        <td>${infor.admin1al_1 || ""}</td>
                        <td><a href="/routing/?dest=${infor.admin1na_1 || ""}">Bắt đầu</a></td>

                    </tr>`;

                    const diaDanhArr = infor.admin1al_2 ? infor.admin1al_2.split(";") : [];
                    const hinhAnhArr = infor.admin1al_3 ? infor.admin1al_3.split(";") : [];
                
                    let rowHtml = "";
                    for (let i = 0; i < diaDanhArr.length; i++) {
                        const ten = diaDanhArr[i]?.trim();
                        const img = hinhAnhArr[i]?.trim();
                
                        rowHtml += `<tr>
                                        <td>${ten || "Không có địa danh"}</td>
                                        <td>${img 
                                            ? `<img src="${img}" width="120" height="80" class="img-thumbnail rounded" style="object-fit: cover;">` 
                                            : "Không có ảnh"}</td>
                                            <td><a href="/routing/?dest=${encodeURIComponent(ten || "")}">Bắt đầu</a></td>

                                    </tr>`;
                                    
                    }
                
                    htmlImage += rowHtml;
                });

                    htmlInfo += `</tbody></table>`;
                    htmlImage += `</tbody></table>`;
                    let fullHtml = htmlInfo + htmlImage;

                    showInfoPanel(fullHtml); // Hiển thị panel bên phải
                } else {
                    closeInfoPanel(); // Ẩn nếu không có thông tin
                }
            },
        });
    }
});


document.getElementById("fullscreen-button").addEventListener("click", function () {
    let mapElement = document.getElementById("map");

    if (!document.fullscreenElement) {
        if (mapElement.requestFullscreen) {
            mapElement.requestFullscreen();
        } else if (mapElement.mozRequestFullScreen) { // Firefox
            mapElement.mozRequestFullScreen();
        } else if (mapElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
            mapElement.webkitRequestFullscreen();
        } else if (mapElement.msRequestFullscreen) { // IE/Edge
            mapElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

function showInfoPanel(htmlContent) {
    document.getElementById("infoContent").innerHTML = htmlContent;
    document.getElementById("infoPanel").style.display = "block";
}

function closeInfoPanel() {
    document.getElementById("infoPanel").style.display = "none";
}
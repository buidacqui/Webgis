/* Sửa các tham số ở dưới */
var baseUrl = "http://localhost:8080";
var workspace = "Webgis";
var layerName = "vnm_adminboundaries_candidate_vnm_admbnda_adm0_gov_20200103";
var layerName1 = "vnm_adminboundaries_candidate_vnm_admbnda_adm1_gov_20201027";
var layerName2 = "vnm_adminboundaries_candidate_vnm_admbnda_adm2_gov_20201027";

var styleDefault = "adm0";
var styleDefault1 = "adm1";
var styleDefault2 = "adm2";

let arrCity = [
    1673.72, 1738.87, 1361.02, 1214.11, 1908.13, 1338.68, 1773.18, 1716.85,
    1663.76, 1631.2, 1617.55, 2016.81, 1726.94, 1174.56, 2043.43, 1653.99,
    1686.84, 1782.76, 1706.25, 1642.86, 1781.63, 1201.13, 1443.04, 1330.66,
    2012.04, 1400.53, 1428.15, 1812.15, 1749.18, 1471.74, 1421.21, 1439.05,
    1846.74, 1987.38, 1711.6, 1642.99, 1297.06, 1459.87, 1674.17, 1480.05,
    1842.78, 1495.3, 1488.45, 1351.02, 1527.81, 2156.36, 2039.3, 1835.33,
    1462.39, 2324.37, 1834.02, 1610.81, 1546.77, 1445.84, 1268.55, 1593.16,
    2232.52, 1748.78, 1807.9, 1223.26, 1744.4, 1314.27, 1427.39,
];

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
                    let html = `<table class="table table-bordered table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Tên tỉnh</th>
                                <th scope="col">Dân số trung bình</th>
                                <th scope="col">Tổng diện tích</th>
                                <th scope="col">Tuổi thọ trung bình</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    listInfor.forEach(infor => {
                        html += `<tr>
                            <td>${infor.admin1na_1 || ""}</td>
                            <td>${infor.admin1altn || ""}</td>
                            <td>${infor.admin1refn || ""} Km</td>
                            <td>${infor.admin1al_1 || ""}</td>
                        </tr>`;
                    });

                    html += `</tbody></table>`;

                    showInfoPanel(html); // Hiển thị panel bên phải
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
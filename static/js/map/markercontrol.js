// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
};

// Độ phóng đại khi bản đồ được mở
const zoom = 18;

// Tọa độ mặc định
const lat = 10.796501883372228;
const lng = 106.66680416611385;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

// Được dùng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='#'>LT GIS</a> cơ bản",
}).addTo(map);


// Tạo danh sách các địa điểm gồm vĩ độ, kinh độ và tên của địa điểm đó
let pointsCafe = [
    [10.796277842333827, 106.66692171944823, "CÕ Tea House & Coffee"],
    [10.79607043221434, 106.6674328521939, "Coi Xua Cafe"],
    [10.795702356899397, 106.66683564293746, "BINSUN COFFEE & TEA"],
    [10.795117136721534, 106.6664319966228, "Sung Ca Phê"],
];

const pointsNhaHang = [ 
    [10.79578534694128, 106.66710000668287, "Hương Cau 2"], 
    [10.79550750285199, 106.66622580412363, "Lẩu dê Tri kỷ"], 
    [10.795987566872768, 106.66588925403235, "Phở Phú Vương"], 
    [10.79694006846232, 106.66523263028328, "Nhà hàng Quá Ngon"], 
    [10.796278422026903, 106.6658538970941, "Bánh mì Nhà Lúa"], 
    [10.796186461235653, 106.6655664414166, "Wulao"], 
    [10.796252055146217, 106.66548974107106, "King BBQ Lê Văn Sỹ"], 
    [10.79628564798421, 106.6654421318612, "Orifood BBQ & Hotpot Lê Văn Sỹ"], 
    ];

// Sử dụng `LayerGroup` để thực hiện
const pA = new L.FeatureGroup();
const pB = new L.FeatureGroup();
const allMarkers = new L.FeatureGroup();

// Thêm marker đến layer pointsCafe
for (let i = 0; i < pointsCafe.length; i++) {
    marker = L.marker([pointsCafe[i][0], pointsCafe[i][1]]).bindPopup(pointsCafe[i][2]);
    pA.addLayer(marker);
}

// Thêm marker đến layer pointsNhaHang
for (let i = 0; i < pointsNhaHang.length; i++) {
    marker = L.marker([pointsNhaHang[i][0], pointsNhaHang[i][1]]).bindPopup(pointsNhaHang[i][2]);
    pB.addLayer(marker);
}

const overlayMaps = {
    "Cà phê": pA,
    "Nhà hàng/quán ăn": pB,
};

map.on("layeradd layerremove", function () {
    // tạo các đường biên rỗng
    let bounds = new L.LatLngBounds();

    // Lặp lại các layer của bản đồ
    map.eachLayer(function (layer) {
        // Kiểm tra xem lớp có phải là FeatureGroup không
        if (layer instanceof L.FeatureGroup) {
            // Mở rộng đường biên dựa trên group bounds
            bounds.extend(layer.getBounds());
        }
    });

    // Kiểm tra xem các đường biên có hợp lệ không
    if (bounds.isValid()) {
        map.flyToBounds(bounds);
    }
});

L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
        this._initLayout();
        this._addMarker();
        this._removeMarker();
        this._update();
        return this._container;
    },
    _addMarker: function () {
    this.createButton("Thêm", "add-button");
    },

    _removeMarker: function () {
    this.createButton("Xóa", "remove-button");
    },

    createButton: function (type, className) {
        const elements = this._container.getElementsByClassName(
            "leaflet-control-layers-list"
        );
        const button = L.DomUtil.create(
            "button",
            `btn-markers ${className}`,
            elements[0]
        );
        button.textContent = `${type} markers`;

        L.DomEvent.on(button, "click", function (e) {
            const checkbox = document.querySelectorAll(
                ".leaflet-control-layers-overlays input[type=checkbox]"
            );

            // Remove/add all layer from map when click on button
            [].slice.call(checkbox).map((el) => {
                el.checked = type === "Thêm" ? false : true;
                el.click();
            });
        });
    },
});

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);


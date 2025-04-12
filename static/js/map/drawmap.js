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

const Truong = L.polygon(
    [ 
        [10.796646364606142, 106.66708527087582], 
        [10.796736235249826, 106.66646009555878], 
        [10.797240865498882, 106.66655116203911], 
        [10.797198709914033, 106.66683748785057], 
        [10.797189488379063, 106.66683748785057], 
        [10.797165117178125, 106.66696623388287], 
        [10.797178949481602, 106.66696891609189], 
        [10.797148263935389, 106.6671822656203], 
        [10.796733762852362, 106.6671239934163], 
        [10.796724880680173, 106.66711595587091], 
    ],
    { 
        color: "blue", 
        className: "Truong", 
    }
); 
   
  const Place = L.polygon( 
    [ 
      [10.795818637312593, 106.66679660256901], 
      [10.795785703106535, 106.66692601915355], 
      [10.795717199946411, 106.66690925534726], 
      [10.795677678885358, 106.66694412406434], 
      [10.795550552766729, 106.66691461976534], 
      [10.795579534890932, 106.66682610686813], 
      [10.795491271140351, 106.6667878853898], 
      [10.79554989408206, 106.66671948906011], 
    ], 
    { 
        color: "red", 
        className: "place", 
    } 
);  
const truong = new L.FeatureGroup();
const place = new L.FeatureGroup();

// Thêm các polygon đến bản đồ
truong.addLayer(Truong);
place.addLayer(Place);

const overlayMaps = {
    Truong: truong,
    Place: place,
};

map.on("layeradd", function () {
    let bounds = new L.LatLngBounds();
    map.eachLayer(function (layer) {
        if (layer instanceof L.FeatureGroup) {
            bounds.extend(layer.getBounds());
        }
    });

    if (bounds.isValid()) {
        map.flyToBounds(bounds);
    } else {
        // Invalid, fit world
        // map.fitWorld();
    }
});

L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
        this._initLayout();
        this._removePolygons();
        this._update();
        return this._container;
    },

    _removePolygons: function () {
        this.createButton("remove", "Xóa tất cả các vùng ");
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
        button.textContent = className;
        L.DomEvent.on(button, "click", function (e) {
            const checkbox = document.querySelectorAll(
                ".leaflet-control-layers-overlays input[type=checkbox]"
            );
            // Xóa/thêm tất cả layer từ bản đồ khi click button
            [].slice.call(checkbox).map((el) => {
                el.checked = type === "add" ? false : true;
                el.click();
            });
        });
    },
});

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);

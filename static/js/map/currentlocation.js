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
//Được dùng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
    }).addTo(map);
    map
    .locate({
    // https://leafletjs.com/reference-1.7.1.html#locate-options-option
    setView: true,
    enableHighAccuracy: true,
    })
    // if location found show marker and circle
    .on("locationfound", (e) => {
    // marker
    const marker = L.marker([e.latitude, e.longitude]).bindPopup(
    "Your are here :)"
    );
    // circle
    const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
    weight: 2,
    color: "red",
    fillColor: "red",
    fillOpacity: 0.1,
    });
    // add marker
    map.addLayer(marker);
    // add circle
    map.addLayer(circle);
    })
    // if error show alert
    .on("locationerror", (e) => {
    alert("Location access denied.");
    });
// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};

// Độ phóng đại khi bản đồ được mở
const zoom = 18;
// Tọa độ Trường
const lat = 10.796501883372228;
const lng = 106.66680416611385;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

// Được dùng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);

// Tạo một marker
L.marker([lat, lng]).addTo(map).bindPopup("Đại học Tài nguyên và Môi trường TP.HCM");

// Lắng nghe sự kiện click trên bản đồ
map.on("click", function (e) {
    alert(e.latlng);
});

    // Được dùng để tải và trình các layer trên bản đồ
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="#">LT GIS</a> cơ bản',
}).addTo(map);


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

const funny = L.icon({
    iconUrl: "https://cntt.pmk.io.vn/ts-map-pin.png",
    iconSize: [50, 58], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
});

// create popup contents
const customPopup =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/7YwNSL01eEM?si=4T73sU7guDBBbkYV"' +
    ' title="YouTube video player" frameborder="0"' +
    ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
    ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

// specify popup options
const customOptions = {
    maxWidth: "auto", // set max-width
    className: "customPopup", // name custom popup
};

// create marker object, pass custom icon as option, pass content and options to popup, add to map
L.marker([lat, lng], {
    icon: funny,
})
    .bindPopup(customPopup, customOptions)
    .addTo(map);
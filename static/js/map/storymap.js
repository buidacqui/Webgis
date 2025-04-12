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
// [topleft, topright, bottomleft, bottomright]
L.control.zoom({ position: "topright" }).addTo(map);
// holder for all articles
const articles = document.querySelectorAll("article");
// setting a marker
function setMarker([lat, lng], title) {
const marker = L.marker([lat, lng], { title });
// add a marker to the map and create a popup
marker.addTo(map).bindPopup(title);
}
// map centering
function centerMap([lat, lng], target, title) {
const active = target.classList.contains("active");
// set the map to lat coordinates, lng
map.setView([lat, lng], 16);
// checking if the active class is already
// set, if not, set the marker
if (!active) {
setMarker([lat, lng], title);
}
}
// helper function to intersectionObserver
function onChange(changes) {
changes.forEach(function (change) {
// get data from html coordinates element
const data = change.target.dataset.coordinates;
// get title from html
const title = change.target.dataset.title;
if (change.intersectionRatio > 0) {
// center map
centerMap(JSON.parse(data), change.target, title);
// add class to article
change.target.classList.add("active");
}
});
}
// checking if IntersectionObserver is supported
if ("IntersectionObserver" in window) {
const config = {
root: null,
rootMargin: "0px",
threshold: [0, 0.25, 0.5, 0.75, 1],
};
let observer = new IntersectionObserver(onChange, config);
articles.forEach(function (article) {
observer.observe(article);
});
}
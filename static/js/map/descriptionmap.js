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

    const legend = L.control({ position: "bottomleft" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "description");

    L.DomEvent.disableClickPropagation(div);
    const text =
        "<b>Thu Điếu - Nguyễn Khuyến</b></br>" +
        "Ao thu Lạnh Lẽo nước trong veo,</br>" +
        "Một chiếc thuyền câu bé tẹo teo.</br>" +
        "Sóng biếc theo làn hơi gợn tí,</br>" +
        "Lá vàng trước gió sẻ đưa vèo.</br>" +
        "Tầng mây Lơ Lửng trời xanh ngắt,</br>" +
        "Ngõ trúc quanh co khách vắng teo.</br>" +
        "Tựa gối, ôm cần lâu chẳng được,</br>" +
        "Cá đâu đớp động dưới chân bèo.</br>";

    div.insertAdjacentHTML("beforeend", text);
    return div;
};

legend.addTo(map);


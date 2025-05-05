
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | GIS-Simplified'
});

var map = L.map('map', {
  center: [10.7769, 106.7009],
  zoom: 6,
  zoomControl: true,
  layers: [baseLayer],
});

var currentPosition = null;
var control = null;

const provinces = {
  "Hồ & Chùa Tà Pạ": [10.4056, 104.9561],
  "Hồ Ô Thum": [10.4096, 105.0264],
  "Rừng Tràm Trà Sư": [10.5483, 105.1235],

  "Ngọn Hải Đăng Vũng Tàu": [10.3359, 107.0792],
  "Biển Long Hải": [10.3651, 107.2583],
  "Hồ Tràm": [10.4656, 107.3789],

  "Nhà Công tử Bạc Liêu": [9.2841, 105.7239],
  "Tháp cổ Vĩnh Hưng": [9.8378, 105.6142],
  "Cánh đồng Điện Gió": [9.2572, 105.6861],

  "Khu lăng mộ cụ Nguyễn Đình Chiểu": [10.1444, 106.3836],
  "Cồn Phụng": [10.2217, 106.3472],
  "Bảo tàng Bến Tre": [10.2346, 106.3757],

  "Khu du lịch Đại Nam": [11.0868, 106.6676],
  "Hồ Dầu Tiếng": [11.4464, 106.3201],
  "Hồ Bình An": [10.9032, 106.7592],

  "Khu du lịch sinh thái Đảo Yến Sơn Hà": [11.8321, 106.9968],
  "Sóc Bom Bo": [11.8402, 106.8865],

  "Chợ nổi Cà Mau": [9.1797, 105.1528],
  "Hòn Đá Bạc": [8.9866, 104.7476],
  "Mũi Cà Mau": [8.6269, 104.7052],

  "Cầu đi bộ Cần Thơ": [10.0359, 105.7852],
  "Bến Ninh Kiều": [10.0357, 105.7829],
  "Vườn Cò Bằng Lăng": [10.1176, 105.6452],

  "Vườn Quốc gia Nam Cát Tiên": [11.4370, 107.4269],
  "Thác Giang Điền": [10.9605, 107.0135],
  "Thác Đá Hàn": [10.9614, 107.0179],

  "Chùa Phước Kiển": [10.2660, 105.6955],
  "Nhà cổ Huỳnh Thủy Lê": [10.3102, 105.6355],
  "Làng hoa Sa Đéc": [10.3003, 105.7526],

  "Công viên Chiến Thắng": [9.7804, 105.4708],
  "Chợ đêm Vị Thanh": [9.7840, 105.4701],
  "Rừng Tràm Vị Thủy": [9.6144, 105.6119],

  "Nhà Thờ Đức Bà": [10.7798, 106.6992],
  "Chợ Bến Thành": [10.7721, 106.6983],
  "Nhà Hát Lớn": [10.7769, 106.7041],

  "Đảo Phú Quốc": [10.2899, 103.9840],
  "Quần đảo Nam Du": [9.7160, 104.4898],
  "Vườn quốc gia U Minh Thượng": [9.6371, 105.0922],

  "Làng cổ Phước Lộc Thọ": [10.6402, 106.5502],
  "Nhà cổ trăm cột": [10.5029, 106.1980],

  "Chợ nổi Ngã Năm": [9.6019, 105.9521],
  "Chùa Dơi": [9.6023, 105.9630],
  "Bảo tàng Khmer": [9.6051, 105.9624],

  "Núi Bà Đen": [11.3814, 106.1711],
  "Chùa tòa thánh": [11.2996, 106.0993],

  "Nhà Thờ Cái Bè": [10.3579, 105.9582],
  "Chợ nổi Cái Bè": [10.3643, 105.9612],
  "Biển Tân Thành": [10.3036, 106.5524],

  "Điện gió Duyên Hải Trà Vinh": [9.6880, 106.5263],
  "Biển Ba Động Trà Vinh": [9.6367, 106.4714],
  "Chùa Âng": [9.9336, 106.3544],

  "Chùa cổ Long An": [10.5452, 106.4118],
  "Chợ nổi Trà Ôn": [9.9365, 105.9504],
  "Cầu Mỹ Thuận": [10.3710, 105.9436],
  "An Giang": [10.521, 105.125],
  "Bà Rịa - Vũng Tàu": [10.541, 107.242],
  "Bạc Liêu": [9.294, 105.722],
  "Bắc Giang": [21.281, 106.197],
  "Bắc Kạn": [22.144, 105.834],
  "Bắc Ninh": [21.182, 106.051],
  "Bến Tre": [10.243, 106.375],
  "Bình Dương": [11.066, 106.672],
  "Bình Định": [13.782, 109.219],
  "Bình Phước": [11.755, 106.990],
  "Bình Thuận": [11.090, 108.072],
  "Cà Mau": [9.179, 105.150],
  "Cao Bằng": [22.665, 106.257],
  "Cần Thơ": [10.045, 105.746],
  "Đà Nẵng": [16.054, 108.202],
  "Đắk Lắk": [12.710, 108.237],
  "Đắk Nông": [12.206, 107.688],
  "Điện Biên": [21.394, 103.023],
  "Đồng Nai": [11.096, 107.424],
  "Đồng Tháp": [10.457, 105.632],
  "Gia Lai": [13.807, 108.109],
  "Hà Giang": [22.823, 104.983],
  "Hà Nam": [20.541, 105.922],
  "Hà Nội": [21.028, 105.854],
  "Hà Tĩnh": [18.337, 105.904],
  "Hải Dương": [20.936, 106.333],
  "Hải Phòng": [20.865, 106.683],
  "Hậu Giang": [9.782, 105.470],
  "Hòa Bình": [20.852, 105.337],
  "Hưng Yên": [20.852, 106.017],
  "Khánh Hòa": [12.258, 109.052],
  "Kiên Giang": [10.012, 105.077],
  "Kon Tum": [14.349, 107.989],
  "Lai Châu": [22.396, 103.458],
  "Lạng Sơn": [21.855, 106.761],
  "Lào Cai": [22.484, 103.970],
  "Lâm Đồng": [11.940, 108.458],
  "Long An": [10.695, 106.196],
  "Nam Định": [20.438, 106.162],
  "Nghệ An": [19.234, 104.920],
  "Ninh Bình": [20.253, 105.974],
  "Ninh Thuận": [11.582, 108.991],
  "Phú Thọ": [21.334, 105.296],
  "Phú Yên": [13.088, 109.092],
  "Quảng Bình": [17.478, 106.621],
  "Quảng Nam": [15.539, 108.019],
  "Quảng Ngãi": [15.121, 108.805],
  "Quảng Ninh": [21.005, 107.292],
  "Quảng Trị": [16.746, 107.189],
  "Sóc Trăng": [9.602, 105.973],
  "Sơn La": [21.135, 103.645],
  "Tây Ninh": [11.361, 106.106],
  "Thái Bình": [20.451, 106.340],
  "Thái Nguyên": [21.593, 105.844],
  "Thanh Hóa": [19.807, 105.776],
  "Thừa Thiên Huế": [16.463, 107.590],
  "Tiền Giang": [10.426, 106.342],
  "TP. Hồ Chí Minh": [10.776, 106.700],
  "Trà Vinh": [9.938, 106.345],
  "Tuyên Quang": [21.807, 105.220],
  "Vĩnh Long": [10.253, 105.972],
  "Vĩnh Phúc": [21.355, 105.524],
  "Yên Bái": [21.705, 104.870]
};


// Lấy vị trí hiện tại
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    currentPosition = L.latLng(position.coords.latitude, position.coords.longitude);
    L.marker(currentPosition).addTo(map).bindPopup("Vị trí của bạn").openPopup();
    map.setView(currentPosition, 10);
    // Sau khi có vị trí, kiểm tra tham số dest và gọi triggerRouting nếu có
    const dest = getQueryParam('dest');
    if (dest) {
      triggerRouting(dest);
    }
  }, function(error) {
    alert("Không thể lấy vị trí hiện tại: " + error.message);
  });
} else {
  alert("Trình duyệt không hỗ trợ định vị.");
}



// Gợi ý khi nhập
function showSuggestions() {
  const input = document.getElementById("destinationInput").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!input) return;

  Object.keys(provinces).forEach(name => {
    if (name.toLowerCase().includes(input)) {
      const item = document.createElement("a");
      item.className = "list-group-item list-group-item-action";
      item.textContent = name;
      item.onclick = function () {
        document.getElementById("destinationInput").value = name;
        suggestions.innerHTML = "";
        triggerRouting(name);
      };
      suggestions.appendChild(item);
    }
  });
}

// Nhấn Enter để tìm
function handleSearch(event) {
  if (event.key === "Enter") {
    const input = document.getElementById("destinationInput").value.trim();
    triggerRouting(input);
    document.getElementById("suggestions").innerHTML = "";
  }
}
// Hàm tìm đường
function triggerRouting(name) {
  const coords = provinces[name];
  if (!coords) {
      alert("Không tìm thấy địa danh: " + name);
      return;
  }
  if (!currentPosition) {
      alert("Chưa có vị trí hiện tại!");
      return;
  }
  const destination = L.latLng(...coords);
  if (control) {
      map.removeControl(control);
  }
  control = L.Routing.control({
      waypoints: [currentPosition, destination],
      showAlternatives: true,
      position: 'bottomleft',
      altLineOptions: {
          styles: [
              { color: 'black', opacity: 0.15, weight: 9 },
              { color: 'white', opacity: 0.8, weight: 6 },
              { color: 'blue', opacity: 0.5, weight: 2 }
          ]
      }
  }).addTo(map);
  map.setView(destination, 10);
  L.marker(destination).addTo(map).bindPopup(`<b>${name}</b>`).openPopup();
}




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

function showSuggestions() {
  const input = document.getElementById("destinationInput").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  // Nếu chưa nhập gì vẫn hiển thị toàn bộ danh sách
  Object.keys(provinces).forEach(name => {
    if (!input || name.toLowerCase().includes(input)) {
      const item = document.createElement("a");
      item.className = "list-group-item list-group-item-action";
      item.textContent = name;
      item.onclick = function () {
        document.getElementById("destinationInput").value = name;
        suggestions.innerHTML = "";
        triggerRouting(name);
      };
      suggestions.appendChild(item);
    }
  });
}


// Sự kiện cho nút quay lại
document.getElementById('backToPreviousBtn').addEventListener('click', function() {
  window.history.back(); // Quay lại trang trước
});    // Quay lại vị trí mặc định
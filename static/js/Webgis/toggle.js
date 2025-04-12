// Khi người dùng chọn lớp trong dropdown
$("#layerSelect").on("change", function () {
    var selectedLayer = this.value;
  
    // Tắt tất cả lớp
    layerProvince.setVisible(false);
    layerPort.setVisible(false);
    layerPlus.setVisible(false);
  
    // Kiểm tra lớp nào được chọn và bật lớp đó
    if (selectedLayer === "district") {
      layerPort.setVisible(true); // Lớp Chính
    } else if (selectedLayer === "province") {
      layerProvince.setVisible(true); // Lớp Tỉnh
    } else if (selectedLayer === "plus") {
      layerPlus.setVisible(true); // Lớp Huyện
    }
  });
  
  // Khi người dùng nhấn nút "Tắt tất cả lớp"
$("#toggleAllLayers").on("click", function () {
    // Tắt tất cả lớp
    layerProvince.setVisible(false);
    layerPort.setVisible(false);
    layerPlus.setVisible(false);
  
    // Đặt lại dropdown về giá trị mặc định (Lớp Chính)
    $("#layerSelect").val("district");
  });
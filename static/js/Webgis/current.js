let showLocation = false;
let geolocation;
let locationLayer;
let positionFeature;
let accuracyFeature;

function initLocationLayer() {
  positionFeature = new ol.Feature();
  accuracyFeature = new ol.Feature();

  locationLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [accuracyFeature, positionFeature],
    }),
    style: function (feature) {
      if (feature === positionFeature) {
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({ color: '#007bff' }),
            stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
          }),
        });
      } else {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(0,123,255,0.5)',
            width: 2,
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0,123,255,0.1)',
          }),
        });
      }
    },
  });

  map.addLayer(locationLayer);

  geolocation = new ol.Geolocation({
    tracking: true,
    projection: map.getView().getProjection(),
    trackingOptions: {
      enableHighAccuracy: true,
    },
  });

  geolocation.on('change:position', function () {
    const coords = geolocation.getPosition();
    const accuracy = geolocation.getAccuracy();

    if (coords) {
      positionFeature.setGeometry(new ol.geom.Point(coords));
      accuracyFeature.setGeometry(new ol.geom.Circle(coords, accuracy || 100));

      if (!showLocation) {
        map.getView().animate({
          center: coords,
          zoom: map.getView().getZoom() < 14 ? 14 : map.getView().getZoom(),
          duration: 1000,
        });
        showLocation = true;
      }
    }
  });

  geolocation.on('error', function (error) {
    alert("Không thể truy cập vị trí: " + error.message);
  });
}

function removeLocationLayer() {
  if (geolocation) {
    geolocation.setTracking(false);
  }
  if (locationLayer) {
    map.removeLayer(locationLayer);
    locationLayer = null;
  }
  showLocation = false;
}

$("#toggleLocation").on("change", function () {
  if (this.checked) {
    initLocationLayer();
  } else {
    removeLocationLayer();
  }
});

var biteMarkers = function (map, data) {

  var image = {
    url: 'images/pin_ubod.png',
    size: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20)
  };

  var mapObjects = [];

  function fadeOutCircles() {

    for (var i = 0; i < mapObjects.length; i++) {
      var circle = mapObjects[i].circle;
      var marker = mapObjects[i].marker;
      if (circle && circle.getMap()) {
        var fillOpacity = circle.get("fillOpacity");
        fillOpacity -= 0.02;
        if (fillOpacity < 0) fillOpacity = 0.0;
        var strokeOpacity = circle.get("strokeOpacity");
        strokeOpacity -= 0.05;
        if (strokeOpacity < 0) strokeOpacity = 0.0;

        var radius = circle.get("radius");
        radius += radius + 20;
        if (radius > 400) {
          radius = 400;
          marker.setMap(null);
          circle.setOptions({fillOpacity: fillOpacity, strokeOpacity: strokeOpacity, radius: radius});
          circle.setMap(null);
          break;
        } else {
          circle.setOptions({fillOpacity: fillOpacity, strokeOpacity: strokeOpacity, radius: radius});
        }
      }

    }

  }

  function drop() {
    clearMarkers();
    addMarkerWithTimeout(new google.maps.LatLng(data.lat, data.long), 1000);
  }

  function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function () {

      mapObjects.push({
        circle: new google.maps.Circle({
          fillColor: '#92405F',
          fillOpacity: 0.32,
          strokeWidth: 0,
          strokeOpacity: 0.4,
          strokeColor: "#92405F",
          center: position,
          map: map,
          radius: 40
        }),
        marker: new google.maps.Marker({
          icon: image,
          position: position,
          map: map
        })
      });


        removeWithTimeout(350);


    }, timeout);
  }

  function removeWithTimeout(timeout) {
    window.setInterval(function () {
      fadeOutCircles();
    }, timeout);
  }

  function clearMarkers() {
    for (var i = 0; i < mapObjects.length; i++) {
      mapObjects[i].marker.setMap(null);
      mapObjects[i].circle.setMap(null);
    }
    mapObjects = [];
  }

  drop();
};
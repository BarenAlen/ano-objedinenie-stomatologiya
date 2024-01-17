 $(function() {

 	ymaps.ready(init);

 	var locationMap,
 		location,
 		placeMarker;

 	function init() {
 		locationMap = new ymaps.Map("location-map", {
 			center: [55.76, 37.64],
            zoom: 4,
            controls: ["geolocationControl", "routeEditor", "zoomControl"]
 		});

	 	placeMarker = function(address) {

	 		ymaps.geocode(address, {
	 			results: 1
	 		}).then(function(res) {
	 			var firstGeoObject = res.geoObjects.get(0),
	 				coords = firstGeoObject.geometry.getCoordinates(),
	 				bounds = firstGeoObject.properties.get('boundedBy');

	 			locationMap.geoObjects.add(firstGeoObject);
	 			locationMap.setBounds(bounds, {
	 				checkZoomRange: true
	 			}).then(function() {
	 				locationMap.setZoom(17);
	 				locationMap.behaviors.disable('scrollZoom');
	 			});

	 			var myPlacemark = new ymaps.Placemark(coords, {}, {
	 				iconLayout: 'default#image',
	 				iconImageHref: 'assets/img/map-marker.png',
	 				iconImageSize: [44, 52],
	 				iconImageOffset: [-30, -44]
	 			});

	 			locationMap.geoObjects.add(myPlacemark);
	 		});
	 	}

 		placeMarker("Республика Карелия, г. Петрозаводск, ул. Анохина, 20.");
 	}
});
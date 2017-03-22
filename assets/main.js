// Search result
var searchResult = [];
//////////////////////


$(document).ready(function () {

  var Map = new GMapInterface('map-container');

  Map.queryUserLocation();
  Map.createMarker(Map.startLoc, {bounce: true});

  Map.map.addListener('click', function(event) {

    Map.createMarker(event.latLng, {bounce: true}); 	

  });

  // Search Input Click Event
  $('#submitSearchBtn').on('click', function(e){
  	e.preventDefault();

  	var input = $('#userSearch').val().trim();
  	
  	var Places = new placesInit(Map);

  	// Saiving result in a Global variable for test
  	searchResult = Places.search(input);

  });

});


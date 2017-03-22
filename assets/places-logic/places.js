
// Obj constructor
function placesInit(gMap){
  
  return{
    // search with 500 meters radius with maps coordenates
    // Aparently the radius option is not working, I'm receving places from outside of the range
    search: function(searchInput){

      var startLoc = gMap.startLoc;
      var output = [];

      // request obj
      var request = {
        location: startLoc,
        radius: '50',
        query: searchInput
      };
      // initialize google Places service
      var service = new google.maps.places.PlacesService(gMap.map);
      service.textSearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            output.push(place);
          }
        }
      }
      return output;
    },
  };
}

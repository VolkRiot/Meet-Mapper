
// Obj constructor
function PlacesInit(gMap){
  
  return{
    // search with 500 meters radius with maps coordenates
    search: function(searchInput){

      var startLoc = gMap.startLoc;
      var map = gMap.map;

      // request obj
      var request = {
        location: startLoc,
        radius: '500',
        query: searchInput
      };

      this.serviceInit(map, request);
    },
    ////////////////////////////////////////////

    // initialize Places Map
    serviceInit: function(myMap, request){
      var service = new google.maps.places.PlacesService(myMap);
      service.textSearch(request, this.getResult.bind(this), myMap);
    },
    ////////////////////////////////////////////

    // receive search result and store in a array
    getResult: function(results, status, map){
      var output = [];

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < 5; i++) {

          var myObj ={
            name: results[i].name,
            location: {
              lat: results[i].geometry.location.lat(), 
              lng: results[i].geometry.location.lng()
            },
            photo: results[i].photos[0].html_attributions
          };
          output.push(myObj);
        }
      }

      console.log(output);
    },
    
  };
}

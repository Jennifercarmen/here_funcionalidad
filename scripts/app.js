function grabarRuta() {
  alert("se grabo la ruta");
}

const showPositionHere = () => {
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log(lat, lon)
    localStorage.myLatitude = JSON.stringify(lat);
    localStorage.myLongitude = JSON.stringify(lon);
    console.log("hola")
  })

}

showPositionHere();


function saveActivities() {
  firebase.database().ref('actividades').push({
    name: 'Alpinismo'
  });
  grabarRuta();

}

const latitud = localStorage.myLatitude;
const longitud = localStorage.myLongitude;

function addCircleToMap(map) {
  map.addObject(new H.map.Circle(
    // The central point of the circle
    {
      lat: latitud,
      lng: longitud
    },
    // The radius of the circle in meters
    80, {
      style: {
        strokeColor: 'rgba(19, 18, 18, 0.88)',
        fillColor: 'rgba(37, 221, 37, 0.67)',
        lineWidth: 2,
        lineCap: 'square',
        lineJoin: 'bevel'

      }
    }
  ));
}

// function moveMapToBerlin(map) {
//   map.setCenter({
//     lat: latitud,
//     lng: longitud
//   });
//   map.setZoom(16);
// }
// const initMap = () => {
//   var platform = new H.service.Platform({
//     'app_id': 'GYY2pVG6gWaZZB2kVTLw',
//     'app_code': '6n-eV00Iq-KV_lVCWBdSdw',
//     useCIT: true,
//     useHTTPS: true
//   });
//   // Obtain the default map types from the platform object:
//   var defaultLayers = platform.createDefaultLayers();
//   // Instantiate (and display) a map object:
//   var map = new H.Map(document.getElementById('map'),
//     defaultLayers.normal.map);
//   var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//   // Create the default UI components
//   var ui = H.ui.UI.createDefault(map, defaultLayers);
//   // Now use the map as required...
//   moveMapToBerlin(map);
//   addCircleToMap(map);
// }
function saveRoute() {
  firebase.database().ref('rutas').once('value', function (snapshot) {
    var newPost = firebase.database().ref('rutas').push({
      uid: '001',
      name: 'Real plaza'
    });

    var newPostKey = newPost.key;
    firebase.database().ref('/rutas/' + newPostKey).child('position').push({
      latitud: localStorage.latitudeB,
      longitud: localStorage.longitudeB
    });
  });
  grabarRuta();
}
// const saveRouteMap=()=>{
//   saveRoute(latitud,longitud);
// }

$('#grabar').click(saveRoute);

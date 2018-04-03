const divActivities = $('#routes');
const showRoutes = () => {
    function dataRuta(){
        var keyruta = $(this).data('id');
        firebase.database().ref('/rutas/' + keyruta).on('value', snap => {
                name = snap.val().name;
                const position = snap.val().position;
                const positionString = JSON.parse(JSON.stringify(position, null, ' '));
                const objposition = (Object.keys(positionString));
                const obth = Object.values(positionString[objposition]);
                const latitudB = obth[0];
                const longitudB = obth[1];
                console.log(name);
                console.log(latitudB);
                console.log(longitudB);
                localStorage.latitudeB = latitudB;
                localStorage.longitudeB= longitudB;

               })
               calculateRouteFromAtoB(platform);
               console.log(keyruta);
    }
    let html = '';
    firebase.database().ref('rutas').on('value', function (snapshot) {
        snapshot.forEach(function (e) {
          var element = e.val();
          var name = element.name;
          var key = e.key;
          html=`
   <div class="col-xs-12 col-sm-4 btn_ruta"  data-id="${key}">
            <div class="card w-100">
              <img class="card-img-top" src="assets/images/rutamovil.jpg" alt="Card image cap">
              <div class="card-body">
              ${name}
           
              </div>
            </div>
            <br>
          </div>
        `;
        divActivities.append(html);
        });
        $('.btn_ruta').click(dataRuta);
      });
}
showRoutes()


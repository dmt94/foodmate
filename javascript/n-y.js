
function initMap() {

  let location = {
    lat: 34.0103797895904,
    lng: -118.484413
  }

  let options = {
    center: location,
    zoom: 15,
    mapId: '2752faa763e6f771'
  }

  let map = new google.maps.Map(document.getElementById("map"), options);

  let infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    console.log('geolocation is here!');


    //old one

    navigator.geolocation.getCurrentPosition((loc) => {
      location.lat = loc.coords.latitude;
      location.lng = loc.coords.longitude;

      map = new google.maps.Map(document.getElementById("map"), options);

    },
    (err) => {
      console.log('user clicked no');
      map = new google.maps.Map(document.getElementById("map"), options);
    }
    )
    //no geolocation
} else {
    console.log('geolocation is not supported');
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.72369431039745, lng: -74.00512000364961 },
      zoom: 13,
      mapId: '2752faa763e6f771'
    });
   
  }

      //autocomplete//
    const input = document.getElementById("address");
  
    // Specify just the place data fields that you need.
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ["place_id", "geometry", "formatted_address", "name"],
    });
  
    autocomplete.bindTo("bounds", map);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
  
    marker = new google.maps.Marker({ map: map });
  
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
  
      const place = autocomplete.getPlace();
      new google.maps.Marker({
        position: place.geometry.location,
        title: place.name,
        map: map
      })
  
      if (!place.geometry || !place.geometry.location) {
        return;
      }
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      // Set the position of the marker using the place ID and location.
      // @ts-ignore This should be in @typings/googlemaps.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });
      marker.setVisible(true);
      infowindowContent.children.namedItem("place-name").textContent = place.name;
      infowindowContent.children.namedItem("place-id").textContent =
        place.place_id;
      infowindowContent.children.namedItem("place-address").textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });

  //button search => on click, show potential matches near you


}//end of main function

window.initMap = initMap;





//new one

// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//     mapId: '2752faa763e6f771',
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

// window.initMap = initMap;
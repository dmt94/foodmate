
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 39.51944934027342, lng: -101.86543483884566 },
    mapId: 'e0f6e7bacbffe576'
  });

  const locations = [
    [{ lat: 30.352284828528482, lng: -97.73116470887177 }, "Austin, TX"],
    [{ lat: 42.405846311388615, lng: -70.96240062355751 }, "Boston, MA"],
    [{ lat: 41.91103124041295, lng: -87.64324967564153 }, "Chicago, IL"],
    [{ lat: 36.22942696722119, lng: -115.08510613491578 }, "Las Vegas, NV"],

    [{ lat: 34.04874252445788, lng: -118.24300100804976 }, "Los Angeles, CA"],
    [{ lat: 25.91631990900323, lng: -80.19234560309243 }, "Miami, FL"],
    [{ lat: 40.70964084345287, lng: -73.95637814165875 }, "New York City, NY"],
    [{ lat: 33.454845909918966, lng: -112.06233487724673 }, "Phoenix, AZ"],

    [{ lat: 45.538688653501166, lng: -122.64889028163546 }, "Portland, OR"],
    [{ lat: 38.62563556970386, lng: -121.43984381695442 }, "Sacramento, CA"],
    [{ lat: 32.72264651018802, lng: -117.17723420310801 }, "San Diego, CA"],
    [{ lat: 37.80013167643991, lng: -122.42650670676922 }, "San Francisco Bay Area, CA"],
    [{ lat: 47.60692523711068, lng: -122.33314716370816 }, "Seattle, WA"],
    [{ lat: 38.902760992817875, lng: -77.03154515437815 }, "Washington, D.C."],

  ];

  const infoWindow = new google.maps.InfoWindow();

  //ids
  let austin = document.getElementById('austin');
  let boston = document.getElementById('boston');
  let chicago = document.getElementById('chicago');
  let lasVegas = document.getElementById('las-vegas');

  let losAngeles = document.getElementById('los-angeles');
  let miami = document.getElementById('miami');
  let nyc = document.getElementById('nyc');
  let phoenix = document.getElementById('phoenix');

  let portland = document.getElementById('portland');
  let sacramento = document.getElementById('sacramento');
  let sanDiego = document.getElementById('san-diego');
  let sanFran = document.getElementById('sf');
  let seattle = document.getElementById('seattle');
  let washington = document.getElementById('dc');

  let cities = [
    austin, boston, chicago, lasVegas, losAngeles,
    miami, nyc, phoenix, portland, sacramento,
    sanDiego, sanFran, seattle, washington,
  ];

  //markers
  const image = "../images/markers/heart.png";
  locations.forEach(([position, title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${title}`,
      optimized: false,
      animation: google.maps.Animation.DROP,
      icon: image,
    });

    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });

    cities.forEach((city, int) => {
      city.addEventListener("click", () => {
        if (int === i) {
          toggleBounce();
        }
      }); 
    });

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

  });

  autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'),
  {
    componentRestrictions: {'country': ['us']},
    fields: ['geometry', 'name', 'formatted_address'],
    types: ['address'],
  });

  let addressButton = document.getElementById('address-verif-button');

}

window.initMap = initMap;

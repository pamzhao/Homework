// UAS map
let baseMap = L.map('mapid').setView([37.8, -96], 3.25);
  
// Adding base layer
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(baseMap);


// Define variables for our tile layers
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11.html?title=true&access_token=" + API_KEY);

var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});



// Past 7 Days
//let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Past day
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Return color base on value
function setColor(value) {
  return x > 5 ? "#FF0000" :
        x > 4 ? "#FF6600" :
        x > 3 ? "#FF9900" :
        x > 2 ? "#FFCC00" :
        x > 1 ? "#FFFF00" :
               "#66FF00";
}
// set the circle style
function setCircleStyle(x) {
  return {
    radius: x*1000,
    fillColor: setColor(x),
    color: "grey",
    fillOpacity: 0.8,
    weight: 1
  };
}

d3.json(url, function(data) {

  L.geoJson(data, {

  }).addTo(base )
});


// d3.json(url, function(data) {
//   console.log(data);

//   L.geoJson(data, {
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng, setCircleStyle(feature));
//     },

//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("<h4>Place: " + feature.properties.place + "</h4><hr><h4>Magnitude: " + feature.properties.mag + "</h4>");
//   }

//   }).addTo(baseMap);
// });

// var legend = L.control({position: "bottomright"});

// legend.onAdd = function(baseMap) {
//   var div = L.DomUtil.create("div", "legend");
  
//   var magLabel = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
//   var magColor = ["#66FF00", "#FFFF00", "#FFCC00", "#FF9900", "#FF6600", "#FF0000"];

//   for (var i = 0; i < mag.length; i++) {
//     div.innerHTML += "<i style=background:"+ magColor[i]+"></i><span>"+magLabel[i]+"</span><br>";
//   }
//   return div;
// };

// legend.addTo(baseMap);

    
  
  
// UAS map
let baseMap = L.map('map').setView([37.8, -96], 4);
  
// Adding base layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(baseMap);

// Past 7 Days
//let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Past day
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Return color base on value
function setColor(x) {
  return x > 5 ? "#FF0000" :
        x > 4 ? "#FF6600" :
        x > 3 ? "#FF9900" :
        x > 2 ? "#FFCC00" :
        x > 1 ? "#FFFF00" :
        x > 0 ? "#66FF00" :
                "#FFFFFF";
}
// set the circle style
function setCircleStyle(feature) {
  return {
    radius: feature.properties.mag*5,
    fillColor: setColor(feature.properties.mag),
    color: "grey",
    fillOpacity: 0.8,
    weight: 1
  };
}

d3.json(url, function(data) {
  console.log(data);

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, setCircleStyle(feature));
    },

    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4>Place: " + feature.properties.place + "</h4><hr><h4>Magnitude: " + feature.properties.mag + "</h4>");
  }

  }).addTo(baseMap);
});

var legend = L.control({position: "bottomright"});

legend.onAdd = function(baseMap) {
  var div = L.DomUtil.create("div", "legend");
  
  var magLabel = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
  var magColor = ["#66FF00", "#FFFF00", "#FFCC00", "#FF9900", "#FF6600", "#FF0000"];

  for (var i = 0; i < mag.length; i++) {
    div.innerHTML += "<i style=background:"+ magColor[i]+"></i><span>"+magLabel[i]+"</span><br>";
  }
  return div;
};

legend.addTo(baseMap);

    
  
  
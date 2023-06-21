// var map = L.map('map').setView([48.138666, 11.575366], 5);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 18,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
// }).addTo(map);

const key = "HSFYhxikAmTFWmRDoLeS";
// const map = L.map('map').setView([48.138666, 11.575366],2.5);
const positron = L.maptilerLayer({
  apiKey: key,
  style: `https://api.maptiler.com/maps/f7cf6abe-9c77-42d0-93b0-3106db0f53f3/style.json?key=${key}`, // optional
});
const satellite = L.maptilerLayer({
  apiKey: key,
  style: `https://api.maptiler.com/maps/satellite/style.json?key=HSFYhxikAmTFWmRDoLeS`,
});

const avgtemptile = L.tileLayer.wms(
  "https://storage.googleapis.com/zhenjiang-li/2022 July Average Daily Air Temperature at 2m/{z}/{x}/{y}",
  {
    layers: "2022 July Average Daily Air Temperature at 2m",
    format: "image/png",
    transparent: true,
    noWrap: true,
  }
);

const nitrogen = L.tileLayer.wms(
  "https://maps.isric.org/mapserv?map=/map/nitrogen.map",
  {
    layers: "nitrogen_0-5cm_mean",
    format: "image/png",
    transparent: true,
    noWrap: true,
  }
);

const globalfungiwms = L.tileLayer.wms("http://localhost:8080/geoserver/wms/", {
  layers: "sample_list_asia1206",
  format: "image/png",
  transparent: true,
  noWrap: true,
  version: "1.1.0",
});

const amusMarker = {
  radius: 4,
  fillColor: "#c54a2f",
  color: "#fff",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const amus = new L.GeoJSON.AJAX(
  "https://raw.githubusercontent.com/pheebely/globalfungi/main/amanita_muscaria.geojson",
  {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, amusMarker);
    },
    onEachFeature: onEachFeature,
  }
);

// Add pop up for each point feature
function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.id) {
    layer.bindPopup(
      "<h3>" +
        "Sample ID: " +
        feature.properties.id +
        "</h3>" +
        "<p>" +
        "Paper ID: " +
        feature.properties.paper_id +
        "<br>" +
        "Continent: " +
        feature.properties.continent +
        "<br>" +
        "Sample type: " +
        feature.properties.sample_type +
        "<br>" +
        "Biome: " +
        feature.properties.biome +
        "</p>"
    );
  } else {
  }
}

// Molleweide with map's pixel origin at coordinate (0, 0)
//Use Proj4 to change projection
// const crs = new L.Proj.CRS(
//   "ESRI:54009",
//   "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",
//   {
//     resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
//     origin: [0, 0],
//   }
// );

const map = new L.map("map", {
  // crs: crs,
  minZoom: 2,
  maxZoom: 10, //crs.options.resolutions.length
  layers: [positron, amus],
}).setView([0, 0], 2);

L.control.scale().addTo(map);

// Layer Controls

map.createPane("labels");
map.getPane("labels").style.zIndex = 650;
map.getPane("labels").style.pointerEvents = "none";

const baseMaps = {
  "Map Tiler Dark": positron,
  Satellite: satellite,
};

const overlayMaps = {
  "Mean Annual Temperature": avgtemptile,
  "Nitrogen 0-5cm depth (cg/kg)": nitrogen,
  // "All Samples": globalfungiwms,
  "Amanita muscaria Samples": amus,
};

const layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: false })
  .addTo(map);

uri =
  "https://maps.isric.org/mapserv?map=/map/nitrogen.map&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=nitrogen_0-5cm_mean&format=image/png&STYLE=default";

const positronLabels = L.maptilerLayer({
  apiKey: key,
  pane: "labels",
  style: `https://api.maptiler.com/maps/ff2aabac-aeec-4475-88cb-0b7528028c78/style.json?key=${key}`,
  // optional
}).addTo(map);

// Add and remove layers

var nitrolegend;

map.on("overlayadd", function (e) {
  // Switch to the nitrogen legend...
  //   e.preventDefault();
  //   e.stopPropagation();
  nitrolegend = L.wmsLegend(uri);

  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    nitrolegend.addTo(map);
    console.log(e);
  } else if (map.removeControl(nitrolegend));
});

map.on("overlayremove", function (e) {
  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    map.removeControl(nitrolegend);
    console.log(e);
  }
});

// var map = L.map('map').setView([48.138666, 11.575366], 5);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 18,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
// }).addTo(map);

// SWEREF99 TM (EPSG:3006) with map's pixel origin at SWEREF99 TM coordinate (0, 0)
// var crs = new L.Proj.CRS(
//   "ESRI:53042",
//   proj4.defs(
//     "ESRI:53042",
//     "+proj=wintri +lon_0=0 +lat_1=50.467 +x_0=0 +y_0=0 +R=6371000 +units=m +no_defs +type=crs"
//   ),
//   {
//     resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
//     origin: [0, 0],
//   }
// );

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
  }
);

const globalfungiwms = L.tileLayer.wms("http://localhost:8080/geoserver/wms/", {
  layers: "sample_list_asia1206",
  format: "image/png",
  transparent: true,
  version: "1.1.0",
});

// Layer Controls

const map = L.map("map", {
  //   crs: crs,
  minZoom: 2,
  maxZoom: 5,
  layers: [positron],
}).setView([48.138666, 11.575366], 2.5);

L.control.scale().addTo(map);

map.createPane("labels");
map.getPane("labels").style.zIndex = 650;
map.getPane("labels").style.pointerEvents = "none";

const baseMaps = {
  "Map Tiler Dark": positron,
  Satellite: satellite,
};

const overlayMaps = {
  "Mean Annual Temperature": avgtemptile,
  "Global Fungi": globalfungiwms,
};

const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

const positronLabels = L.maptilerLayer({
  apiKey: key,
  pane: "labels",
  style: `https://api.maptiler.com/maps/ff2aabac-aeec-4475-88cb-0b7528028c78/style.json?key=${key}`,
  // optional
}).addTo(map);

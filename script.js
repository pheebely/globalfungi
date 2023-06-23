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
    opacity: 0.8,
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

const antBiome = L.tileLayer.wms(
  "https://sedac.ciesin.columbia.edu/geoserver/wms",
  {
    layers: "anthromes:anthromes-anthropogenic-biomes-world-v1",
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

const hexbin_global = L.tileLayer.wms("http://localhost:8080/geoserver/wms/", {
  layers: "globalfungi:Hexbin_Global",
  format: "image/png",
  transparent: true,
  noWrap: true,
  version: "1.1.0",
  opacity: 0.8,
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

//HEATMAP
// Update the heatmap data with your coordinates
const heatmapData = [
  [56.848, 59.863],
  [46.4053, 10.5849],
  [46.0914, 9.63358],
  [46.7337, 9.85182],
  [-42.6793, 146.671],
  [-35.4238, 148.783],
  [56.848, 59.863],
  [-35.4239, 148.797],
  [52.86, 23.88],
  [-35.4239, 148.797],
  [40.87, -96.81],
  [-35.4232, 148.797],
  [46.5893, 11.4507],
  [50.903, 4.963],
  [50.9454, 122.086],
  [37.9176, -119.275],
  [-35.4235, 148.797],
  [46.0945, 9.63818],
  [-35.4239, 148.798],
  [56.801, 59.425],
  [-35.4226, 148.796],
  [49.3186, 16.7739],
  [46.8023, 9.90542],
  [56.85, 59.827],
  [56.848, 59.863],
  [46.7346, 9.85306],
  [56.848, 59.863],
  [49.3108, 16.7774],
  [48.8593, 13.8968],
  [46.0953, 9.63818],
  [42.38, -85.37],
  [-42.173, 148.285],
  [43.94, -71.75],
  [48.666, 14.7092],
  [50.5083, 3.5325],
  [52.9145, 13.7376],
  [49.2654, 16.6511],
  [56.848, 59.863],
  [48.6656, 14.7087],
  [56.848, 59.863],
  [-35.4235, 148.797],
  [52.9249, 13.8664],
  [56.801, 59.425],
  [45.11, 5.89],
  [51.1047, 10.4051],
  [45.1, 5.89],
  [46.5878, 11.4347],
  [-32.039, -64.7507],
  [56.848, 59.863],
  [49.1457, 13.3667],
  [46.4065, 10.584],
  [45.1, 5.89],
  [42.38, -85.37],
  [46.4064, 10.584],
  [56.801, 59.425],
  [42.38, -85.37],
  [47.28, 26.05],
  [52.9173, 13.8473],
  [42.1833, 128.15],
  [45.11, 5.85],
  [45.11, 5.89],
  [51.2807, 10.4562],
  [-35.4237, 148.798],
  [-35.4214, 148.799],
  [-42.022, 148.281],
  [57.4384, 27.3008],
  [59.3969, 24.7292],
  [58.7226, 25.0636],
  [58.3381, 25.4553],
  [56.85, 59.827],
  [48.3804, 9.22307],
  [56.85, 59.827],
  [49.3147, 16.774],
  [46.4049, 10.5831],
  [48.7766, 13.8553],
  [49.3125, 16.6452],
  [56.1, -110.9],
  [48.9251, 13.6413],
  [37.9154, -119.267],
  [52.89, 23.63],
  [46.5878, 11.4347],
  [52.65, 23.62],
  [49.3021, 16.6595],
  [45.11, 5.85],
  [49.3074, 16.7628],
  [52.9174, 13.7462],
  [52.68, 23.71],
  [45.11, 5.89],
  [52.8624, 13.9172],
  [47.037, 11.097],
  [53.0883, 13.6983],
  [62.7, 29.77],
  [56.1, -110.9],
  [56.1, -110.9],
  [46.5439, 11.4711],
  [46.5439, 11.4711],
  [62.36, 30.21],
  [48.479, 9.29479],
  [55.1299, 10.2467],
  [56.2453, 8.49395],
  [45.11, 5.89],
  [46.4269, 11.2968],
  [-35.4237, 148.798],
  [62.61, 30.34],
  [-42.6831, 146.61],
  [-32.0726, -64.8647],
  [53.0057, 17.9156],
  [46.4052, 10.5829],
  [56.848, 59.863],
  [55.689, 9.86962],
  [56.848, 59.863],
  [52.71, 23.62],
  [46.5439, 11.4711],
  [-32.039, -64.7507],
  [49.3337, 16.6891],
  [47.44, 11.06],
  [-32.039, -64.7507],
  [58.2834, 27.3232],
  [52.76, 23.66],
  [61.7, 21.7],
  [49.1196, 13.2651],
  [56.85, 59.827],
  [56.85, 59.827],
  [49.3123, 16.7843],
  [40.0516, -105.644],
  [50.9454, 122.086],
  [56.848, 59.863],
  [56.848, 59.863],
  [56.801, 59.425],
  [46.4044, 10.5848],
  [56.848, 59.863],
  [58.2635, 27.3064],
  [57.5966, 10.2409],
  [45.11, 5.89],
  [56.848, 59.863],
  [53.0621, 13.9224],
  [46.4046, 10.5852],
  [59.6155, 24.9953],
  [49.0049, 13.4546],
  [56.848, 59.863],
  [46.5439, 11.4711],
  [55.689, 9.86962],
  [59.0771, 27.4582],
  [56.848, 59.863],
  [48.6667, 14.7078],
  [-35.4214, 148.799],
  [-35.4239, 148.797],
  [52.0148, 5.77707],
  [49.077, 13.5062],
  [52.9, 23.65],
  [52.94, 13.7826],
  [52.77, 23.75],
  [56.848, 59.863],
  [46.6922, 10.5925],
  [69.5509, 18.475],
  [-32.0726, -64.8647],
  [58.2729, 27.3312],
  [46.5893, 11.4507],
  [48.23, 7.25],
  [52.9207, 13.643],
  [49.2963, 16.6991],
  [48.8593, 13.8968],
  [45.11, 5.89],
  [48.7478, 13.9225],
  [62.33, 30.37],
  [52.9074, 13.8417],
  [53.094, 13.6351],
  [57.9504, 27.3688],
  [47.3, 26.05],
  [40.0573, -105.624],
  [52.88, 23.63],
  [53.0886, 13.6354],
  [42.88, -95.58],
  [49.2631, 16.6481],
  [56.85, 59.827],
  [49.046, 13.6177],
  [49.2863, 16.6889],
  [45.1, 5.89],
  [48.71, 7.32],
  [62.33, 30.32],
  [-39.9214, 143.852],
  [53.0766, 13.864],
  [56.848, 59.863],
  [56.85, 59.827],
  [52.89, 23.6],
  [62.7, 29.74],
  [56.7009, 13.1109],
  [56.7009, 13.1109],
  [52.76, 23.69],
  [44.04, -96.78],
  [45.11, 5.89],
  [51.8318, -2.65989],
  [56.801, 59.425],
  [45.1, 5.89],
  [51.8414, 122.054],
  [56.848, 59.863],
  [49.1457, 13.3667],
  [48.9251, 13.6413],
  [51.2714, 10.3112],
  [48.6643, 14.708],
  [52.69, 23.67],
  [49.3214, 16.6541],
  [48.6647, 14.7087],
  [46.5878, 11.4347],
  [45.1, 5.89],
  [58.2742, 27.3241],
  [48.758, 13.9322],
  [53.0903, 13.6337],
  [53.0911, 13.6378],
  [52.72, 23.58],
  [52.78, 23.62],
  [52.82, 23.73],
  [50.0939, 14.6133],
  [68.9678, 20.9432],
  [45.1, 5.89],
  [56.848, 59.863],
  [55.689, 9.86962],
  [56.848, 59.863],
  [52.8811, 13.9034],
  [43.51, -93.66],
  [56.85, 59.827],
  [46.5878, 11.4347],
  [51.2714, 10.3112],
  [41.61, -97.11],
  [57.1446, 8.95119],
  [-30.1831, 115.127],
  [49.1216, 13.2614],
  [46.5878, 11.4347],
  [53.0628, 13.927],
  [56.848, 59.863],
  [49.3108, 16.7774],
  [51.1992, 10.3377],
  [56.0971, 10.5141],
  [61.7, 21.7],
  [58.0458, 24.7119],
  [45.11, 5.89],
  [53.0164, 13.8639],
  [48.9435, 13.6448],
  [49.3214, 16.6541],
  [50.7596, 15.5203],
  [42.45, 1.19],
  [42.45, 1.19],
  [58.0811, 26.3416],
  [50.0939, 14.6133],
  [56.6627, 13.0853],
  [50.7566, 15.7037],
  [49.07, -89.39],
  [47.57, -82.85],
  [48.9862, 13.4094],
  [56.848, 59.863],
  [52.8897, 13.9672],
  [56.0971, 10.5141],
  [48.8979, 13.7132],
  [49.2593, 16.6801],
  [49.3175, 16.7924],
  [49.0366, 13.4122],
  [49.3199, 16.7249],
  [49.3249, 16.7244],
  [49.2971, 16.6112],
  [61.7, 21.7],
  [45.1, 5.89],
  [44.26, -96.71],
  [56.7009, 13.1109],
  [56.7009, 13.1109],
  [49.314, 16.7797],
  [49.2971, 16.6112],
  [39.99, -105.38],
  [52.9, 23.64],
  [50.2319, 12.6401],
  [56.848, 59.863],
  [49.3189, 16.8006],
  [57.5966, 10.2409],
  [56.6627, 13.0853],
  [40.0516, -105.644],
  [49.2904, 16.6192],
  [49.279, 16.7177],
  [49.2815, 16.6212],
  [49.2923, 16.6467],
  [49.3006, 16.6314],
  [48.6643, 14.708],
  [56.7009, 13.1109],
  [40.85, -3.97],
  [61.8, 21.7],
  [52.8624, 13.9172],
  [49.281, 16.7205],
  [49.3186, 16.7739],
  [48.08, 7.12],
  [58.289, 27.3107],
  [46.75, -82.25],
  [56.848, 59.863],
  [49.3055, 16.6998],
  [52.9207, 13.643],
  [42.45, 1.19],
  [47.3, 4.083],
  [57.5857, 26.6461],
  [51.9079, 39.5446],
  [54.35, -122.61],
  [62.67, 29.58],
  [48.7509, 13.9312],
  [49.3189, 16.8006],
  [58.262, 27.3118],
  [49.3165, 16.7385],
  [36.231, -112.068],
  [49.2593, 16.6801],
  [58.2843, 27.335],
  [61.8, 21.7],
  [48.8593, 13.8968],
  [49.3249, 16.6527],
  [49.3239, 16.7651],
  [56.6627, 13.0853],
  [52.0148, 5.77707],
  [60.3432, -114.165],
  [48.71, 7.32],
  [48.71, 7.32],
  [61.8, 21.7],
  [61.8, 21.7],
  [61.8, 21.7],
  [57.1173, 52.9985],
  [61.8, 21.7],
  [58.2752, 27.3235],
  [52.0148, 5.77707],
  [61.7, 21.7],
  [61.7, 21.7],
  [52.0148, 5.77707],
  [48.8975, 13.6586],
  [61.7, 21.7],
  [61.7, 21.7],
  [61.7, 21.7],
  [61.7, 21.7],
  [52.0148, 5.77707],
  [51.2716, 10.3107],
  [51.2361, 5.26389],
  [45.1, 5.89],
  [47.9172, 20.1884],
  [40.85, -3.97],
  [59.1006, 27.4371],
  [61.7, 21.7],
  [58.2762, 27.3269],
  [51.2714, 10.3112],
  [45.11, 5.89],
  [49.3165, 16.7385],
  [53.1073, 13.6944],
  [49.2971, 16.6112],
  [48.758, 13.9322],
  [45.11, 5.89],
  [51.2361, 5.26389],
  [51.2361, 5.26389],
  [59.0619, 27.5162],
  [51.9557, 39.4677],
  [57.0739, 53.2202],
  [49.1457, 13.3667],
  [56.7009, 13.1109],
  [52.77, 23.75],
  [57.0987, 53.1584],
  [58.116, 27.0333],
  [49.046, 13.6177],
  [40.85, -4.1],
  [45.11, 5.89],
  [47.3, 4.083],
  [50.2319, 12.6401],
  [49.2971, 16.6112],
  [49.325, 16.7872],
  [60.3432, -114.165],
  [51.2716, 10.3107],
  [49.2849, 16.6406],
  [60.3432, -114.165],
  [59.6638, -112.197],
  [51.3321, 10.358],
  [50.0939, 14.6133],
  [50.0939, 14.6133],
  [50.2319, 12.6401],
  [49.3078, 16.7611],
  [61.7, 21.7],
  [49.046, 13.6177],
  [57.1041, 53.0757],
  [49.07, -89.41],
  [49.1196, 13.2651],
  [40.85, -4.1],
  [40.85, -4.1],
  [42.45, 1.19],
  [48.23, 7.25],
  [48.758, 13.9322],
  [49.0174, 13.4751],
  [51.268, 10.2245],
  [67.7667, 29.5833],
  [50.2383, 12.6584],
  [48.08, 7.12],
  [49.3123, 16.7843],
  [49.2818, 16.7298],
  [51.2717, 10.3114],
  [49.0448, 13.618],
  [48.08, 7.12],
  [60.3432, -114.165],
  [42.45, 1.19],
  [59.0826, 27.4557],
  [58.1908, 26.5718],
  [42.5921, 1.07655],
  [48.08, 7.12],
  [61.8, 21.7],
  [45.1, 5.89],
  [61.8, 21.7],
  [49.2904, 16.6192],
  [48.71, 7.32],
  [49.2971, 16.6112],
  [49.3042, 16.6866],
  [51.2714, 10.3112],
  [58.3367, 26.5597],
  [56.0971, 10.5141],
  [58.25, 27.31],
  [49.2971, 16.6112],
  [47.3, 4.083],
  [58.2704, 27.3098],
  [51.2361, 5.26389],
  [51.2361, 5.26389],
  [48.71, 7.32],
  [48.71, 7.32],
  [49.044, 13.6171],
  [61.8, 21.7],
  [49.044, 13.6171],
  [40.0573, -105.624],
  [49.07, -89.41],
  [51.2717, 10.3114],
  [42.45, 1.19],
  [57.8779, 27.6894],
  [58.4624, 26.8208],
  [61.1467, 16.892],
  [49.3249, 16.6527],
  [52.0148, 5.77707],
  [52.0148, 5.77707],
  [58.25, 27.31],
  [49.2818, 16.7298],
  [49.043, 13.6182],
  [49.3239, 16.7651],
  [51.2717, 10.3114],
  [51.2714, 10.3112],
  [51.2714, 10.3112],
  [51.2717, 10.3114],
  [51.1258, 5.37278],
  [58.7879, 23.5328],
  [42.44, 1.15],
  [51.2361, 5.26389],
  [40.85, -4.1],
  [47.3, 4.083],
  [51.2714, 10.3112],
  [49.2631, 16.6481],
  [51.2714, 10.3112],
  [51.2361, 5.26389],
  [51.2714, 10.3112],
  [51.2361, 5.26389],
  [51.2714, 10.3112],
  [51.2361, 5.26389],
  [51.2361, 5.26389],
  [51.2714, 10.3112],
];

// Create the heatmap layer using the heatmap data
const heatmapLayer = L.heatLayer(heatmapData, {
  radius: 25, // Adjust the radius as needed
});

// Add pop up, highlight on hover for each point feature
function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.id) {
    layer.bindPopup(
      "<p>" +
        "<b>" +
        "Sample ID: " +
        "</b>" +
        feature.properties.id +
        "<br>" +
        "<b>" +
        "Paper ID: " +
        "</b>" +
        feature.properties.paper_id +
        "<br>" +
        "<b>" +
        "Continent: " +
        "</b>" +
        feature.properties.continent +
        "<br>" +
        "<b>" +
        "Sample type: " +
        "</b>" +
        feature.properties.sample_type +
        "<br>" +
        "<b>" +
        "Biome: " +
        "</b>" +
        feature.properties.biome +
        "<br>" +
        "<b>" +
        "Mean Annual Temperature: " +
        "</b>" +
        feature.properties.mat +
        "°c" +
        "<br>" +
        "<b>" +
        "Mean Annual Precipitation: " +
        "</b>" +
        feature.properties.map +
        "mm" +
        "<br>" +
        "<b>" +
        "Year Sampled: " +
        "</b>" +
        feature.properties.year_of_start +
        "</p>"
    );
  } else {
  }

  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}

function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
    color: "#1cecc9",
    fillOpacity: 1,
    weight: 2,
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  amus.resetStyle(e.target);
}

function updateOpacity(value) {
  avgtemptile.setOpacity(value);
  antBiome.setOpacity(value);
  nitrogen.setOpacity(value);
  hexbin_global.setOpacity(value);
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

const positronLabels = L.maptilerLayer({
  apiKey: key,
  pane: "labels",
  style: `https://api.maptiler.com/maps/ff2aabac-aeec-4475-88cb-0b7528028c78/style.json?key=${key}`,
  // optional
}).addTo(map);

const overlayMaps = {
  "Mean Annual Temperature": avgtemptile,
  "Nitrogen 0-5cm depth (cg/kg)": nitrogen,
  "Anthropogenic Biomes of the World, v1 (2001-2006)": antBiome,
  "Hexbin Map (All Samples)": hexbin_global,
  // "All Samples": globalfungiwms,
  "Heat Map": heatmapLayer,
  "Amanita muscaria Samples": amus,
};

const layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: true })
  .addTo(map);

// Add and remove layers
uri =
  "https://maps.isric.org/mapserv?map=/map/nitrogen.map&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=nitrogen_0-5cm_mean&format=image/png&STYLE=default";

uriantBiome =
  "https://sedac.ciesin.columbia.edu/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=anthromes%3Aanthromes-anthropogenic-biomes-world-v1";

urihexbin =
  "http://localhost:8080/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=globalfungi%3AHexbin_Global";

var nitrolegend;

map.on("overlayadd", function (e) {
  // Switch to the nitrogen legend...
  //   e.preventDefault();
  //   e.stopPropagation();
  nitrolegend = L.wmsLegend(uri);

  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    nitrolegend.addTo(map);
  } else if (map.removeControl(nitrolegend));
});

map.on("overlayremove", function (e) {
  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    map.removeControl(nitrolegend);
  }
});

var antBiomelegend;

map.on("overlayadd", function (e) {
  // Switch to the nitrogen legend...
  //   e.preventDefault();
  //   e.stopPropagation();
  antBiomelegend = L.wmsLegend(uriantBiome);

  if (e.name === "Anthropogenic Biomes of the World, v1 (2001-2006)") {
    antBiomelegend.addTo(map);
    // console.log(e);
  } else if (map.removeControl(antBiomelegend));
});

map.on("overlayremove", function (e) {
  if (e.name === "Anthropogenic Biomes of the World, v1 (2001-2006)") {
    map.removeControl(antBiomelegend);
    // console.log(e);
  }
});

var hexbinlegend;

map.on("overlayadd", function (e) {
  // Switch to the nitrogen legend...
  //   e.preventDefault();
  //   e.stopPropagation();
  hexbinlegend = L.wmsLegend(urihexbin);

  if (e.name === "Hexbin Map (All Samples)") {
    hexbinlegend.addTo(map);
    console.log(e);
  } else if (map.removeControl(hexbinlegend));
});

map.on("overlayremove", function (e) {
  if (e.name === "Hexbin Map (All Samples)") {
    map.removeControl(hexbinlegend);
    console.log(e);
  }
});

// Create the hexbin layer and set all of the accessor functions

// !!need to use live web server to loadJSON!!
// let hexData = fetch("/globalfungi_latlng.json").then(function (response) {
//   return response.json();
// });
// hexData.then(function (data) {
//   // data now contains the loaded JSON data
//   L.geoJson(data);
// });

// var options = {
//   radius: 12,
//   opacity: 0.5,
//   duration: 500,
// };

// var hexLayer = L.hexbinLayer(options).addTo(map);
// hexLayer.colorScale().range(["white", "#ad1345"]);

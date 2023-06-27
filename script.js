// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// maxZoom: 18,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
// }).addTo(map);

const key = "HSFYhxikAmTFWmRDoLeS";
// const map = L.map('map').setView([48.138666, 11.575366],2.5);
const positron = L.maptilerLayer({
  apiKey: key,
  style: `https://api.maptiler.com/maps/acf17a5b-b4e1-43f1-83e5-695e0818c542/style.json?key=HSFYhxikAmTFWmRDoLeS`, // optional
});
const satellite = L.maptilerLayer({
  apiKey: key,
  style: `https://api.maptiler.com/maps/satellite/style.json?key=HSFYhxikAmTFWmRDoLeS`,
});

const avgtemptile = L.tileLayer.wms(
  "https://storage.googleapis.com/zhenjiang-li/AverageDailyAirTemperature2022/{z}/{x}/{y}",
  {
    layers: "2022 July Average Daily Air Temperature at 2m",
    format: "image/png",
    transparent: true,
    noWrap: false,
    opacity: 0.8,
    attribution:
      '<a href="https://cds.climate.copernicus.eu/cdsapp#!/home">Generated using Copernicus Climate Change Service Information [2023] </a> and <a href="https://developers.google.com/earth-engine/datasets/catalog/ECMWF_ERA5_LAND_DAILY_AGGR#terms-of-use">Google Earth Engine</a>',
  }
);

const avgpretile = L.tileLayer.wms(
  "https://storage.googleapis.com/zhenjiang-li/AverageDailyTotalPrecipitation2022/{z}/{x}/{y}",
  {
    layers: "AverageDailyTotalPrecipitation2022",
    format: "image/png",
    transparent: true,
    noWrap: false,
    opacity: 0.8,
    attribution:
      '<a href="https://cds.climate.copernicus.eu/cdsapp#!/home">Generated using Copernicus Climate Change Service Information [2023] </a> and <a href="https://developers.google.com/earth-engine/datasets/catalog/ECMWF_ERA5_LAND_DAILY_AGGR#terms-of-use">Google Earth Engine</a>',
  }
);

const nitrogen = L.tileLayer.wms(
  "https://maps.isric.org/mapserv?map=/map/nitrogen.map",
  {
    layers: "nitrogen_0-5cm_mean",
    format: "image/png",
    transparent: true,
    noWrap: true,
    opacity: 0.8,
    attribution:
      '<a href="https://maps.isric.org">WMS from ISRIC World Soil Information [2021]</a>',
  }
);

const antBiome = L.tileLayer.wms(
  "https://sedac.ciesin.columbia.edu/geoserver/wms",
  {
    layers: "anthromes:anthromes-anthropogenic-biomes-world-v1",
    format: "image/png",
    transparent: true,
    noWrap: true,
    opacity: 0.8,
    attribution:
      '<a href="https://sedac.ciesin.columbia.edu/data/collection/anthromes/maps/services">WMS from NASA SEDAC [v1, 2001-2006]</a>',
  }
);

const ph = L.tileLayer.wms("http://localhost:8080/geoserver/wms/", {
  layers: "	globalfungi:ph",
  format: "image/png",
  transparent: true,
  noWrap: true,
  version: "1.1.0",
});

// PH POPUP
const ph_popup = {
  radius: 5,
  weight: 1,
  opacity: 0,
  fillOpacity: 0,
};

const PHpopup = new L.GeoJSON.AJAX("data/amanita_muscaria.geojson", {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, ph_popup);
  },
  onEachFeature: onEachFeature,
});

const gfMarker = {
  radius: 3,
  fillColor: "#a98bff", //a98bff
  color: "#fff",
  weight: 0.3,
  opacity: 1,
  fillOpacity: 0.6,
};

const globalfungi = new L.GeoJSON.AJAX("data/globalfungi.geojson", {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, gfMarker);
  },
  onEachFeature: onEachFeature,
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
  radius: 3,
  fillColor: "#c54a2f",
  color: "#fff",
  weight: 0.5,
  opacity: 1,
  fillOpacity: 0.8,
};

const biomeMarker = {
  radius: 3,
  fillColor: "#4aa856", //5dd36c
  color: "#fff",
  weight: 0.5,
  opacity: 1,
  fillOpacity: 0.8,
};

const amus = new L.GeoJSON.AJAX("data/amanita_muscaria.geojson", {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, amusMarker);
  },
  onEachFeature: onEachFeature,
});

const amusBiome = new L.GeoJSON.AJAX("data/amanita_muscaria.geojson", {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, biomeMarker);
  },
  onEachFeature: onEachFeature,
  filter: biomeFilter,
});

//HEATMAP
// Update the heatmap data with your coordinates
// data saved in "heatMap.js"

// Create the heatmap layer using the heatmap data
const heatmapLayer = L.heatLayer(heatmapData, {
  radius: 25,
  maxZoom: 10, // Adjust the radius as needed
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
        "pH Value: " +
        "</b>" +
        feature.properties.ph +
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
        " mm" +
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
  globalfungi.resetStyle(e.target);
}

//Opacity Slider
function updateOpacity(value) {
  avgtemptile.setOpacity(value);
  avgpretile.setOpacity(value);
  antBiome.setOpacity(value);
  nitrogen.setOpacity(value);
  hexbin_global.setOpacity(value);
}

function biomeFilter(feature) {
  if (feature.properties.biome === "forest") return true;
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

// Set the parameters
// The Geojson data you have in your folder
const geoJsonURL = "data/globalfungi.geojson";

// Start and End year of the dataset
const baseStartYear = 2000;
const baseEndYear = 2021;

//Markers & Clusters
// The color of the markers, used in function customizeMarker()
const markColor = "#4E91BE";
// Determine the threshold of distance that cluster multiple markers, used in Function initialMarkerClusters()
const maxClusterRadius = 120;
// Specify the color of the marker cluster in css under the class name, used in Function initialMarkerClusters()
const clusterColorClass = "marker-cluster-color";

// Check line 170-174 to customize the information on tooltip for your data

// Slider
$(function () {
  // config opaque slider
  $("#slider-opaque").slider({
    range: false,
    min: 0,
    max: 1,
    step: 0.1,
    value: 1,
    slide: function (event, ui) {
      let opaque = ui.value;

      $("#opacity").val(opaque);
      a2_1916_02.setOpacity(opaque);
    },
  });

  // initial display
  $("#opacity").val("1");

  // config time range slider
  $("#slider-range").slider({
    range: true,
    min: baseStartYear,
    max: baseEndYear,
    values: [baseStartYear, baseEndYear],

    // Every time slider is slided, the map should be refreshed
    slide: function (event, ui) {
      var newGeoJson = {
        type: "Feature Collection",
        features: [],
      };
      let startYear = ui.values[0];
      let endYear = ui.values[1];

      $("#amount").val(startYear + " - " + endYear);

      $.getJSON(geoJsonURL, function (data) {
        let GEOJSON = data;
        for (let i = 0; i < GEOJSON["features"].length; i++) {
          if (
            GEOJSON["features"][i]["properties"]["year_of_start"] >=
              startYear &&
            GEOJSON["features"][i]["properties"]["year_end"] <= endYear
          ) {
            // will change "id" to "year"
            newGeoJson["features"].push(GEOJSON["features"][i]);
          }
        }
        renderPinsFromJson(something_markers, newGeoJson);
      });
    },
  });
  //initial display
  $("#amount").val(
    $("#slider-range").slider("values", 0) +
      " - " +
      $("#slider-range").slider("values", 1)
  );
});

// Set markers & clusters on the map
var something_markers = initialMarkerClusters();

// Get the initial Markers
renderPinsFromURL(something_markers, geoJsonURL);

// Functions to be used above
// Implement the customized Icon
function customizeMarker() {
  const markerNarrativeHtmlStyles = `
                                          background-color: ${markColor};
                                          width: 0.8rem;
                                          height: 0.8rem;
                                          display: block;
                                          top: -1.2rem;
                                          position: relative;
                                          border-radius: 3rem 3rem 0;
                                          transform: rotate(45deg);
                                          border: 0.5px solid #FFFFFF
                                      `;
  var icon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 5],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerNarrativeHtmlStyles}" />`,
  });
  return icon;
}

// Set the cluster of markers
function initialMarkerClusters() {
  let groupToReturn = new L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    maxClusterRadius: `${maxClusterRadius}`,
    singleMarkerMode: false,
    iconCreateFunction: function (cluster) {
      count = 0;
      cluster.getAllChildMarkers().forEach(function (child) {
        count = count + parseInt(child.feature.properties.Count);
      });
      return L.divIcon({
        className: `marker-cluster ${clusterColorClass}`,
        iconSize: new L.Point(40, 40),
        html: `<div><span >` + count + "</span></div>",
      });
    },
  });
  return groupToReturn;
}

// When you have your Geojson file in your folder, use this function is　handy
function renderPinsFromURL(markers, geoJsonURL) {
  $.getJSON(geoJsonURL, function (data) {
    renderPinsFromJson(markers, data);
  });
}

// Render Markers on the map based on the geojson data
function renderPinsFromJson(markers, geoJson) {
  var customizedIcon = customizeMarker();
  var geojson = L.geoJson(geoJson, {
    // Information shown in tooltip
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: customizedIcon });
    },
  });
  markers.clearLayers();
  markers.addLayer(geojson);
}

//INITIALIZE MAP//

const map = new L.map("map", {
  // crs: crs,
  minZoom: 2,
  maxZoom: 15,
  layers: [positron, something_markers, amus],
}).setView([31, 8.6], 2.5);

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
  "Mean Annual Precipitation": avgpretile,
  "Nitrogen 0-5cm depth (cg/kg)": nitrogen,
  "Anthropogenic Biomes": antBiome,
  "Hex bin Map (All Samples)": hexbin_global,
  "Heat Map (Amanita muscaria)": heatmapLayer,
  "All fungi samples": something_markers,
  "Amanita muscaria Samples": amus,
  "Amanita muscaria Sampled pH": ph,
  "Amanita muscaria Biome: Forest": amusBiome,
};

const layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: true })
  .addTo(map);

//Adding titles to legend before overlays:

var targetElement = document.querySelector(
  "div.leaflet-control-layers-overlays"
);

//Add title for Environmental layers
var legendTitle = document.createElement("h3");
legendTitle.id = "legendTitle";
legendTitle.innerHTML = "Environmental ";
targetElement.parentNode.insertBefore(legendTitle, targetElement);

//Add title for Density layers
var legendTitle2 = document.createElement("h3");
legendTitle2.id = "legendTitle";
legendTitle2.innerHTML = "Density Map ";

var legendLabels = targetElement.getElementsByTagName("label");
var fourthlabel = legendLabels[4];
fourthlabel.parentNode.insertBefore(legendTitle2, fourthlabel);

//Add title for Fungi samples
var legendTitle3 = document.createElement("h3");
legendTitle3.id = "legendTitle";
legendTitle3.innerHTML = "Fungi Sample ";

var sixthlabel = legendLabels[6];
sixthlabel.parentNode.insertBefore(legendTitle3, sixthlabel);

// Add and remove legends for overlays:
uri =
  "https://maps.isric.org/mapserv?map=/map/nitrogen.map&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=nitrogen_0-5cm_mean&format=image/png&STYLE=default";

uriantBiome =
  "https://sedac.ciesin.columbia.edu/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=anthromes%3Aanthromes-anthropogenic-biomes-world-v1";

urihexbin =
  "http://localhost:8080/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=globalfungi%3AHexbin_Global";

// var nitrolegend;

// map.on("overlayadd", function (e) {
//   // Switch to the nitrogen legend...
//   if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
//     console.log("add nitrogen layer");

//     nitrolegend = L.wmsLegend(uri);
//     nitrolegend.addTo(map);
//     map.removeControl(antBiomelegend);
//   }
// });

// map.on("overlayremove", function (e) {
//   if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
//     console.log("remove nitrogen layer");

//     map.removeControl(nitrolegend);
//   }
// });

var avgnitrolegend;

map.on("overlayadd", function (e) {
  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    avgnitrolegend = L.control.Legend({
      position: "bottomright",
      title: " ",
      collapsed: false,
      symbolWidth: 250,
      symbolHeight: 60,
      opacity: 1,
      column: 1,
      legends: [
        {
          label: " ",
          type: "image",
          url: "png/nitro_legend.png",
        },
      ],
    });
    avgnitrolegend.addTo(map);
  }
});

map.on("overlayremove", function (e) {
  if (e.name === "Nitrogen 0-5cm depth (cg/kg)") {
    map.removeControl(avgnitrolegend);
  }
});

var antBiomelegend;

map.on("overlayadd", function (e) {
  if (e.name === "Anthropogenic Biomes") {
    antBiomelegend = L.wmsLegend(uriantBiome);
    antBiomelegend.addTo(map);
    // map.removeControl(nitrolegend);
  }
});

map.on("overlayremove", function (e) {
  if (e.name === "Anthropogenic Biomes") {
    map.removeControl(antBiomelegend);
  }
});

var hexbinlegend;

map.on("overlayadd", function (e) {
  if (e.name === "Hex bin Map (All Samples)") {
    hexbinlegend = L.wmsLegend(urihexbin);
    hexbinlegend.addTo(map);
  }
});

map.on("overlayremove", function (e) {
  if (e.name === "Hex bin Map (All Samples)") {
    map.removeControl(hexbinlegend);
  }
});

var avgtemplegend;

map.on("overlayadd", function (e) {
  if (e.name === "Mean Annual Temperature") {
    avgtemplegend = L.control.Legend({
      position: "bottomright",
      title: " ",
      collapsed: false,
      symbolWidth: 250,
      symbolHeight: 60,
      opacity: 1,
      column: 1,
      legends: [
        {
          label: " ",
          type: "image",
          url: "png/tem_legend.png",
        },
      ],
    });
    avgtemplegend.addTo(map);
  }
});

map.on("overlayremove", function (e) {
  if (e.name === "Mean Annual Temperature") {
    map.removeControl(avgtemplegend);
  }
});

var avgprelegend;

map.on("overlayadd", function (e) {
  if (e.name === "Mean Annual Precipitation") {
    avgprelegend = L.control.Legend({
      position: "bottomright",
      title: " ",
      collapsed: false,
      symbolWidth: 250,
      symbolHeight: 60,
      opacity: 1,
      column: 1,
      legends: [
        {
          label: " ",
          type: "image",
          url: "png/pre_legend.png",
        },
      ],
    });
    avgprelegend.addTo(map);
  }
});

map.on("overlayremove", function (e) {
  if (e.name === "Mean Annual Precipitation") {
    map.removeControl(avgprelegend);
  }
});

// For the PH legend
const phLegendUrl =
  "http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=25&LAYER=globalfungi:ph";

ph.on("add", function () {
  // Create and display the legend image when the "ph" layer is added
  legendImg = L.control({ position: "bottomright" });
  legendImg.onAdd = function (map) {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML = `<img src="${phLegendUrl}" alt="Legend">`;
    return div;
  };
  legendImg.addTo(map);
});

ph.on("remove", function () {
  // Remove the legend image when the "ph" layer is removed
  if (legendImg) {
    map.removeControl(legendImg);
    legendImg = null;
  }
});

// OVERLAY PHpopup to PH

// Add the event listener for the overlayadd event
map.on("overlayadd", function (e) {
  const selectedOverlay = e.name;

  // Check if the selected overlay is 'Heatmap'
  if (selectedOverlay === "Amanita muscaria Sampled pH") {
    // Make the two variables visible
    // Replace 'variable1' and 'variable2' with the actual variables you want to make visible
    PHpopup.addTo(map);
  }
});
// OVERLAY PHpopup to PH

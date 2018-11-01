// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [47.8, 13.05],
	zoom: 12
});

// alternatively the setView method could be used for placing the map in the window
//var map = L.map('map').setView([47.5, 13.05], 8);
L.control.scale().addTo(map);

//adding two base maps 


var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
	// toner.addTo(map);

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Made by Kaiyue Zang'
});
    OpenStreetMap_Mapnik.addTo(map);

var hillshade = L.tileLayer('http://c.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png').addTo(map);
	
	// for using the two base maps in the layer control, I defined a baseMaps variable
var baseMaps = {
    "OSM":OpenStreetMap_Mapnik,
	// "Toner": toner,
	"Hillshade": hillshade
}



/*we use ready-made map tile layers from online providers (idealy free tile layers) as base map.
for further examples have a look at: 
https://leaflet-extras.github.io/leaflet-providers/preview/

You can add a new variable for a base map following the structure of the examples above using the respective link.
*/



//
//---- Adding GeoJSON point features - to marker object
//


var school = L.geoJson(schoolJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: schoolStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a school building: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
school.addTo(map);
	

var home = L.geoJson(homeJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: homeStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is our house: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
home.addTo(map);


var bike = L.geoJson(bikeJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: bikeStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a bike store: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
bike.addTo(map);

var airport = L.geoJson(airportJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: airportStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is airport: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
airport.addTo(map);

var hospital = L.geoJson(hospitalJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: hospitalStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a hospital: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
hospital.addTo(map);

var IKEA = L.geoJson(IKEAJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: IKEAStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
IKEA.addTo(map);

var shopping = L.geoJson(shoppingJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: shoppingStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a shopping mall: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
shopping.addTo(map);

var market = L.geoJson(marketJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: marketStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a supermarket: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
market.addTo(map);

var train = L.geoJson(trainJson, {
    pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: trainStyle});
    }
    ,
    onEachFeature: function(feature, marker) {
            marker.bindPopup("This is a train station: " +feature.properties.TITLE + " at location: " + marker.getLatLng());
    }
});
train.addTo(map);

//
//---- adding an event to the map
//

//when you click in the map, an alert with the latitude and longitude coordinates of the click location is shown
// e is the event object that is created on mouse click

/*
map.addEventListener('click', function(e) {
    alert(e.latlng);
});

*/

/*
//the same functionality can be realized with reference to the function onClick

//definition of the function onClick
function onClick(evt){
	alert(evt.latlng);
}

map.addEventListener('click', onClick);

//short version (on is an alias for addEventListener):
//map.on('click', onClick);

*/



//
//---- Adding GeoJSON features and interactivity
//


//adding a GeoJSON polygon feature set

var border= L.geoJson(borderJson, {
    style: borderStyle,
    // onEachFeature: function (feature, layer) {
    //     layer.bindPopup('Feature name: ' + feature.properties.NAME + '<br>' + 'Feature area: ' +feature.properties.area);
    // }
});


function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target
	
    activefeature.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.6
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}

//function for resetting the highlight
function resetHighlight(e) {
	ciycle.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } );
    layer.bindPopup('This ciycle is area of ride time between ' + feature.properties.Name );

}

ciycle = L.geoJson(ciycleJson, {
    style: ciycleStyle,
    onEachFeature: interactiveFunction
}).addTo(map);




border.addTo(map);





//
//---- layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control
var features = {
	//"Marker 2": mark,
	"Salzburg": ciycle
}

//the legend uses the layer control with entries for the base maps and two of the layers we added
//in case either base maps or features are not used in the layer control, the respective element in the properties is null

// var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);






console.log(`
-----------------------------------------
     YOU LOADED MIKE'S MAP FUNCTIONS
-----------------------------------------
      Homework:  Week 17 // MapBox
-----------------------------------------

    To Make Basic Map, use:
    • makeMap(coords,mapType,*zoom=10,*div='map')
        returns --> map object

    To add a map Tile, use:
    • createTile(tile_type)
        returns --> tile object

    To place a marker, use:
    • placeMarkers([coords],Map,*[names]=[coords],*[Line 2 Description]=[]) 
        retruns --> array of markers

-----------------------------------------

`)

// SOME COORDS
BP = [32.74,-117.13]
YOS = [37.73,-119.60]
NY = [40.75,-73.98]
KS = [38,-98]
cities = [BP,YOS,NY]


// ------ CREATE A BASIC MAP -----------

function basicMap(coords,div='map',zoom=10) {
    var map = L.map(div, {
      center: coords,
      zoom: zoom
    })
    return map
} // END basicMap

// --------- CREATE A MAP TILE LAYER ----
function createTile(type) {
    var tile = 
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 16,
    id: `mapbox.${type}`,
    accessToken: API_KEY
  })
  return tile
  } // END createTile

// --- MAKE A  MAP
function makeMap(coords,map_type,zoom=10,map='map'){
    var map = basicMap(coords,div=map,zoom=zoom);
    var tile = createTile(map_type).addTo(map)
    return map
} // END makeMap




function makeCircles(locations,size,titles,line2){
    console.log('making circles')
    var circles = []
    for (i = 0; i < locations.length; i++){
        var msg = `<h3>${titles[i]}</h3><hr><h4>${line2[i]}</h4>`
        var circle = L.circleMarkers(locations[i],{
            radius:size[i] * 50000,
            color:'yellow',
            fillOpacity: 0.5
        }).bindPopup(msg)
        circles.push(circle)    
    } // end for loop
    circlesGroup = L.layerGroup(circles)
   return circlesGroup
} // end makeCircles


// ------- PLACE A MARKER ------------
function placeMarker(markerLocation,Map,PopUpLine1='Your Marker',PopUpLine2=markerLocation) {
    var msg = `<h3>${PopUpLine1}</h3><hr><h4>${PopUpLine2}</h4>`
    var marker = L.marker(markerLocation)
                    .addTo(Map)
                    .bindPopup(msg)
    console.log('creating marker and binding pop up.')
    return marker
 } // END placeMarker


 // ----- PLACE GROUP OF MARKERS ------
 function placeMarkers(markersArray,Map,namesArray=markersArray,Line2Array=[]){
    var markers = []
    var length = markersArray.length   
    console.log(`You have ${length} markers in your Array.`)
    for (i = 0; i < length; i++) {
        progress = Math.round((i+1)/length*100,2)
        var marker = placeMarker(markersArray[i],Map,namesArray[i],Line2Array[i])
        console.log(`${progress}% - Placing marker #${i+1} at ${markersArray[i]}.`)
        markers.push(marker)
    } // End for loop
    // console.log(markers)
    return markers
 } // END placeMarkers;

// ---------- SHOW SOME TILES ------------
 var Tiles = {
    Streets: createTile('streets'),
    Light: createTile('light'),
    Dark: createTile('dark'),
    Pencil: createTile('pencil'),
    Satellite: createTile('satellite'),
    Terrain: createTile('terrain-rgb'),
    Wheat: createTile('wheatpaste'),
    Outdoors: createTile('outdoors'),
    Pirate: createTile('pirates')

  }

  function showTiles(map,overlays=null,collapsed=false) {
    L.control.layers(Tiles, overlays, {
        collapsed: collapsed
      }).addTo(map);
  }

function makeMarkers(locations,titles=locations,Line2=locations) {
  var markers = []
  var length = locations.length
  console.log(`Creating a layer of ${length} markers.`)
  for (i = 0; i < length; i++) {
    var progress = Math.round((i+1)/length*100,2)
    console.log(`${progress}% complete.`)
    var msg = `<h3>${titles[i]}</h3><hr><h4>${Line2[i]}</h4>`
    var marker = L.marker(locations[i]).bindPopup(msg)
    markers.push(marker)
  }
  layer = L.layerGroup(markers)
  return layer
}

function makeCircles(locations,titles=locations,Line2=locations) {
  var markers = []
  var length = locations.length
  console.log(`Creating a layer of ${length} markers.`)
  for (i = 0; i < length; i++) {
    var progress = Math.round((i+1)/length*100,2)
    console.log(`${progress}% complete.`)
    var msg = `<h3>${titles[i]}</h3><hr><h4>${Line2[i]}</h4>`
    var marker = L.circle(locations[i]).bindPopup(msg)
    markers.push(marker)
  }
  layer = L.layerGroup(markers)
  return layer
}
 
// ---------- SHOW SOME TILES ------------
 console.log(`

      ** END OF MAP FUNCTIONS ** 


`)
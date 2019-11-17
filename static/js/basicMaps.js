
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

// ------ CREATE A BASIC MAP -----------

function basicMap(coords,div='map',zoom=10) {
    var map = L.map(div, {
      center: coords,
      zoom: zoom,
      pitch: 60,
      bearing: -60,
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

  function showTiles(Map,collapsed=false) {
    L.control.layers(Tiles, null, {
        collapsed: collapsed
      }).addTo(Map);
  }
 
// ---------- SHOW SOME TILES ------------
 console.log(`

      ** END OF MAP FUNCTIONS ** 


`)
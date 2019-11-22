console.log(`
-----------------------------------------
            MIKE'S LOGIC FILE
-----------------------------------------
       Homework:  Week 17 // MapBox
-----------------------------------------

`)

// Initial Map
//-----------------------
//         var firstMap = makeMap(KS,'outdoors',4)
//         showTiles(firstMap,null,false)
//         placeMarker(YOS,firstMap)
//         placeMarkers(cities,firstMap)


// JSON URLS

time = ['hour','day','week','month']
period = time[1]
quakes = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${period}.geojson`

// var circle = L.circle(KS, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500000
// }).addTo(firstMap);

// GET SOME DATA

function getMapData2(response){
  // Handle the Respsone
  features = response.features
  bbox = response.bbox
  length = features.length
 
  // Extract Data into Arrays
    lon = (bbox[0]+bbox[3])/2
    lat = (bbox[1]+bbox[4])/2
    latlon = [lat,lon]
    titles = features.map(feature => feature.properties.title)
    mags = features.map(feature => feature.properties.mag)
    locations = features.map(feature => [feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
    descriptions = features.map(feature => feature.properties.url)
    links = descriptions.map(urls => `<a href=${urls}>More Detail</a>`)

  // Create a Map
    console.log('Creating a Map.')
    map = makeMap(latlon,'pirates',3)
      
  // Make a Marker Layer
    quakes = makeMarkers(locations,titles,links)
    quakes.addTo(map)
    
  // Make some Circles
    var circles = [];
        circle = features.forEach(function(feature){
            link = `<a href=${feature.properties.url}>More Detail</a>`
            msg = `<h3>${feature.properties.title}</h3><hr><h4>${link}</h4>` 
            L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
                radius:feature.properties.mag**8*9,
                fillColor:'yellow',
                fillOpacity:'.8'
            }).bindPopup(msg).addTo(map)

        })
    
  // Add to Overlays
    var overlayMaps = {
      Earthquakes:quakes,        
    };

  showTiles(map,overlayMaps,false)

} // END getMapData

d3.json(quakes,getMapData2)


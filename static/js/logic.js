
console.log(`
-----------------------------------------
            MIKE'S LOGIC FILE
-----------------------------------------
       Homework:  Week 17 // MapBox
-----------------------------------------

`)

// --- CREATE A MAP ------- 
// SD = [32.740,-117.1327]
// UCSD = [32.852984,-117.183]
// myMap = makeMap(SD,'outdoors',12)
// showTiles(myMap)
// placeMarkers([SD,UCSD],myMap,['Home','Class'],['3354 Granada Ave','2'])

//---------------------------

signficant = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'



function getEarthquakes(response) {
    console.log('Calling getEarthquakes(response).')
    features = response.features
    bbox = response.bbox
    console.log(`There are ${features.length} features in this set.`)

    // Extract Data into Arrays
    boundaries = [bbox[4],bbox[1]]
    titles = features.map(feature => feature.properties.title)
    locations = features.map(feature => [feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
    descriptions = features.map(feature => feature.properties.url)
    links = descriptions.map(urls => `<a href=${urls}>More Detail</a>`)

    data = [boundaries,locations,titles,descriptions,links]

    return data

} // END getEarthquakes



d3.json(signficant,function(response){
    // Get the Earthquake Data
      data = getEarthquakes(response)
  
    // Create a Map
      console.log('Creating a Map.')
      latlon = data[0]
      console.log(latlon)
      map = makeMap(latlon,'satellite',3  )
      showTiles(map)
  
    // Add markers to the Map
    placeMarkers(data[1],map,data[2],data[4])

})






















//---------------------------
console.log(`

      ** END OF LOGIC FILE ** 

`)
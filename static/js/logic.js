
console.log(`
-----------------------------------------
            MIKE'S LOGIC FILE
-----------------------------------------
       Homework:  Week 17 // MapBox
-----------------------------------------

`)

//---------------------------

signficant = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'


d3.json(signficant,function(response){

    // Handle the Respsone
      features = response.features
      bbox = response.bbox
      length = features.length
      console.log(`There are ${length} features in this set.`)

    // Extract Data into Arrays
      latlon = [bbox[4],bbox[1]]
      titles = features.map(feature => feature.properties.title)
      locations = features.map(feature => [feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
      descriptions = features.map(feature => feature.properties.url)
      links = descriptions.map(urls => `<a href=${urls}>More Detail</a>`)

    // Create a Map
      console.log('Creating a Map.')
      map = makeMap(latlon,'pirates',3)

    // Make a Marker Layer
      quakes = makeMarkers(locations,titles,links)
      quakes.addTo(map)

    // Add to Overlays
      var overlayMaps = {
        'Significant Quakes':quakes
      };

    showTiles(map,overlayMaps,false)


}); // END d3.json

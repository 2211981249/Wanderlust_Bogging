
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
  let maptoken=mapToken;
  //console.log(mapToken);
	mapboxgl.accessToken =maptoken;
    const map = new mapboxgl.Map({
        container: 'map', 
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


    console.log(listing.geometry.coordinates);

    const marker1 = new mapboxgl.Marker({color :"red"})
    .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
    .setPopup(
      new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listing.title}</h4><p>Exact Location provided after booking </p>`
      )
    )
    .addTo(map);

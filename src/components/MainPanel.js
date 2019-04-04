// IMPORT REACT
import React, {Component} from "react";


// IMPORT CUSTOM COMPONENTS
import SidePanel from "./SidePanel.js";
import mapStyle from "../styles/mapStyle.js";
import userIcon from "../images/userMarker2.png"
import donut from "../images/donut.png";
import "../styles/MainPanel.css";


// ===============================
// MAIN PANEL COMPONENT
// ===============================
class MainPanel extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			userPos : {},
			map: null,
			mapBounds: {},
			placesData : [],
			isLoading: true,
			hideMap: null
		};

		// Bindings
		this.initMap = this.initMap.bind(this);
		this.handleLocationError = this.handleLocationError.bind(this);
		this.mapBoundsListener = this.mapBoundsListener.bind(this);
		this.fetchPlaces = this.fetchPlaces.bind(this);
		this.pushPlaces = this.pushPlaces.bind(this);
		this.hideMap = this.hideMap.bind(this);
		this.showMap = this.showMap.bind(this);
	}


	// ===============================
	// INITIALIZE GOOGLE MAP
	// ===============================
	initMap() {
		// Check to see if browser allows Geolocation
		if (navigator.geolocation) {

    		// Get current user position and assign it to state
    		navigator.geolocation.getCurrentPosition( position => {   		
      			this.setState({
      				userPos : {
						lat: position.coords.latitude,
	        			lng: position.coords.longitude
      				}
      			});

		      	// Create new instance of Google Map, placed in local #map div
				let map = new window.google.maps.Map(document.getElementById("mainPanel-map"), {
					center: this.state.userPos,
					zoom: 15,
					styles: mapStyle
				});

				// Add event listener to map for map bounds
				this.mapBoundsListener(map);

				// Create new instance of user marker at user position in map
				let userMarker = new window.google.maps.Marker({
					position: this.state.userPos,
					map: map,
					icon: userIcon

				});

				this.setState({map: map});

			// If Geolocation error, run error function
			}, function() {
      			this.handleLocationError(true, this.state.map.getCenter());
    		});

    	// If browser does not allow Geolocation, run error function
		} else {
			this.handleLocationError(false, this.state.map.getCenter());
		}
	}


	// ===============================
	// HANDLE LOCATION ERRORS
	// ===============================
	handleLocationError(browserHasGeolocation, mapCenter) {
		// Create new infoWindow
		let infoWindow = new window.google.maps.InfoWindow();

		// Show infoWindow with message		
		infoWindow.setPosition(mapCenter);
		infoWindow.setContent(browserHasGeolocation ?
        	'Error: The Geolocation service has failed.' :
        	'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(this.state.map);
	}


	// ===============================
	// MAP BOUNDS EVENT LISTENER
	// ===============================
	mapBoundsListener(map) {
		// Add event listener to update state of mapBounds when map is moved
		window.google.maps.event.addListener(map, 'idle', () => {
			this.setState({
				mapBounds: map.getBounds(),
			});
			// Call fetchPlaces() to get updated Google API data
			this.fetchPlaces();
		});
	}


	// ===============================
	// FETCH PLACES FROM GOOGLE API
	// ===============================
	fetchPlaces() { 
		// Create request for Google Places based on current map bounds
		let request = {
			bounds: this.state.mapBounds,
			type: ['restaurant'],
		};

		// Submit request
		let service = new window.google.maps.places.PlacesService(this.state.map);
		service.nearbySearch(request, this.pushPlaces);
	}


	// =================================
	// STRUCTURE AND SET PLACES RESULTS
	// =================================
	pushPlaces(results, status) {
		// Define var
		let resultsArray;

		// If there are results from the API request
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {

			// Take results and create objects array
			resultsArray = results.map( result => {

				// Get places rating or return 0
				let avgRating, totalRatings;
				if (result.rating) {
					avgRating = result.rating;
					totalRatings = result.user_ratings_total;
				} else {
					avgRating = 0;
					totalRatings = 0;
				};

				// Get opening hours or return false
				let openNow;
				if (result.opening_hours) {
					openNow = result.opening_hours.open_now;
				} else {
					openNow = false;
				};

				// Get price level or return 0
				let priceLevel;
				if (result.price_level) {
					priceLevel = result.price_level;
				} else {
					priceLevel = 0;
				};

				// Get places photo URL or stand-in for each restaurant
				let placesPhotoURL;
				if (result.photos) {
					placesPhotoURL = result.photos[0].getUrl({maxWidth: 600});
				} else {
					placesPhotoURL = donut;
				};

				// Return restaurant object
				return {
					title: result.name,
					id: result.place_id,
					lat: result.geometry.location.lat(),
					lng: result.geometry.location.lng(),
					address: result.vicinity,
					avgRating: avgRating,
					totalRatings: totalRatings,
					price: priceLevel,
					openNow: openNow,
					photo: placesPhotoURL,
					placeReviews: [],
					userReviews: [],
					userAdded: false
				}
			});

			// Set updated array of restaurants to state
			this.setState({
				placesData : resultsArray,
				isLoading: false
			});

		// If no results returned from API
		} else {
			// Empty the state
			resultsArray = [];
			this.setState({
				placesData : resultsArray,
				isLoading: false
			});
		}
	}


	// ===============================
	// HIDE MAP
	// ===============================
	hideMap () {
		// Give class to Map
		this.setState({
			hideMap: "hideMap"
		});
	}


	// ===============================
	// SHOW MAP
	// ===============================
	showMap () {
		// Give class to Map
		this.setState({
			hideMap: null
		});
	}


	// ===============================
	// COMPONENT DID MOUNT
	// ===============================		
	componentDidMount () {
		// Run the initial function to create map and API requests
		this.initMap()
	}


	// ===============================
	// RENDER
	// ===============================	
	render() {

		// Return Map and SidePanel
		return (
			<div id="mainPanel">

				{this.state.isLoading ? 
					<div  className="mainPanel-loadingImg" ></div>
					: 
					<span></span>
				}
					
				<div id="mainPanel-map" className={this.state.hideMap}></div>

				<SidePanel 
					restaurants={this.state.placesData} 
					map={this.state.map} 
					updatedMapBounds={this.state.mapBounds}
					hideMap={this.hideMap}
					showMap={this.showMap}
				/>
			</div>
		);
	}
}


// EXPORT MAIN PANEL
export default MainPanel;


// IMPORT REACT
import React, { Component } from "react";

// 	IMPORT CUSTOM COMPONENTS
import activeMarker from "../images/markerPink4.png";
import "../styles/NewRestaurant.css";
import donut from "../images/donut.png";


// ===============================
// NEW RESTAURANT COMPONENT
// ===============================
class NewRestaurant extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			coords: {lat: 0, lng: 0},
			address: "",
			placesID: false,
			nameValue: "",
			tempMarker: []
		}
	
		// Bindings
		this.submitRestaurant = this.submitRestaurant.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.setCoordinates = this.setCoordinates.bind(this);
		this.cancelSubmit = this.cancelSubmit.bind(this);
	}


	// ===============================
	// NAME CHANGE HANDLER
	// ===============================
	// Update state as user enters value
	nameChange (event) {
		this.setState({
			nameValue: event.target.value
		});
	}


	// ===============================
	// GET COORDINATES AND ADDRESS
	// ===============================
	getCoordinates () {
		// Define vars for coordinates
		let map = this.props.map; // <--- SHAMELESS HACK!
		let setCoordinates = this.setCoordinates; // <--- SHAMELESS HACK!
		let coords = {};
		let geoResult;
		let tempMarker;
		let thisRef = this; // <--- SHAMELESS HACK!

		// Create Geocoder
		let geocoder = new window.google.maps.Geocoder();

		// Change cursor to crosshair
		map.setOptions({draggableCursor:'crosshair'});

		// Launch click listener on map
		map.addListener('click', function(event) {

			// Define lat and lng coordinates
	   		coords.lat = event.latLng.lat();
	   		coords.lng = event.latLng.lng();

			// Remove click listener after click happens
			window.google.maps.event.clearListeners(map, 'click');

			// Change cursor back to defualt
			map.setOptions({draggableCursor:null});

			// Add temporary map marker to highlight new restaurant
		  	tempMarker = new window.google.maps.Marker({
	    		position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
	    		map: map,
	    		icon: activeMarker,
	    		animation: window.google.maps.Animation.DROP
			});

		  	// Push tempMarker to state
			thisRef.setState( prevState => ({ 
	  			tempMarker: prevState.tempMarker.concat(tempMarker),
			}));

			// Get address of coords via Geocoder
			geocoder.geocode({'location': coords}, function(results, status, temp) {
			   	if (status === 'OK') {
			      	// If result exists
			      	if (results[0]) {
			      		// Create object from first result
			      		geoResult = {
			      			address: results[0].formatted_address,
			      			placesID: results[0].place_id
			      		};
			      		// Set coords and PlacesID of new marker 
						setCoordinates(geoResult, coords);

					// If no results, error message
			      	} else {
			      		window.alert('No results found');
			      	}
		      	// If connection status fails
		    	} else {
			     	window.alert('Geocoder failed due to work.');
			    }
		  	});
  		});
	}


	// ===============================
	// SET RESULTS OF COORDS TO STATE
	// ===============================
	setCoordinates (geoResult, coords) {
		this.setState({
			coords: coords,
			address: geoResult.address,
			placesID: geoResult.placesID
		});
	}


	// ===============================
	// SUBMIT USER RESTAURANT
	// ===============================
	submitRestaurant () {
		// Create new restaurant object
		let userRestaurant = {
			// Values for <RestaurantListing />, <RestaurantDetails />, and <MarkersArray />
			title: this.state.nameValue,
			address: this.state.address,
			phone: null,
			website: null,
			openNow: null,
			hours: null,
			avgRating: 0,
			totalRatings: 0,
			placeReviews: [],
			userReviews: [],
			id: this.state.placesID ? this.state.placesID : this.props.counter,
			lat: this.state.coords.lat,
			lng: this.state.coords.lng,
			price: null,
			photo: donut,
			userAdded: true
		};

		// Pass userRestaurant up to <SidePanel />
		this.props.handleSubmit(userRestaurant);

		// Remove temp marker from map on submit
		if (this.state.tempMarker.length > 0) {
			for (let i = 0; i < this.state.tempMarker.length; i++) {
				this.state.tempMarker[i].setMap(null);
			}
		}
	}


	// ===============================
	// CANCEL ADD NEW RESTAURANT
	// ===============================
	cancelSubmit () {
		this.props.handleCancel();
	}


	// ===============================
	// RENDER
	// ===============================
	render () {

		return (
			<div className="newRestaurant">

				<h3 className="newRestaurant-title">ADD A RESTAURANT</h3>
				
				<p className="newRestaurant-name">RESTAURANT NAME</p>

				<input type="text" 
					className="newRestaurant-name-input"
					label="Name of restaurant" 
					value={this.state.nameValue} 
					onChange={this.nameChange} 
					required="required"
					size="30"
				/>

				<p className="newRestaurant-address">ADDRESS</p>
				
				<input className="newRestaurant-address-input" 
					value={this.state.address}
					required="required"
					readOnly
					size="50"
					placeholder="See instructions below"
				/>
			
				<p className="newRestaurant-address-help" >
					Click the "SET COORDINATES" button, then click a location on the map to get the address of the business.
				</p>

				<button  className="newRestaurant-coordsButton" 
					onClick={this.getCoordinates} >
					SET COORDINATES
				</button>

				<div>
					<button  className="newRestaurant-submitButton" 
						onClick={this.submitRestaurant} >
						SUBMIT
					</button>

					<button  className="newRestaurant-cancelButton" 
						onClick={this.cancelSubmit} >
						CANCEL
					</button>
				</div>
			</div>
		);
	}

}


// EXPORT NEW RESTAURANT COMPONENT
export default NewRestaurant;


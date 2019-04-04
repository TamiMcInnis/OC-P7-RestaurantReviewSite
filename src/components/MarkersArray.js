// IMPORT REACT
import React, { Component } from "react";
import ReactDOMServer from 'react-dom/server';


// IMPORT CUSTOM COMPONENTS
import fork from "../images/fork.png";
import Stars from "./Stars.js";
import DollarSigns from "./DollarSigns.js";
import activeMarker from "../images/markerPink4.png";
import "../styles/InfoWindow.css";


// ===============================
// MARKER COMPONENT
// ===============================
class MarkersArray extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			displayMarkers: true,
			markersArray: []
		}
	
		// Bindings
		this.createMarkers = this.createMarkers.bind(this);
		this.findMarker = this.findMarker.bind(this);
	}


	// ===============================
	// CREATE RESTAURANT MARKERS
	// ===============================
	createMarkers () {
		// Create array of markers from passed props
		let markersArray = this.props.restaurants.map( restaurant => {

			// Create new marker object for each restaurant in props
			let marker = new window.google.maps.Marker({
	    		position: {lat: restaurant.lat, lng: restaurant.lng},
	    		map: this.props.map,
	    		icon: fork,
	    		avgRating: restaurant.avgRating,
	    		price: restaurant.price,
	    		id: restaurant.id,
	    		title: restaurant.title
			});

			// Render content string from <Stars /> for infoWindow
			let starComponent = ReactDOMServer.renderToString(
				<Stars rating={restaurant.avgRating} key={restaurant.id} />
			);

			// Render content string from <DollarSigns /> for infoWindow
			let dollarSignsComponent = ReactDOMServer.renderToString(
				<DollarSigns price={restaurant.price} key={restaurant.id} />
			);

			// Create infoWindow with content string
			let infoWindow = new window.google.maps.InfoWindow({
				content: 
				"<div class='infoWindow'>" + 
			 		"<h3 class='infoWindow-title'>" + restaurant.title + "</h3>" +
			 		"<span class='infoWindow-price'>" + dollarSignsComponent + "</span>" +
					"<span class='infoWindow-rating'>" + restaurant.avgRating + "</span>" +
					"<span class='infoWindow-stars'>" + starComponent + "</span>" +
				"</div>"
			});

			// Store reference to map for marker listeners
			let markerMap = this.props.map;

			// Add click listener to markers
			marker.addListener("mouseover", function() {
				infoWindow.open(markerMap, this);
			});
			marker.addListener("mouseout", function() {
				infoWindow.close();
			});

			// Return marker for future reference
			return marker;
		});

		// Set markersArray to state
		this.setState({markersArray: markersArray});
	}


	// ===============================
	// FIND MARKER TO MAKE ACTIVE
	// ===============================
	// Switch icon on matched marker to activeMarker
	findMarker(markerID) {
		if (markerID.id === this.props.hoveredListing) {
			markerID.setIcon(activeMarker);
		}
	}


	// ===============================
	// COMPONENT DID UPDATE
	// ===============================	
	componentDidUpdate (prevProps) {
		// If this.props.restaurants has updated
		if (prevProps.restaurants !== this.props.restaurants) {
			
			// Remove any previous markers from map and rerun createMarkers()
			if (this.state.markersArray.length > 0) {
				for (let i = 0; i < this.state.markersArray.length; i++) {
					this.state.markersArray[i].setMap(null);
				}
				this.createMarkers();
			// Else just rerun createMarkers()
			} else {
				this.createMarkers();
			}
		}

		// Find marker to match hovered listing, and run findMarker()
		if (prevProps.hoveredListing !== this.props.hoveredListing) {
			if (this.props.hoveredListing) {
				this.state.markersArray.find(this.findMarker);
			} else if (this.props.hoveredListing === null) {
				this.state.markersArray.forEach( function(markerID) {
					markerID.setIcon(fork);
				});
			}
		}
	}


	// ===============================
	// RENDER
	// ===============================	
	render () {	
		return (null);
	}
}


// EXPORT MARKERS ARRAY COMPONENT
export default MarkersArray;

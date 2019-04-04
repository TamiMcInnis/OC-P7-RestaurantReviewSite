// IMPORT REACT
import React, { Component } from "react";

// IMPORT CUSTOM COMPONENTS
import RestaurantListing from "./RestaurantListing.js";
import RestaurantDetails from "./RestaurantDetails.js";
import "../styles/RestaurantPanel.css";


// DECLARE GLOBAL VARS
let restaurantsArray = [];


// ===============================
// RESTAURANT PANEL COMPONENT
// ===============================
class RestaurantPanel extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			viewList: true,
			map: true,
			detailPanel: null
		}

		// Bindings
		this.placesDetailsReq = this.placesDetailsReq.bind(this);
		this.createList = this.createList.bind(this);
		this.closeDetails = this.closeDetails.bind(this);
		this.returnPlace = this.returnPlace.bind(this);
		this.userAddedDetailsRequest = this.userAddedDetailsRequest.bind(this);
		this.pushNewReview = this.pushNewReview.bind(this);
		this.findMarker = this.findMarker.bind(this);
	}


	// ===========================================================
	// PUSH NEW USER REVIEW FROM RESTAURANT DETAILS TO SIDE PANEL
	// ===========================================================
	pushNewReview (restaurantID, userReview) {
		this.props.pushNewReview(restaurantID, userReview);
	}


	// ===========================================================
	// PASS ID OF HOVERED LISTING TO MARKER ARRAY
	// ===========================================================
	findMarker (id) {
		this.props.handleHover(id);
	}


	// ===============================
	// CREATE RESTAURANT DETAILS
	// ===============================	
	returnPlace(place, status) {
		let selectedPlace;
		let matchedRestaurant;

		// If API returns result
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			// Get open status
			let openNow;
			if (place.opening_hours) {
				openNow = place.opening_hours.open_now;
			} else {
				openNow = false;
			};

			// Get weekday hours
			let weekdayHours;
			if (place.opening_hours && place.opening_hours.weekday_text) {
				weekdayHours = place.opening_hours.weekday_text;
			} else {
				weekdayHours = "No operating hours available";
			};

			// If no reviews exist, return empty array
			let placeReviews;
			let placeAvgRating;
			let placeTotalRatings;
			if (place.reviews) {
				placeReviews = place.reviews;
				placeAvgRating = place.rating;
				placeTotalRatings = place.user_ratings_total;
			} else {
				placeReviews = [];
				placeAvgRating = 0;
				placeTotalRatings = 0;
			};

			// Get price level or return 0
			let priceLevel;
			if (place.price_level) {
				priceLevel = place.price_level;
			} else {
				priceLevel = 0;
			};

			// Create object of Place details
		   	selectedPlace = {
	   			title: place.name,
	   			address: place.vicinity,
	   			phone: place.formatted_phone_number,
	   			website: place.website,
	   			openNow: openNow,
	   			hours: weekdayHours,
	   			price: priceLevel,
	   			avgRating: placeAvgRating,
	   			totalRatings: placeTotalRatings,
	   			lat: place.geometry.location.lat(),
	   			lng: place.geometry.location.lng(),
	   			restaurantID: place.place_id,
	   			placeReviews: placeReviews
		   	};
		} else {
		// If no Places result returned, use previous info and show message
			console.log("No details found!");
		}

		// run filter on props array to find match via place.place_id
		matchedRestaurant = this.props.restaurants.find( restaurant => restaurant.id === place.place_id);

		// Create <RestaurantDetails /> component with Place details
		let detailPanel = <RestaurantDetails 
			title={selectedPlace.title}
			phone={selectedPlace.phone}
			avgRating={selectedPlace.avgRating}
			totalRatings={selectedPlace.totalRatings + matchedRestaurant.userReviews.length}
			address={selectedPlace.address}
			website={selectedPlace.website}
			openNow={selectedPlace.openNow}
			hours={selectedPlace.hours}
			price={selectedPlace.price}
			placeReviews={selectedPlace.placeReviews}
			userReviews={matchedRestaurant.userReviews}
			lat={selectedPlace.lat}
			lng={selectedPlace.lng}
			restaurantID={selectedPlace.restaurantID}
			handleClose={this.closeDetails} 
			passReview={this.pushNewReview}
		/>;	

		// Set state of viewList to false
		this.setState({
			viewList: false,
			detailPanel: detailPanel
		});

		// Change view in parent component
		this.props.handleClick();

		// Change view of Side Panel to full height (if media query applies)
		this.props.expandSidePanel()
	}


	// =====================================
	// CREATE USER ADDED RESTAURANT DETAILS
	// =====================================
	userAddedDetailsRequest (id) {
		// Find user restaurant from props array whose ID matches clicked listing
		function matchID(restaurant) {
			return restaurant.id === id;
		}
		// Set matched restaurant to var
		let selectedPlace = this.props.restaurants.find(matchID);

		// Create <RestaurantDetails /> component with Place details
		let detailPanel = <RestaurantDetails 
			title={selectedPlace.title}
			phone={selectedPlace.phone}
			avgRating={selectedPlace.avgRating}
			totalRatings={selectedPlace.totalRatings + selectedPlace.userReviews.length}
			address={selectedPlace.address}
			website={selectedPlace.website}
			openNow={selectedPlace.openNow}
			hours={selectedPlace.hours}
			price={selectedPlace.price}
			placeReviews={selectedPlace.placeReviews}
			userReviews={selectedPlace.userReviews}
			lat={selectedPlace.lat}
			lng={selectedPlace.lng}
			handleClose={this.closeDetails} 
			restaurantID={id}
			passReview={this.pushNewReview}
		/>;	

		// Set state of viewList to false
		this.setState({
			viewList: false,
			detailPanel: detailPanel

		});

		// Change view in parent component
		this.props.handleClick();

		// Change view of Side Panel to full height (if media query applies)
		this.props.expandSidePanel()
	}


	// ===============================
	// CLOSE DETAILS PANEL
	// ===============================	
	closeDetails() {
		// Set state of viewList to true
		this.setState({
			viewList: true
		});
		// Change view in parent component
		this.props.closeDetails();
	}


	// ===============================
	// SUBMIT PLACES DETAILS REQUEST
	// ===============================	
	placesDetailsReq(id, userAdded) {
		// If restaurant is NOT created by user
		if (userAdded === false) {
			// set request details for Places API, passing in ID of clicked restaurant
			var request = {
	 			placeId: id,
	  			fields: ['name', 'rating', 'user_ratings_total', 'price_level', 'formatted_phone_number', 'vicinity', 'opening_hours', 'reviews', 'website', 'geometry', 'place_id']
			};

			// make request to Places API, and call returnPlace() when ready
			let service = new window.google.maps.places.PlacesService(this.props.map);
			service.getDetails(request, this.returnPlace);
		// Else do not submit Places Details request
		} else {
			this.userAddedDetailsRequest(id);
		}
	}


	// ===============================
	// CREATE RESTAURANT LIST
	// ===============================	
	createList() {
		// Create array of <RestaurantListings /> from props array
		if (this.props.restaurants.length > 0) {
			restaurantsArray = this.props.restaurants.map( restaurant => {
				return <RestaurantListing 
					title={restaurant.title}
					avgRating={restaurant.avgRating}
					totalRatings={restaurant.totalRatings + restaurant.userReviews.length}
					address={restaurant.address}
					price={restaurant.price}
					key={restaurant.id}
					placesID={restaurant.id}
					openNow={restaurant.openNow}
					photo={restaurant.photo}
					userAdded={restaurant.userAdded}
					handleClick={this.placesDetailsReq}
					handleHover={this.findMarker}
				/>	
			});
		} else {
			// Define array as error message
			restaurantsArray = 
			<div className="restaurantPanel-noResto" >
				<div className="restaurantPanel-noResto-box" >
					<p className="restaurantPanel-noResto-message">
						NO RESTAURANTS IN THIS AREA
					</p>
				</div>
			</div>;
		}
	}


	// ===============================
	// RENDER
	// ===============================
	render() {
		this.createList();

		// Return either <RestaurantListing /> array or selected <RestaurantDetails />
		return (
			<div id="restaurantPanel">
				{this.state.viewList ? restaurantsArray : this.state.detailPanel}
			</div>
		);
	}
}


// EXPORT RESTAURANT PANEL
export default RestaurantPanel;

// IMORT REACT
import React, { Component } from "react";

// IMPORT CUSTOM COMPONENTS
import Header from "./Header.js";
import RestaurantPanel from "./RestaurantPanel.js";
import MarkersArray from "./MarkersArray.js";
import NewRestaurant from "./NewRestaurant.js";
import Oneplus from "../images/1plus.png";
import Twoplus from "../images/2plus.png";
import Threeplus from "../images/3plus.png";
import Fourplus from "../images/4plus.png";
import Fiveplus from "../images/5plus.png";
import OneplusActive from "../images/1plusActive.png";
import TwoplusActive from "../images/2plusActive.png";
import ThreeplusActive from "../images/3plusActive.png";
import FourplusActive from "../images/4plusActive.png";
import FiveplusActive from "../images/5plusActive.png";
import "../styles/SidePanel.css";


// ===============================
// SIDE PANEL COMPONENT
// ===============================
class SidePanel extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			beenModified: false,
			modifiedRestaurants: [],
			filterOn: false,
			filterValue: 0,
			filteredRestaurants: [],
			viewFilter: true,
			viewNewRestaurantButton: true,
			viewRestaurantPanel: true,
			newRestaurantCounter: 0,
			hoveredListing: "",
			expandSidePanel: null
		}

		// Bindings
		this.filterRestaurants = this.filterRestaurants.bind(this);
		this.addRestaurant = this.addRestaurant.bind(this);
		this.passArray = this.passArray.bind(this);
		this.pushNewRestaurant = this.pushNewRestaurant.bind(this);
		this.pushNewReview = this.pushNewReview.bind(this);
		this.hideButtons = this.hideButtons.bind(this);
		this.restoreDefaultView = this.restoreDefaultView.bind(this);
		this.findMarker = this.findMarker.bind(this);
		this.expandSidePanel = this.expandSidePanel.bind(this);
	}


	// ===============================
	// RESTAURANT FILTER
	// ===============================	
	filterRestaurants(event) {
		// Get number value from user input
		let ratingValue = 0;
		if (event) {
		ratingValue = Number(event.target.value);
		};

		// Create filtered array
		let filteredRestaurants = [];

		// Check restaurant rating against user rating input
		function ratingFilter(restaurant) {
			if (restaurant.avgRating >= ratingValue) {
				filteredRestaurants.push(restaurant);
			}
		}

		// Determine which array to run filter on
		if (this.state.modifiedRestaurants.length < 1) {
			this.props.restaurants.filter(ratingFilter);
		} else {
			this.state.modifiedRestaurants.filter(ratingFilter);
		}

		// If user has selected to filter, turn on filtered array
		if (ratingValue > 0) {
			this.setState({
				filteredRestaurants: filteredRestaurants,
				filterValue: ratingValue,
				filterOn: true
			});
		// Or if user has reset filter, turn turn off filtered array
		} else {
			this.setState({
				filterOn: false
			});
		}
	}


	// ===============================
	// ADD NEW RESTAURANT
	// ===============================	
	addRestaurant () {
		// Open <NewRestaurant /> panel
		this.setState({
			viewRestaurantPanel: false,
			viewNewRestaurantButton: false,
			viewFilter: false
		});
	}


	// =======================================
	// HIDE FILTER AND NEW RESTAURANT BUTTONS
	// =======================================
	hideButtons () {
		this.setState({
			viewNewRestaurantButton: false,
			viewFilter: false
		});
	}


	// ===============================
	// RESTORE DEFAULT VIEW
	// ===============================
	restoreDefaultView () {
		this.setState({
			viewRestaurantPanel: true,
			viewNewRestaurantButton: true,
			viewFilter: true,
			expandSidePanel: null
		});

		this.props.showMap();
	}

	// ===============================
	// FIND MARKER FOR HOVERED LISTING
	// ===============================
	findMarker (id) {
		this.setState({hoveredListing: id})
	}


	// ==========================================
	// PUSH NEW RESTAURANT
	// ==========================================
	pushNewRestaurant (userRestaurant) {
		// If user has previously added restaurants, add to modified array
		if (this.state.beenModified === true) {
			this.setState( prevState => ({ 
	  			modifiedRestaurants: prevState.modifiedRestaurants.concat(userRestaurant),
	  			filterOn: false
			}));
		// Else, create modified array
		} else {
			this.setState((prevState, props) => ({
				modifiedRestaurants: props.restaurants.concat(userRestaurant),
				beenModified: true,
				filterOn: false
			}));
		};

		// Change view back to <RestaurantPanel /> and increase counter
		this.setState( prevState => ({
			viewRestaurantPanel: true,
			viewNewRestaurantButton: true,
			viewFilter: true,
			newRestaurantCounter: prevState.newRestaurantCounter + 1
		}));
	}


	// ==========================================
	// PUSH NEW REVIEW TO ARRAY
	// ==========================================
	pushNewReview (restaurantID, userReview) {
		// If user has previously modified restaurants or reviews, add new review to modified array
		if (this.state.beenModified === true) {
			// Create new modified array from state array
			let modifiedArray = this.state.modifiedRestaurants.map( restaurant => restaurant);
			// Find restaurant from new array and push userReview to it
			let reviewedPlace = modifiedArray.find( restaurant => restaurant.id === restaurantID);
			reviewedPlace.userReviews.push(userReview);

			// Set modified array to state
			this.setState({
				modifiedRestaurants: modifiedArray,
				filterOn: false
			});
		} else {
			// Create modified array from props array
			let modifiedArray = this.props.restaurants.map( restaurant => restaurant);
			// Find restaurant from new array and push userReview to it
			let reviewedPlace = modifiedArray.find( restaurant => restaurant.id === restaurantID);

			reviewedPlace.userReviews.push(userReview);

			// Set modified array to state
			this.setState({
				modifiedRestaurants: modifiedArray,
				beenModified: true,
				filterOn: false
			});
		};
	}


	// ==========================================
	// PASS ARRAY TO RESTAURANT PANEL
	// ==========================================
	passArray () {
		// If filter is off and no modified restaurants exist
		if (this.state.filterOn === false && this.state.beenModified === false) {
			return this.props.restaurants;
		// If filter is on
		} else if (this.state.filterOn === true) {
			return this.state.filteredRestaurants;
		// If filter is off and modified restaurants exist
		} else if (this.state.filterOn === false && this.state.beenModified === true) {
			return this.state.modifiedRestaurants;
		};
	}


	// ===============================
	// 	EXPAND SIDE PANEL
	// ===============================	
	expandSidePanel() {
		// Give class to Side Panel
		this.setState({
			expandSidePanel: "sidePanel-expanded"
		});
		// Call function in Map
		this.props.hideMap();
	}


	// ===============================
	// COMPONENT DID UPDATE
	// ===============================	
	componentDidUpdate (prevProps) {
		// If mapBounds have updated pass new restaurants and reset filter
		if (prevProps.updatedMapBounds !== this.props.updatedMapBounds) {
			this.setState({
				filterOn: false,
				beenModified: false
			});
		}
	}


	// ===============================
	// RENDER
	// ===============================	
	render () {

		return (
			<div id="SidePanel" className={this.state.expandSidePanel}>

				<MarkersArray 
					restaurants={this.passArray()} 
					map={this.props.map} 
					hoveredListing={this.state.hoveredListing} 
				/>

				<div id="SidePanel-topUI">
					<Header />
					<div id="SidePanel-topUI-functions">
						{this.state.viewFilter ? 

							<div id="SidePanel-filter">
								<h3 id="SidePanel-filter-title">FILTER RESTAURANTS</h3>
								<div id="SidePanel-filter-buttons">
									<input type="image" onClick={this.filterRestaurants} onMouseEnter={e => e.target.src = OneplusActive} onMouseLeave={e => e.target.src = Oneplus} value="1" src={Oneplus} className="star" alt="star rating 1+" />
									<input type="image" onClick={this.filterRestaurants} onMouseEnter={e => e.target.src = TwoplusActive} onMouseLeave={e => e.target.src =Twoplus} value="2" src={Twoplus} className="star" alt="star rating 2+" />
									<input type="image" onClick={this.filterRestaurants} onMouseEnter={e => e.target.src = ThreeplusActive} onMouseLeave={e => e.target.src = Threeplus} value="3" src={Threeplus} className="star" alt="star rating 3+" />
									<input type="image" onClick={this.filterRestaurants} onMouseEnter={e => e.target.src = FourplusActive} onMouseLeave={e => e.target.src = Fourplus} value="4" src={Fourplus} className="star" alt="star rating 4+" />		
									<input type="image" onClick={this.filterRestaurants} onMouseEnter={e => e.target.src = FiveplusActive} onMouseLeave={e => e.target.src = Fiveplus} value="5" src={Fiveplus} className="star" alt="star rating 5+" />
									<button onClick={this.filterRestaurants} value="0" id="sidePanel-resetFilter">
										RESET
									</button>
								</div>

								{this.state.filterOn ? 
									<p className="SidePanel-filter-value">
										Showing restaurants rated {this.state.filterValue} and higher.</p> 
									: 
									<span></span>
								}

							</div>
							:
							<div id="SidePanel-filter-null"></div>
						}

						{this.state.viewNewRestaurantButton ? 
							<div id="SidePanel-addRestaurant">
								<button id="SidePanel-addRestaurant-button" onClick={this.addRestaurant} >
									ADD NEW RESTAURANT
								</button>
							</div>
							:
							<div id="SidePanel-addRestaurant-null"></div>
						}
					</div>
				</div>

				{this.state.viewRestaurantPanel ? 
					<RestaurantPanel 
						restaurants={this.passArray()} 
						map={this.props.map} 
						pushNewReview={this.pushNewReview} 
						handleClick={this.hideButtons} 
						handleHover={this.findMarker} 
						closeDetails={this.restoreDefaultView} 
						expandSidePanel={this.expandSidePanel} 
					/> 
					: 
					<NewRestaurant 
						handleSubmit={this.pushNewRestaurant} 
						handleCancel={this.restoreDefaultView} 
						map={this.props.map} 
						counter={this.state.newRestaurantCounter} 
					/> 
				} 
			</div>
		);
	}
}


// EXPORT SIDE PANEL COMPONENT
export default SidePanel;

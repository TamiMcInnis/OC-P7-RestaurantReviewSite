// IMPORT REACT
import React, { Component } from "react";

// IMPORT CUSTOM COMPONENTS
import ReviewPanel from "./ReviewPanel.js";
import Stars from "./Stars.js";
import DollarSigns from "./DollarSigns.js";
import NewReview from "./NewReview.js";
import backArrow from "../images/backArrow8.png";
import backArrowActive from "../images/backArrowActive.png";
import phone from "../images/phone.png";
import link from "../images/webLink.png";
import mapIcon from "../images/mapIcon.png";
import clock from "../images/clock.png";
import noStreetView from "../images/noStreetView2.png";
import "../styles/RestaurantDetails.css";


// ===============================
// RESTAURANT DETAIL COMPONENT
// ===============================
class RestaurantDetails extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			beenModified: false,
			modifiedReviews: [],
			avgRating: 0,
			streetViewURL: "",
			viewReviewPanel: true,
			viewRestaurantDetials: true
		};

		// Bindings
		this.getStreetView = this.getStreetView.bind(this);
		this.openNewReview = this.openNewReview.bind(this);
		this.submitReview = this.submitReview.bind(this);
		this.cancelReview = this.cancelReview.bind(this);
	}


	// =================================
	// SHOW USER REVIEW
	// =================================
	openNewReview () {
		// Update state to show <NewReview />
		this.setState({
			viewReviewPanel: false,
			viewRestaurantDetials: false
		});
	}


	// =================================
	// CANCEL USER REVIEW
	// =================================
	cancelReview () {
		this.setState({
			viewReviewPanel: true,
			viewRestaurantDetials: true
		});
	}


	// ====================================
	// SUBMIT REVIEW AND CHANGE VIEW STATE
	// ====================================
	submitReview (userReview) {
		// Pass restaurantID and userReview up to <RestaurantPanel />
		let restaurantID = this.props.restaurantID;
		this.props.passReview(restaurantID, userReview);
		
		// Update state to show <ReviewPanel />
		this.setState({
			viewReviewPanel: true,
			viewRestaurantDetials: true
		});
	}


	// =================================
	// GENERATE STREET VIEW PHOTO
	// =================================
	getStreetView() {
		// Set lat and lng from props
		let lat = this.props.lat;
		let lng = this.props.lng;

		// Set URL for streetview metadata
		let streetViewURL;
		let streetViewStatus = "https://maps.googleapis.com/maps/api/streetview/metadata?location=" +
			lat + "," + lng +
			"&key=AIzaSyAvwuxYntNmQx4fVQS-X8FrAm2HUJ6m-iE";

		// Get metadata status from streetView API
		fetch(streetViewStatus)
			.then(res => res.json())
			.then(data => {
				// If no streetView image exists, sub custom image
				if ( data.status !== "OK") {
					streetViewURL = noStreetView;
				} else {
					// Define image URL as streetView image
					streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=900x600&location=" +
						lat + "," + lng +
						"&key=AIzaSyAvwuxYntNmQx4fVQS-X8FrAm2HUJ6m-iE";
				}
			})
			// Then push results to state
			.then( () => {
				this.setState({
					streetViewURL: streetViewURL
				});
			});
	}


	// =================================
	// COMPONENT DID MOUNT
	// =================================
	componentDidMount () {
		this.getStreetView();
	}


	// ===============================
	// RENDER
	// ===============================
	render() {

		return (
			<div className="restaurantDetails">

				<div className="restaurantDetails-topBar">
					<div className="restaurantDetails-topBar-photoBox" style={{backgroundImage: "url(" + this.state.streetViewURL + ")"}}>
					</div>

					<div className="restaurantDetails-topBar-container">
						<h3 className="restaurantDetails-topBar-title">{this.props.title}</h3>

						<DollarSigns price={this.props.price} />
						<span className="restaurantDetails-topBar-rating"> {this.props.avgRating} </span> 
						<Stars rating={this.props.avgRating} />
						<span className="restaurantDetails-topBar-totalRatings"> ({this.props.totalRatings} reviews)</span>

						<div className="restaurantDetails-topBar-close" onClick={this.props.handleClose} >
							<img src={backArrow} alt="back arrow" onMouseEnter={e => e.target.src = backArrowActive} onMouseLeave={e => e.target.src = backArrow} />
						</div>
					</div>
				</div>


				{this.state.viewRestaurantDetials ? 
					<div className="restaurantDetails-details">

						<div className="restaurantDetails-details-contact">

							<div className="restaurantDetails-details-address">
								<div className="restaurantDetails-image-box">
									<img src={mapIcon} alt="map icon" />
								</div>
								<p>{this.props.address}</p>
							</div>

							<div className="restaurantDetails-details-phone">
								<div className="restaurantDetails-image-box">
									<img src={phone}  alt="phone icon"/>
								</div>
								<p>{this.props.phone}</p>
							</div>

							<div className="restaurantDetails-details-website">
								<div className="restaurantDetails-image-box">
									<img src={link}  alt="web icon"/>
								</div>
								<p>
									<a href={this.props.website}>
										{this.props.website}
									</a>
								</p>
							</div>

						</div>

						<div className="restaurantDetails-details-openStatus">

							<div className="restaurantDetails-image-box">
								<img src={clock}  alt="hours icon" className="restaurantDetails-clock"/>
							</div>

							{this.props.openNow ? 
								<div className="restaurantDetails-details-open" >
									OPEN NOW
								</div> 
								:
								<div className="restaurantDetails-details-closed" >
								CLOSED
								</div>
							}
						</div>


						<div className="restaurantDetails-details-operatingHours">
							<div className="restaurantDetails-details-hoursLabel">
								HOURS
							</div>
							{this.props.hours ? 
								<div className="restaurantDetails-details-hours" >
									{this.props.hours[0]}<br/>
									{this.props.hours[1]}<br/>
									{this.props.hours[2]}<br/>
									{this.props.hours[3]}<br/>
									{this.props.hours[4]}<br/>
									{this.props.hours[5]}<br/>
									{this.props.hours[6]}<br/>
								</div> 
								:
								<span className="restaurantDetails-details-days" >No operating hours available</span>
							}
						</div>
					</div>
					:
					<div></div>
				}

				{this.state.viewReviewPanel ? 
					<div className="restaurantDetails-reviews">

						<div className="restaurantDetails-reviews-topUI">
							<h4 className="restaurantDetails-reviews-title">REVIEWS</h4>
							<button  className="restaurantDetails-reviews-button"onClick={this.openNewReview}>
							ADD REVIEW
							</button>
						</div>

						<ReviewPanel allReviews={this.props.userReviews.concat(this.props.placeReviews)} /> 
					</div>
					:
					<NewReview handleSubmit={this.submitReview} cancelSubmit={this.cancelReview}/> 
				}

			</div>
		);
	}
}


// EXPORT RESTAURANT DETAILS
export default RestaurantDetails;

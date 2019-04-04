// IMPORT REACT
import React, { Component } from "react";


// IMPORT CUSTOM COMPONENTS
import Stars from "./Stars.js";
import DollarSigns from "./DollarSigns.js";
import "../styles/RestaurantListing.css";


// ===============================
// RESTAURANT LISTING COMPONENT
// ===============================
class RestaurantListing extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {}

		// Bindings
		this.deliverID = this.deliverID.bind(this);
		this.highlightMarker = this.highlightMarker.bind(this);
		this.resetMarker = this.resetMarker.bind(this);
	}


	// =========================================
	// DELIVER ID
	// =========================================
	deliverID() {
		// When clicked, deliver ID of restaurant to <RestaurantPanel />
		let id = this.props.placesID;
		let userAdded = this.props.userAdded;
		this.props.handleClick(id, userAdded)
	}


	// =========================================
	// HIGHLIGHT MARKER
	// =========================================
	highlightMarker () {
		let id = this.props.placesID;
		this.props.handleHover(id);
	}


	// =========================================
	// HIGHLIGHT MARKER
	// =========================================
	resetMarker () {
		let id = null;
		this.props.handleHover(id);
	}


	// ===============================
	// RENDER
	// ===============================
	render() {

		// Return basic restaurant info, with click handler that delivers ID
		return (
			<div className="RestaurantListing" onClick={this.deliverID} onMouseOver={this.highlightMarker} onMouseOut={this.resetMarker} >

				<div className="RestaurantListing-photo-box" style={{backgroundImage: "url(" + this.props.photo + ")"}}></div>

				<div className="RestaurantListing-details-box">
					<h3 className="RestaurantListing-details-title">{this.props.title}</h3>
					<div className="RestaurantListing-details-icons">
						<DollarSigns price={this.props.price} />
						<span className="RestaurantListing-details-rating"> {this.props.avgRating} </span> 
						<Stars rating={this.props.avgRating}/>
						<span className="RestaurantListing-details-totalRatings"> ({this.props.totalRatings})</span>
					</div>
					<p className="RestaurantListing-details-address">{this.props.address}</p>
					<p className="RestaurantListing-details-openNow">{this.props.openNow ? <span className="RestaurantListing-details-open">OPEN</span> : <span className="RestaurantListing-details-closed">CLOSED</span>}</p>
				</div>
			</div>
		);
	}
}


// EXPORT RESTAURANT LISTING
export default RestaurantListing;

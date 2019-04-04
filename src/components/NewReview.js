// IMPORT REACT
import React, { Component } from "react";

// IMPORT CUSTOM COMPONENTS
import moment from "moment";
import "../styles/NewReview.css"



// ===============================
// NEW RESTAURANT COMPONENT
// ===============================
class NewReview extends Component {
	constructor (props) {
		super(props);
		// State
		this.state = {
			nameValue: "",
			commentValue: "",
			ratingValue: 0
		}
		// Bindings
		this.submitReview = this.submitReview.bind(this);
		this.nameChange = this.nameChange.bind(this);
		this.commentChange = this.commentChange.bind(this);
		this.ratingChange = this.ratingChange.bind(this);
	}


	// ===============================
	// SUBMIT REVIEW
	// ===============================
	submitReview () {
		// Create timestamp to pass to object
		let epochTime = moment().unix();

		// Create new review object from inputs
		let userReview = {
			author_name: this.state.nameValue,
			rating: this.state.ratingValue,
			time: epochTime,
			relative_time_description: "yesterday",
			text: this.state.commentValue
		};

		// Pass new review up to <RestaurantDetails />
		this.props.handleSubmit(userReview);
	}


	// ===============================
	// USER NAME CHANGE
	// ===============================
	nameChange (event) {
		// Set input value to state
		this.setState({
			nameValue: event.target.value
		});
	}


	// ===============================
	// COMMENT CHANGE
	// ===============================
	commentChange (event) {
		// Set input value to state
		this.setState({
			commentValue: event.target.value
		});
	}


	// ===============================
	// RATING CHANGE
	// ===============================
	ratingChange (event) {
		// Get value of rating chosen
		let ratingNumber = Number(event.target.value);
		// Set value to state
		this.setState({
			ratingValue: ratingNumber
		});		
	}


	// ===============================
	// RENDER
	// ===============================
	render () {

		return (
			<div className="newReview">
				<h3 className="newReview-title">ADD YOUR REVIEW</h3>

				<form>
					<p>YOUR RATING</p>
					<div id="newReview-ratingsDiv">
						<label>1
							<input type="radio" 
								name="rating"
								id="1" 
								value="1" 
								onClick={this.ratingChange}
							/>
						</label>

						<label>2
							<input type="radio"  
								name="rating"
								id="2" 
								value="2" 
								onClick={this.ratingChange}
							/>
						</label>

						<label>3
							<input type="radio" 
								name="rating"
								id="3" value="3" 
								onClick={this.ratingChange}
							/>
						</label>

						<label>4
							<input type="radio" 
								name="rating"
								id="4" value="4" 
								onClick={this.ratingChange}
							/>
						</label>

						<label>5
							<input type="radio"  
								name="rating"
								id="5" value="5" 
								onClick={this.ratingChange}
							/>
						</label>

					</div>
				</form>
				

				<p>YOUR NAME</p>
				<input  className="newReview-author" 
					type="text" 
					label="UserName" 
					name="UserName"
					required="required"
					value={this.state.nameValue} 
					onChange={this.nameChange} 
				/>

				<p>YOUR COMMENTS</p>
				<textarea  className="newReview-comment" 
					label="Comment" 
					name="userComments"
					required="required"
					cols="40"
					rows="8"
					value={this.state.commentValue} 
					onChange={this.commentChange} 
				/>

				<button  className="newReview-submitButton" onClick={this.submitReview} >
					SUBMIT
				</button>

				<button  className="newReview-cancelButton" onClick={this.props.cancelSubmit} >
					CANCEL
				</button>
			</div>
		);
	}
}


// EXPORT NEW REVIEW COMPONENT
export default NewReview;


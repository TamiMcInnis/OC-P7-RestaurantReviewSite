// IMPORT REACT
import React from "react";

// IMPORT CUSTOM COMPONENTS
import Stars from "./Stars.js";
import moment from "moment";
import "../styles/Review.css";


// ===============================
// REVIEW COMPONENT
// ===============================
function Review (props) {
	// Pass review time to moment() to get relative time passed since review
	let timeAgo = moment(props.time * 1000).fromNow();


	// ===============================
	// RETURN REVIEW
	// ===============================	
	return(
		<div className="review">
			<p className="review-author">{props.author}</p>
			<Stars rating={props.rating}/>
			<span className="review-time" >{timeAgo}</span>
			<p className="review-comment">{props.text}</p>
		</div>
	);
}


// EXPORT REVIEW COMPONENT
export default Review;
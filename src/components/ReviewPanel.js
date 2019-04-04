// IMPORT REACT
import React from "react";

// IMPORT CUTSOM COMPONENTS
import Review from "./Review.js";
import "../styles/ReviewPanel.css";


// ===============================
// REVIEW PANEL COMPONENT
// ===============================
function ReviewPanel (props) {
	
	// Create array of <Reviews /> from props
	let allReviewsArray = props.allReviews.map( (review, index) => {
		return <Review 
			key={index}
			author={review.author_name}
			rating={review.rating}
			time={review.time}
			text={review.text}
		/>
	});

	// ===============================
	// RETURN
	// ===============================
	return (
		<div className="reviewPanel">
			{allReviewsArray.length > 0 ? 
				allReviewsArray 
				: 
				<div className="reviewPanel-noReviews">
					<p>No reviews exist for this restaurant yet.</p>
					<p>Be the first to leave a review by clicking the "ADD REVIEW" button!</p>
				</div>
			}
		</div>
	);
}


// EXPORT REVIEW PANEL COMPONENT
export default ReviewPanel;


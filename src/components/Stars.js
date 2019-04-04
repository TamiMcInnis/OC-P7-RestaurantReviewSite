// IMPORT REACT
import React from "react";
import "../styles/Stars.css";


// ===============================
// STARS COMPONENT
// ===============================
function Stars(props) {

	// Declare vars
	let stars = [];
	let fullCounter = 0;
	let halfCounter = 0;

	// Separate whole number for full star
	let integerTemp = props.rating.toString().substring(0, 1);
	let integerHolder = Number(integerTemp);

	// Separate decimal for half star
	let decimalTemp = props.rating.toString().substring(2, 3);
	let decimalHolder = Number(decimalTemp);

	// Run 'for' loop 5 times
	for (let x = 0; x < 5; x++) {
		// Run to check for full stars
		if (fullCounter < integerHolder && halfCounter === 0) {
			// Add full star
			stars.push(<i className='fas fa-star star' key={x}></i>);
			fullCounter ++;
		// Run to check for half star
		} else if (fullCounter >= integerHolder && halfCounter < 1) {
			// Add half star
			if (decimalHolder >= 3) {
				stars.push(<i className='fas fa-star-half-alt star' key={x}></i>);
				halfCounter ++;
			// Add empty star
			} else {
				stars.push(<i className='far fa-star star' key={x}></i>);
				halfCounter ++;
			}
		// Add empty star
		} else {
			stars.push(<i className='far fa-star star' key={x}></i>);
		}
	}


	// ===============================
	// RETURN STARS
	// ===============================	
	return (
			<div className="starRow">
				{stars}
			</div>
	);
}


// EXPORT STARS COMPONENT
export default Stars;

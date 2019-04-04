// IMPORT REACT
import React from "react";


// IMPORT CUSTOM COMPONENTS
import "../styles/DollarSigns.css";

// ===============================
// DOLLAR SIGNS COMPONENT
// ===============================
function DollarSigns(props) {

	let dollarSigns = "";
	
	// For loop using price level integer from props
	for (let i = 0; i < props.price; i ++) {
		dollarSigns += "$";
	}


	// ===============================
	// RETURN
	// ===============================	
	return (
		<span className="dollarSigns">
			{dollarSigns}
		</span>
	);
}


// EXPORT DOLLAR SIGNS COMPONENT
export default DollarSigns;
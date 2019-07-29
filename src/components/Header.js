// IMPORT REACT
import React from "react";


// IMPORT CUSTOM COMPONENTS
import logo from "../images/logo1.png";
import "../styles/Header.css";


// ===============================
// HEADER COMPONENT
// ===============================
function Header() {


	// ===============================
	// RETURN
	// ===============================	
	return (
		<header id="header">
			<img src={logo} id="header-logo" alt="Good Fork Logo" />
		</header>
	);
}


// EXPORT HEADER COMPONENT
export default Header;
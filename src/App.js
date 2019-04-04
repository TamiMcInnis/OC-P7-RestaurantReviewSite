// IMPORT REACT
import React from 'react';

// IMPORT CUSTOM COMPONENTS
import MainPanel from "./components/MainPanel.js";
import "./styles/global.css";


// ===============================
// APP COMPONENT
// ===============================
function App () {


	// ===============================
	// RETURN
	// ===============================	
  	return (
   		<div id="App">
     		<MainPanel />
    	</div>
  	);
}


// EXPORT APP COMPONENET
export default App;

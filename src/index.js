// IMPORT REACT
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// IMPORT CUSTOM COMPONENTS
import App from './App';

// RENDER APP TO DOM
ReactDOM.render(<App />, document.getElementById('root'));

// RUN SERVICE WORKER
serviceWorker.unregister();

// import 
import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from "./Navbar"

import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

//This line creates a root instance using ReactDOM.createRoot() and assigns it to the variable root.
// The root instance represents the root of the React component tree that will be rendered.
//The document.getElementById('root') retrieves the DOM element with the ID 'root',
// which is the container element where the React application will be rendered.
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
     //renders the React application inside the root .
    <React.StrictMode> 
         <Navbar/>
        <App /> 
   </React.StrictMode>,
);


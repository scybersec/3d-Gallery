/* Component that sets the routes for each page */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../index.css'
import App from "../App";
import Login from "./Login";
import Home from "./Home"
import TestApp from "./TestApp";
import HomePage from './HomePage/HomePage';

function Display() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/block" element={<App/>} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Test' element={<TestApp />} /> {/* Test Route */}
            </Routes>
        </Router>
    )
}

export default Display;
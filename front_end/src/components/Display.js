/* Component that sets the routes for each page */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../index.css'
import App from "../App";
import Login from "./Login";
import Home from "./Home"
import HomePage from './HomePage/HomePage';
import Settings from './Settings';
import CreateAccount from "./CreateAccount";
import FriendsList from "./FriendsList";

function Display() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/block" element={<App/>} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Settings' element={<Settings />} />
                <Route path='/CreateAccount' element={<CreateAccount />} />
                <Route path='/FriendsList' element={<FriendsList />} />
            </Routes>
        </Router>
    )
}

export default Display;
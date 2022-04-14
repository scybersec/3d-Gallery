/*Component for the navigation bar */
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return(
    <nav id="Navigation">
        <ul>
            <Link to="/Home"><li>Home</li></Link>
            <Link to =""><li>Nav2</li></Link>
            <Link to =""><li>Nav3</li></Link>
            <Link to =""><li>Nav4</li></Link>
            <Link to ="/Settings"><li>Settings</li></Link>
        </ul>
    </nav>
    )}

export default Navigation;
/*Component for the navigation bar */
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return(
    <nav id="Navigation">
        <ul>
            <Link to=""><li>Nav</li></Link>
            <Link to =""><li>Nav2</li></Link>
            <Link to =""><li>Nav3</li></Link>
            <Link to =""><li>Nav4</li></Link>
            <Link to =""><li>Nav5</li></Link>
        </ul>
    </nav>
    )}

export default Navigation;
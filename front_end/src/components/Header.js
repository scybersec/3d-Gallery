import React from "react";
import Navigation from "./Navigation";
import SecondLogo from './HomePage/Headeredit.png'

function Header() {
    return(
        <section id="Header">
            
            <img src={SecondLogo} />
            <Navigation />

        </section>
    )
}

export default Header;
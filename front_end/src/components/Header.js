import React from "react";
import Navigation from "./Navigation";
import Logo from './HomePage/Header.png'
import SecondLogo from './HomePage/Headeredit.png'

function Header() {
    return(
        <section id="Header">
            {/*<h2>Genesis</h2>*/}
            <img src={SecondLogo} />
            <Navigation />

        </section>
    )
}

export default Header;
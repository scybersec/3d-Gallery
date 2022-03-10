/* Component for the Login Page */
import React from "react";
import { Link } from "react-router-dom";
import DBox from "./3D_Background/Login3D";

function Login() {

    return(
        <body>
            <DBox /> {/*Imported 3D Component*/}

            <section id="Login">
                <article id="Login_Logo"></article>

                <article id="Login_Info">
                    <form>
                        <input type='text' placeholder="Username" />
                        <br></br>
                        <Link to={'/Home'}><input type='submit' value="Login" /> </Link>
                    </form>
                </article>
            </section>
        </body>
    )
}

export default Login;
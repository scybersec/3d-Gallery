import React from "react";
import Header from "../Header";
import WelcomePic from './lowpoly.png'
import Logo from './Header.png'
import SecondLogo from './Headeredit.png'
import MapPic from './map capture.png'

function HomePage() {
    return(
        <section id="HomePage">
            <article id="HomePageTitle">
                <img src={SecondLogo}/>
                {/*<h4>Genesis</h4>*/}
            </article>

            <article id="Welcome">
                <article id="JoinNow">
                    <h2>Bringing Recycling Into Social Media</h2>
                    <a href="/Login"><button type='button'>Join Now</button></a>
                    <h2>Reuse or Recycle Your Friends' Art And Pictures</h2>
                </article>

                <article id="WelcomePic">
                    <h2><span>@artbytosho: </span></h2>
                    <span><img src={WelcomePic} /> </span>
                </article>
            </article>

            <article id="Info">
                <h2>- Upload your pictures or art</h2>
                <h2>- Reuse and recycle art</h2>
                <h2>- Each Interaction Helps The Enviroment</h2>
                <h2>- Boost Your Friends Art</h2>
                <h2>- Do Your Best, Only Five Pieces at A Time</h2>
            </article>

            <article id="MeetTheTeam">
                <h2 id="MeetTheTeamTitle">Meet The Team</h2>
                <h3>We are a small team located in Jersey City, NJ. We want to bring awareness about the enviroment to social media</h3>

                <article id="Contact">
                    <h2>Contact Us</h2>
                    <input type='text' placeholder="Name" />
                    <br></br>
                    <textarea placeholder="Message" />
                </article>

                <article id="Map">
                    <img src={MapPic} />
                </article>
            </article>

        </section>
    )
}

export default HomePage;
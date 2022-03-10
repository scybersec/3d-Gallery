/* Component for the Home Page */
import React from "react";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import TestPic from './TestImages/TestImage.jpg';
import {useState} from 'react'
import Popup from 'reactjs-popup';
import {create} from 'ipfs-http-client'


function Home() {
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol:"https"
      })

      const [hash,setHash] = useState("QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ")
      const [buffer, setBuffer] = useState(null)

      const captureFile = (event) =>{
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          var arrayBuffer = reader.result
          var bytes = new Uint8Array(arrayBuffer);
          console.log(bytes)
          setBuffer(bytes)
        }
      }
    
      const onSubmit = (event) =>{
        event.preventDefault()
        console.log('I got here 1')
        const resoult =  ipfs.add(buffer)
        console.log(`This is the Hash: ${hash}`)
        console.log("This Is the buffer" + buffer)
        resoult.then((response)=> {
          setHash(response.path)
        })
      }
    

    const [follow, setFollow] = useState('Follow');

    const [pic, setPic] = useState(0);

    let picarray = [TestPic];
   

    return(
        <section id="HomeContainer">
            <meta name='viewport' content="width=device-width, initial-scale=1.0" />
            <section id="MainTitle">
                <article id="Navigation"> </article>
            </section>
            <Header />
            <section id="About">
                <h3>About</h3>
                <p id="ProfilePic"></p>
                <h3>John Doe</h3>
                <button type="button" id="FollowButton" onClick={() => setFollow('Following')}>{follow}</button>
            </section>

            <section id="UserPics">
                <p id="P1">
                    <Popup trigger ={<img src={`https://ipfs.infura.io/ipfs/${hash}`}/>}>
                        <form onSubmit={onSubmit}>
                            <input type ='file' onChange={captureFile} />
                            <input type='submit' />
                        </form>
                    </Popup>
                </p>
                <p id="P2"><img src={picarray[0]}/></p>
                <p id="P3"><img src={picarray[0]}/></p>

            </section>

            {/*<section id="Trending">
                <p>#Trend1</p>
                <p>#Trend2</p>
                <p>#Trend3</p>
                <p>#Trend4</p>
                <p>#Trend5</p>
            </section>*/}


        </section>
    )
}

export default Home;
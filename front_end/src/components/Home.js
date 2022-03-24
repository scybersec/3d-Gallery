/* Component for the Home Page */
/* Notes: .send the transaction when they save the hash*/
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import TestPic from './TestImages/TestImage.jpg';
import {useState} from 'react'
import Popup from 'reactjs-popup';
import {create} from 'ipfs-http-client'
import useLocalStorageState from 'use-local-storage-state'
import { CONTACT_ABI, CONTACT_ADDRESS} from './config.js'
import Web3 from "web3";


function Home() {
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol:"https"
      })

      const [contactList, setContactList] = useState();
      const [contacts, setContacts] = useState([]);
      const [account, setAccount] = useState();


      const [hash,setHash] = useState("QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ") /* Hash for the first picture */
      const [buffer, setBuffer] = useState(null) /* Hook for the Buffer */
      const [secondhash,setSecondHash] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ') /* Hash for the second picture */
      const [thirdhash,setThirdHash] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ') /* Hash for the third picture */
      const [picStore, setPicStore] = useLocalStorageState('picture','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ') /* Stores the first picture into the local storage */
      const [picStoreTwo, setPicStoreTwo] = useLocalStorageState('picturetwo','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ') /* Stores the second picture into the local storage */
      const [picStoreThree, setPicStoreThree] = useLocalStorageState('picturethree','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ') /* Stores the third picture into the local storage */

      useEffect(() => { // Once the page is loaded, useEffect checks to see if the local storage is undefined. If so, it inputs the default hash into the local storage.
        if(picStore == undefined){
            setPicStore('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicStoreTwo('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicStoreThree('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
        }
            async function load() {
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
    
            const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    
            setContactList(contactList);
    
            const counter = await contactList.methods.count().call();
    
            for (var i = 1; i <= counter; i++) {
              const contact = await contactList.methods.contacts(i).call();
              setContacts((contacts) => [...contacts, contact]);
            }
            }
    
            load();
            
      }, []);//Empty array means it only checks once




      const captureFile = (event) =>{ /* function to take a selected file and turn it into a integer array, then it is set as the buffer */
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

    
      const onSubmit = (event) =>{ /* On submit it adds the buffer and sets the response as the Hash and stores the Hash into the local Storage */
        event.preventDefault()
        console.log('I got here 1')
        const resoult =  ipfs.add(buffer)
        console.log(`This is the Hash: ${hash}`)
        /*console.log("This Is the buffer" + buffer)*/
        resoult.then((response)=> {
          setHash(response.path)
        })
        setPicStore(hash)
      }

      const onSecondSubmit = (event) =>{
        event.preventDefault()
        console.log('I got here 1')
        const resoult =  ipfs.add(buffer)
        console.log(`This is the Hash: ${secondhash}`)
        console.log("This Is the buffer" + buffer)
        resoult.then((response)=> {
          setSecondHash(response.path)
        })
        setPicStoreTwo(secondhash)
      }

      
      const onThirdSubmit = (event) =>{
        event.preventDefault()
        console.log('I got here 1')
        const resoult =  ipfs.add(buffer)
        console.log(`This is the Hash: ${thirdhash}`)
        /*console.log("This Is the buffer" + buffer)*/
        resoult.then((response)=> {
          setThirdHash(response.path)
        })
        setPicStoreThree(thirdhash)
      }
    

    const [follow, setFollow] = useState('Follow');

    let removepic = (pics) =>{
        pics('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
    }

    console.log(`This is the FIRST Storage: ${localStorage.getItem('picture')}`)
    console.log(`This is the SECOND Storage: ${localStorage.getItem('pictureTwo')}`)
    console.log(`This is the THIRDS Storage: ${localStorage.getItem('pictureThree')}`)
    console.log(`Key: ${localStorage.key('picture')}`)
    console.log('PicStore Is: '+ picStore)

     
      
            
   

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
                {Object.keys(contacts).map((contact, index) =>(
                    <h4 key={`${contacts[index].name} -${index}`}>
                        {contacts[index].name}
                        </h4>
                ))}
                <button type="button" id="FollowButton" onClick={() => setFollow('Following')}>{follow}</button>
            </section>

            <section id="UserPics">

            {Object.keys(contacts).map((contact, index) =>(
                    <h4 key={`${contacts[index].name} -${index}`}>

                <p id="P1">
                    <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${contacts[index].phone}`}/>}>
                        <form id="#PicForm" onSubmit={onSubmit}>
                            <input type ='file' onChange={captureFile} />
                            <input type='submit' />
                        </form>
                        <form onSubmit={onSubmit}>
                            <input type='submit' value='Save' /*onClick={() => setPicStore(hash)}*//>
                        </form>
                        <form onSubmit={() => removepic(setPicStore)}>
                            <input type="submit" value='Delete' />
                        </form>   
                    </Popup>
                </p>
                </h4>
            ))}
                
                <p id="P2">
                    <Popup position='center center' trigger = {<img src={`https://ipfs.infura.io/ipfs/${picStoreTwo}`}/> }>
                        <form onSubmit={onSecondSubmit}>
                            <input type='file' onChange={captureFile} />
                            <input type='submit' />
                        </form>
                        <form onSubmit={onSecondSubmit}>
                            <input type='submit' value='Save' /*onClick={() => setPicStore(hash)}*//>
                        </form>
                        <form onSubmit={() => removepic(setPicStoreTwo)}>
                            <input type="submit" value='Delete' />
                        </form>   
                    </Popup>
                    </p>

                    <p id="P3">
                    <Popup position='center center' trigger = {<img src={`https://ipfs.infura.io/ipfs/${picStoreThree}`}/> }>
                        <form onSubmit={onThirdSubmit}>
                            <input type='file' onChange={captureFile} />
                            <input type='submit' />
                        </form>
                        <form onSubmit={onThirdSubmit}>
                            <input type='submit' value='Save' /*onClick={() => setPicStore(hash)}*//>
                        </form>
                        <form onSubmit={() => removepic(setPicStoreThree)}>
                            <input type="submit" value='Delete' />
                        </form>   
                    </Popup>
                    </p>

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
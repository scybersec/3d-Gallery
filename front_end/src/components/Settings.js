/* Component for the Settings Page */
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import {useState} from 'react'
import {create} from 'ipfs-http-client'
import useLocalStorageState from 'use-local-storage-state'
import { CONTACT_ABI, CONTACT_ADDRESS} from './config.js'
import Web3 from "web3";
import { keepTheme } from '../theme';
import {setTheme} from '../theme'
import '../darkmode.css'



function Settings() {
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol:"https"
      })

      const [Contract, setContract] = useState();
      const [account, setAccount] = useState('');
      let navigate = useNavigate()


      useEffect(() => { // Once the page is loaded, useEffect checks to see if the local storage is undefined. If so, it inputs the default hash into the local storage.
            async function load() {
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            //const accounts = await web3.eth.requestAccounts();
            
    
            const newcontract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

            const {ethereum} = window
            const accounts = await ethereum.request({method: 'eth_accounts'});
            setAccount(accounts[0]);
                
            if (accounts && accounts.length > 0) {
                    //console.log("user is connected");
                } else {
                    localStorage.clear()
                    return navigate('/Login')

                }

            setContract(newcontract);
    
            /*const counter = await contactList.methods.count().call();*/

    
            /*for (var i = 1; i <= counter; i++) {
              const contact = await contactList.methods.contacts(i).call();
              setContacts((contacts) => [...contacts, contact]);
            }*/
            }
    
            load();
            
      }, []);//Empty array means it only checks once

     
      useEffect(() => {
        keepTheme();
    })

    const [togClass, setTogClass] = useState('dark');
    let theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])


    return(
        <section id="HomeContainer">
            <div className="container--toggle">
                <Header />
            {
                togClass === "light" ?
                
                <button type="button" style={{background:'#121212', color:'#D0D1D0'}} id="toggle" className="toggle--checkbox" onClick={handleOnClick}>Enable Dark Mode</button>
                :
                <button type="button" style={{background:'#feffff', color:'#000000'}} id="toggle" className="toggle--checkbox" onClick={handleOnClick}>Enable Light Mode</button>
            }
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
        </section>
    )
}

export default Settings;
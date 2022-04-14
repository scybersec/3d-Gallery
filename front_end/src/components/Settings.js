/* Component for the Home Page */
/* Notes: .send the transaction when they save the hash*/
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import TestPic from './TestImages/TestImage.jpg';
import {useState} from 'react'
import Popup from 'reactjs-popup';
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
      const [contacts, setContacts] = useState([]);
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

      /*TEST*/
      const [testName, setTestName] = useLocalStorageState('name','Not Selected')
      const [changename, setchangename] = useState('')
      const createAccount = (event) =>{
          Contract.methods.createAcount(changename).send({from: account})
      }
      const setName = (event) =>{
          Contract.methods.setname(changename).send({from: account})
      }
      const getName = (event) =>{
          Contract.methods.getname().call({from:account}).then((response)=>{
              console.log(response)
              setTestName(response)
          })
      }
      /*TEST*/
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


    /*console.log(`This is the FIRST Storage: ${localStorage.getItem('picture')}`)
    console.log(`This is the SECOND Storage: ${localStorage.getItem('pictureTwo')}`)
    console.log(`This is the THIRDS Storage: ${localStorage.getItem('pictureThree')}`)
    console.log(`Key: ${localStorage.key('picture')}`)
    console.log('PicStore Is: '+ picStore)*/


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
/* Component for the Home Page */
/* Notes: .send the transaction when they save the hash*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import {create} from 'ipfs-http-client'
import useLocalStorageState from 'use-local-storage-state'
import { CONTACT_ABI, CONTACT_ADDRESS} from './config.js'
import Web3 from "web3";
import SecondLogo from './HomePage/Headeredit.png'



function CreateAccount() {
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

            }
    
            load();
            
      }, []);//Empty array means it only checks once

      /*TEST*/
      const [testName, setTestName] = useLocalStorageState('name','Not Selected')
      const [changename, setchangename] = useState('')
      const createAccount = (event) =>{
          Contract.methods.createAcount(changename).send({from: account})
          setcreateacc(true)
      }
      
      const getName = (event) =>{
          Contract.methods.getname().call({from: account}).then((response)=>{
              console.log(response)
              setTestName(response)
          })
      }
      /*TEST*/
      useEffect(() => {
        async function loadpic(){
            if (testName == undefined){
                return getName()
            }
            else if (testName != undefined){
                navigate('/Home')
            }
            
        }
        loadpic();
      } )

      const [createacc, setcreateacc] = useState(false);

      const GoHome = () =>{
          return(
            <article id="CreateAccount">
                <button type='button' onClick={() => window.location.reload()}>Continue To Home</button>
            </article>
          )
      }

      const CreateAcc = () =>{
          return(
            <article id="CreateAccount">
                <h2>Create Account</h2>
                
                <input type="text"placeholder="Username" onChange={(event) => {setchangename(event.target.value)}}/>
                
                <button type="submit" onClick={() => createAccount()}>Create Account</button>
            </article>
          )
      }


    return(
        <section id="HomeContainer">
            <meta name='viewport' content="width=device-width, initial-scale=1.0" />
            <section id="MainTitle">
                <article id="Navigation"> </article>
            </section>
            <section id="Header">

                <img src={SecondLogo} />

            </section>
            <section>
                {createacc === false && (
                    CreateAcc()
                )}

                {createacc === true && (
                    GoHome()
                )}
                
                
                    
                
            </section>
        </section>
    )
}

export default CreateAccount;
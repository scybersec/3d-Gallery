import React, {useState} from "react";
import {create} from 'ipfs-http-client'

function TestApp(){
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
        console.log("This Is the buffer" + buffer)
        resoult.then((response)=> {
          setHash(response.path)
        })
      }
    

    return(
        <section>
            <header className="App-header">
                <img src={`https://ipfs.infura.io/ipfs/${hash}`} className="App-logo" alt="logo" />
                <form onSubmit={onSubmit}>
                <input type ='file' onChange={captureFile} />
                <input type='submit' />
                </form>
            </header>
        </section>
    )
}

export default TestApp;
import React, {Component} from 'react'
import {create} from 'ipfs-http-client'
// import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';


// const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545")

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol:"https"
})


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      buffer: null,
      memeHash: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ"
    };
  }

  captureFile = (event) =>{
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      var arrayBuffer = reader.result
      var bytes = new Uint8Array(arrayBuffer);
      console.log(bytes)
      this.setState({ buffer: bytes})
    }
  }

  onSubmit = (event) =>{
    event.preventDefault()
    console.log('I got here 1')
    const resoult =  ipfs.add(this.state.buffer)
    resoult.then((response)=> {
      this.setState({memeHash: response.path})
    })
  }


  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="logo" />
        <form onSubmit={this.onSubmit}>
          <input type ='file' onChange={this.captureFile} />
          <input type='submit' />
        </form>
      </header>
    </div>
  );
  }
}


export default App;
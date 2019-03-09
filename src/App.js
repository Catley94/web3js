import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ""
    }
  }
  componentWillMount() {
    this.loadBlockchainData() 
    }
  
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType();
    //test console
    console.log("network:", network)
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0] })
    
    }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Your Account: {this.state.account}</p>
        </header>
      </div>
    );
  }
}

export default App;

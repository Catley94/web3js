import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS }  from "./config.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      latestBlock: "",
      amountOfEth: "",
      taskCount: 0
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
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({todoList})
    const latest = await web3.eth.getBlockNumber()
    console.log(latest);
    this.setState({latestBlock: latest})
    const amountEth = await web3.eth.getBalance(accounts[0])
    const ethFromWei = web3.utils.fromWei(amountEth, 'ether');
    console.log(ethFromWei);
    this.setState({amountOfEth: ethFromWei})
    const taskCount = await todoList.methods.taskCount().call()
    this.setState ({taskCount }) //Same as ({taskCount: taskCount})
    for (var i = 0; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
      tasks: [{...this.state.tasks, task}]  // Perhaps do .map??? 
      })
    }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>Your Account: {this.state.account}</p>
          <p>Latest Block: {this.state.latestBlock}</p>
          <p>Amount of Ether in Account: {this.state.amountOfEth}</p>
          <p> Task Count : {this.state.taskCount} </p>
          <main role="main" className="col-lg-12 d-flex justify-content-center">
          <div id="loader" className="text-center">
            <p className="text-center">Loading...</p>
          </div>
          <div id="content">
            <form >
              <input id="newTask" type="text" className="form-control" placeholder="Add task..." required />
              <input type="submit" hidden="" />
            </form>
            <ul id="taskList" className="list-unstyled">
              <div className="taskTemplate" className="checkbox">
                <label>
                  <input type="checkbox" />
                  <span className="content">Task content goes here...</span>
                </label>
              </div>
            </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
          </div>
        </main>
        </div>
      </div>
    );
  }
}

export default App;

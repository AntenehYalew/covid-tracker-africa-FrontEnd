import React, { Component } from 'react';
import DashBoard from "./components/continent/dashboard"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={
     
    }
  }
  
  componentDidMount(){
    console.log("app mount")
  }

  render(){

  return (
    <div className="App">
        <DashBoard />
    </div>
  )
}
}

export default App;

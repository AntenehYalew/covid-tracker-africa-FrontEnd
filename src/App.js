import React, { Component } from "react";
import DashBoard from "./components/continent/dashboard";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <DashBoard />
      </div>
    );
  }
}

export default App;

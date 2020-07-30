import React, { Component } from "react";
import "./error.css";

class Error extends Component {
  render() {
    return (
      <div className="error">
        <div className="alert alert-danger" role="alert">
          Your Session expired. Please Refresh your page
        </div>
      </div>
    );
  }
}

export default Error;

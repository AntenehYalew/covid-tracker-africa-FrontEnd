import React, { Component } from "react";
import "./error.css";

class Error extends Component {
  render() {
    return (
      <div className="error">
        <div className="alert alert-danger" role="alert">
          Something went Wrong. Please check back again
        </div>
      </div>
    );
  }
}

export default Error;

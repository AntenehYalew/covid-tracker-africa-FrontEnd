import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <div>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="d-flex justify-content-end">
                  &copy; <strong>APP</strong>esha || {year}
                </p>
              </div>
              <div className="col right-footer">
                <p className="d-flex justify-content-start">
                  Automating Daily Routines
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;

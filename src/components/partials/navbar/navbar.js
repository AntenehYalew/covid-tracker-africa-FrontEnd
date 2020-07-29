import React, { Component } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar  navbar-expand-lg navbar-dark ">
        <div className="container">
          <NavLink
            exact
            activeClassName="selected"
            className="navbar-brand"
            to="/"
            activeStyle={{
              color: "rgb(39, 150, 29)",
            }}
          >
            <img
              src="https://www.vippng.com/png/full/366-3666268_620-chat-bubbles-icon-2017-12-01-africa.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Africa"
            />
            Covid - Africa
          </NavLink>

          <NavLink
            exact
            activeClassName="selected"
            className="navbar-brand comparison-navbar"
            to="/comparison"
            activeStyle={{
              color: "rgb(39, 150, 29)",
            }}
          >
            Comparison
          </NavLink>

          <span className="navbar-text flatten">"Let's Flatten the Curve"</span>
        </div>
      </nav>
    );
  }
}

export default NavBar;

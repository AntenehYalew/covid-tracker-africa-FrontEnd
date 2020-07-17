import React, { Component } from "react";
import "./dashboardHeader.css";
import africaMap from "../images/FlagsMapAfrica.png";

class DashboardHeader extends Component {
  //Format Numbers to readable
  headerNumFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    //Refactor props data
    const africaData = this.props.statsAfrica;
    return (
      <div className="container dashBoard-cont">
        <div className="dashboard-africa-left">
          <img src={africaMap} alt="Africa Map" />
        </div>
        <div className="dashboard-africa-right">
          <div className="row">
            <div className="col cases ">
              <h3>New Cases </h3>
            </div>
            <div className="col cases ">
              <h3>{this.headerNumFormat(africaData.todayCases)}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col death ">
              <h3>New Deaths</h3>
            </div>
            <div className="col death ">
              <h3>{this.headerNumFormat(africaData.todayDeaths)} </h3>
            </div>
          </div>
          <div className="row">
            <div className="col cases">
              <h3>Total Cases</h3>
            </div>
            <div className="col cases">
              <h3>{this.headerNumFormat(africaData.cases)} </h3>
            </div>
          </div>
          <div className="row">
            <div className="col death">
              <h3>Total Deaths</h3>
            </div>
            <div className="col death">
              <h3> {this.headerNumFormat(africaData.deaths)} </h3>
            </div>
          </div>
          <div className="row">
            <div className="col tests">
              <h3>Total Tests</h3>
            </div>
            <div className="col tests">
              <h3> {this.headerNumFormat(africaData.tests)} </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;

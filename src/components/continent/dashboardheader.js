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
      <div className="container">
        <header className="quick-facts">Quick Facts</header>
        <div className="dashBoard-cont">
          <div className="dashboard-africa-left">
            <img src={africaMap} alt="Africa Map" />
          </div>
          <div className="dashboard-africa-right">
            <div className="row">
              <div className="col-7">
                <h3>New Cases </h3>
              </div>
              <div className="col-5 cases ">
                <h3>{this.headerNumFormat(africaData.todayCases)}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-7  ">
                <h3>New Deaths</h3>
              </div>
              <div className="col-5 death ">
                <h3>{this.headerNumFormat(africaData.todayDeaths)} </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-7 ">
                <h3>Total Cases</h3>
              </div>
              <div className="col-5 cases">
                <h3>{this.headerNumFormat(africaData.cases)} </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-7 ">
                <h3>Total Deaths</h3>
              </div>
              <div className="col-5 death">
                <h3> {this.headerNumFormat(africaData.deaths)} </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-7 ">
                <h3>Total Tests</h3>
              </div>
              <div className="col-5 tests">
                <h3> {this.headerNumFormat(africaData.tests)} </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;

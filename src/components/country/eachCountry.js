import React, { Component } from "react";
import axios from "axios";
import ChartLine from "./chartLine";
import "./eachCountry.css";

class EachCountry extends Component {
  constructor(props) {
    super(props);
    const chartOptions = {
      fill: "origin",
      lineTension: 0.1,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    };

    this.state = {
      casesData: {
        labels: [],
        datasets: [
          {
            label: "Cases",
            borderColor: "rgb(252,223,127)",
            backgroundColor: "rgb(252,223,127)",
            pointBorderColor: "rgb(252,223,127)",
            pointHoverBackgroundColor: "rgb(252,223,127)",
            data: [],
            ...chartOptions,
          },
        ],
      },
      deathsData: {
        labels: [],
        datasets: [
          {
            label: "Deaths",
            borderColor: "rgb(248,110,121)",
            backgroundColor: "rgb(248,110,121)",
            pointBorderColor: "rgb(248,110,121)",
            pointHoverBackgroundColor: "rgb(248,110,121)",
            data: [],
            ...chartOptions,
          },
        ],
      },
    };
  }

  async componentDidMount() {
    await axios
      .get(
        `https://corona.lmao.ninja/v2/historical/${this.props.countryDetail.country}?lastdays=all`
      )
      .then((res) => {
        const labels = Object.keys(res.data.timeline.cases);
        const casesData = Object.values(res.data.timeline.cases);
        const deathData = Object.values(res.data.timeline.deaths);
        const newCasesData = [...this.state.casesData.datasets];
        newCasesData[0] = { ...newCasesData[0], data: casesData };
        const newDeathData = [...this.state.deathsData.datasets];
        newDeathData[0] = { ...newDeathData[0], data: deathData };
        this.setState({
          casesData: {
            labels: labels,
            datasets: newCasesData,
          },
          deathsData: {
            labels: labels,
            datasets: newDeathData,
          },
        });
      });
  }

  countryNumFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    const countryDetail = this.props.countryDetail;
    return (
      //Country page header
      <div className="container country-cont">
        <div className="container row">
          <div className="col-6 country-flag">
            <img src={countryDetail.countryInfo.flag} alt="Flag" />
          </div>
          <div className="col-6 country-name">{countryDetail.country}</div>
        </div>

        <table className="country-table">
          <tr>
            <th>Status</th>
            <th>Cases</th>
            <th>Active</th>
            <th>Deaths</th>
            <th>Critical</th>
            <th>Recovered</th>
            <th>Tests</th>
          </tr>

          <tr>
            <th>Total</th>
            <td>{this.countryNumFormat(countryDetail.cases)}</td>
            <td>{this.countryNumFormat(countryDetail.active)}</td>
            <td>{this.countryNumFormat(countryDetail.deaths)}</td>
            <td>{this.countryNumFormat(countryDetail.critical)}</td>
            <td>{this.countryNumFormat(countryDetail.recovered)}</td>
            <td>
              {countryDetail.tests === 0
                ? "Not Public"
                : this.countryNumFormat(countryDetail.tests)}
            </td>
          </tr>
          <tr>
            <th>Per million</th>
            <td>{this.countryNumFormat(countryDetail.casesPerOneMillion)}</td>
            <td>{this.countryNumFormat(countryDetail.activePerOneMillion)}</td>
            <td>{this.countryNumFormat(countryDetail.deathsPerOneMillion)}</td>
            <td>
              {this.countryNumFormat(countryDetail.criticalPerOneMillion)}
            </td>
            <td>
              {this.countryNumFormat(countryDetail.recoveredPerOneMillion)}
            </td>
            <td>
              {countryDetail.testsPerOneMillion === 0
                ? "Not Public"
                : this.countryNumFormat(countryDetail.testsPerOneMillion)}
            </td>
          </tr>
        </table>

        {/* Chart Js used to build the chart showing below 
            Line options and configuration shown above as datasetsOptions
        */}
        <div className="country-cases">
          <ChartLine chartProps={this.state.casesData} />
        </div>
        <div className="country-deaths">
          <ChartLine chartProps={this.state.deathsData} />
        </div>
      </div>
    );
  }
}

export default EachCountry;

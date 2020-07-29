import React, { Component } from "react";
import "./comparison.css";

class CountryTable extends Component {
  countryNumFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  render() {
    const countryInfo = this.props.countryInfo;

    return (
      <div>
        <h5>{countryInfo.country}</h5>
        <table className="compare-table">
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
            <td>{this.countryNumFormat(countryInfo.cases)}</td>
            <td>{this.countryNumFormat(countryInfo.active)}</td>
            <td>{this.countryNumFormat(countryInfo.deaths)}</td>
            <td>{this.countryNumFormat(countryInfo.critical)}</td>
            <td>{this.countryNumFormat(countryInfo.recovered)}</td>
            <td>
              {countryInfo.tests === 0
                ? "Not Public"
                : this.countryNumFormat(countryInfo.tests)}
            </td>
          </tr>
          <tr>
            <th>Per million</th>
            <td>{this.countryNumFormat(countryInfo.casesPerOneMillion)}</td>
            <td>{this.countryNumFormat(countryInfo.activePerOneMillion)}</td>
            <td>{this.countryNumFormat(countryInfo.deathsPerOneMillion)}</td>
            <td>{this.countryNumFormat(countryInfo.criticalPerOneMillion)}</td>
            <td>{this.countryNumFormat(countryInfo.recoveredPerOneMillion)}</td>
            <td>
              {countryInfo.testsPerOneMillion === 0
                ? "Not Public"
                : this.countryNumFormat(countryInfo.testsPerOneMillion)}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default CountryTable;

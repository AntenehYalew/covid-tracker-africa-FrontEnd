import React, { Component } from "react";
import CountryTable from "./countryTable";
import "./comparedData.css";

class ComparedData extends Component {
  render() {
    const countryOne = this.props.countryDetaileddata[0];
    const countryTwo = this.props.countryDetaileddata[1];
    return (
      <div>
        <CountryTable countryInfo={countryOne} />
        <CountryTable countryInfo={countryTwo} />
      </div>
    );
  }
}

export default ComparedData;

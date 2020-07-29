import React, { Component } from "react";
import axios from "axios";
import ChartLine from "../country/chartLine";
import Loading from "../partials/loading/loadingPage";
import ComparedData from "./comparedData";
import "./comparison.css";

class Comparison extends Component {
  constructor(props) {
    super(props);
    const chartOptions = {
      /*  fill: "origin", */
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
      countries: [],
      firstCountry: "",
      secondCountry: "",
      toggleInput: "",
      comparePage: false,
      countryDetaileddata: [],
      casesData: {
        labels: [],
        datasets: [
          {
            label: "CountryOne",
            borderColor: "rgb(244, 248, 9)",
            pointBorderColor: "rgb(244, 248, 9)",
            pointHoverBackgroundColor: "rgb(244, 248, 9)",
            data: [],
            ...chartOptions,
          },
          {
            label: "CountryTwo",
            borderColor: "rgb(41, 228, 85)",
            pointBorderColor: "rgb(41, 228, 85)",
            pointHoverBackgroundColor: "rgb(41, 228, 85)",
            data: [],
            ...chartOptions,
          },
        ],
      },
      deathsData: {
        labels: [],
        datasets: [
          {
            label: "CountryOne",
            borderColor: "rgb(244, 248, 9)",
            pointBorderColor: "rgb(244, 248, 9)",
            pointHoverBackgroundColor: "rgb(244, 248, 9)",
            data: [],
            ...chartOptions,
          },
          {
            label: "CountryTwo",
            borderColor: "rgb(41, 228, 85)",
            pointBorderColor: "rgb(41, 228, 85)",
            pointHoverBackgroundColor: "rgb(41, 228, 85)",
            data: [],
            ...chartOptions,
          },
        ],
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  handleBackClick() {
    this.setState({
      comparePage: !this.state.comparePage,
    });
  }
  handleSubmitClick = async () => {
    let historyCall = axios.get(
      `https://corona.lmao.ninja/v2/historical/${this.state.firstCountry},${this.state.secondCountry}?lastdays=all`
    );
    let statsCall = axios.get(
      `https://corona.lmao.ninja/v2/countries/${this.state.firstCountry},${this.state.secondCountry}?yesterday=`
    );
    await axios.all([historyCall, statsCall]).then(
      axios.spread((...res) => {
        const labels = Object.keys(res[0].data[0].timeline.cases);
        const countryOnecasesData = Object.values(
          res[0].data[0].timeline.cases
        );
        const countrytwocasesData = Object.values(
          res[0].data[1].timeline.cases
        );
        const newCasesData = [...this.state.casesData.datasets];
        const FinalnewCasesData = [
          {
            ...newCasesData[0],
            data: countryOnecasesData,
            label: this.state.firstCountry,
          },
          {
            ...newCasesData[1],
            data: countrytwocasesData,
            label: this.state.secondCountry,
          },
        ];
        const countryOnedeathData = Object.values(
          res[0].data[0].timeline.deaths
        );
        const countrytwodeathData = Object.values(
          res[0].data[1].timeline.deaths
        );
        const newDeathData = [...this.state.deathsData.datasets];
        const FinalnewDeathsData = [
          {
            ...newDeathData[0],
            data: countryOnedeathData,
            label: this.state.firstCountry,
          },
          {
            ...newDeathData[1],
            data: countrytwodeathData,
            label: this.state.secondCountry,
          },
        ];
        this.setState({
          casesData: {
            labels: labels,
            datasets: FinalnewCasesData,
          },
          deathsData: {
            labels: labels,
            datasets: FinalnewDeathsData,
          },
          comparePage: !this.state.comparePage,
          countryDetaileddata: res[1].data,
        });
      })
    );
  };
  handleInputClick(evt, inuseInput) {
    this.setState({
      toggleInput: inuseInput,
    });
  }
  handleClick = (e, selected) => {
    this.setState({
      firstCountry:
        selected === "firstCountry"
          ? e.target.innerText
          : this.state.firstCountry,
      secondCountry:
        selected === "secondCountry"
          ? e.target.innerText
          : this.state.secondCountry,
      countries: [],
    });
  };

  handleChange = (e, selected) => {
    const match = (input) => {
      const p = Array.from(input).reduce(
        (acc, val, ind) => `${acc}[^${input.substr(ind)}]*?${val}`,
        ""
      );
      const re = RegExp(p);

      return this.props.comparisonProps.filter((val) =>
        val.toLowerCase().match(re)
      );
    };

    this.setState({
      countries: match(e.target.value.toLowerCase()),
      firstCountry:
        selected === "firstCountry" ? e.target.value : this.state.firstCountry,
      secondCountry:
        selected === "secondCountry"
          ? e.target.value
          : this.state.secondCountry,
    });
  };

  render() {
    return (
      <div>
        {this.props.comparisonProps ? (
          <div className="comparison-cont">
            {!this.state.comparePage ? (
              <div>
                <h5>Compare two countries</h5>
                <div className="search-cont container">
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="input-group input-group-sm mb-3">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          onChange={(e) => this.handleChange(e, "firstCountry")}
                          onFocus={(evt) =>
                            this.handleInputClick(evt, "firstCountry")
                          }
                          value={this.state.firstCountry}
                          placeholder="Country"
                        />
                        {this.state.toggleInput === "firstCountry" &&
                          this.state.firstCountry &&
                          this.state.countries
                            .filter(
                              (secondCountry) =>
                                secondCountry !== this.state.secondCountry
                            )
                            .slice(0, 7)
                            .map((m) => (
                              <button
                                type="button"
                                className="btn btn-block btn-outline-secondary option-btn"
                                onClick={(e) =>
                                  this.handleClick(e, "firstCountry")
                                }
                              >
                                {m}
                              </button>
                            ))}
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="input-group input-group-sm mb-3">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          onChange={(e) =>
                            this.handleChange(e, "secondCountry")
                          }
                          onFocus={(evt) =>
                            this.handleInputClick(evt, "secondCountry")
                          }
                          value={this.state.secondCountry}
                          placeholder="Country"
                        />
                        {this.state.toggleInput === "secondCountry" &&
                          this.state.secondCountry &&
                          this.state.countries
                            .filter(
                              (firstCountry) =>
                                firstCountry !== this.state.firstCountry
                            )
                            .slice(0, 7)
                            .map((m) => (
                              <button
                                type="button"
                                className="btn btn-block btn-outline-secondary option-btn"
                                onClick={(e) =>
                                  this.handleClick(e, "secondCountry")
                                }
                              >
                                {m}
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                  {this.props.comparisonProps.includes(
                    this.state.firstCountry
                  ) &&
                    this.props.comparisonProps.includes(
                      this.state.secondCountry
                    ) && (
                      <button
                        className="btn btn-lg btn-block compare-btn"
                        onClick={this.handleSubmitClick}
                      >
                        Compare
                      </button>
                    )}
                </div>
              </div>
            ) : (
              <div className="container comparisondata-cont">
                <div>
                  <button
                    className="btn btn-sm btn-block btn-outline-dark back-btn"
                    onClick={this.handleBackClick}
                  >
                    {" "}
                    Back to search
                  </button>{" "}
                  <ComparedData
                    countryDetaileddata={this.state.countryDetaileddata}
                  />{" "}
                </div>
                <div className="comparison-cases">
                  <h4>Cases</h4>
                  <ChartLine chartProps={this.state.casesData} />
                </div>
                <div className="comparison-deaths">
                  <h4>Deaths</h4>
                  <ChartLine chartProps={this.state.deathsData} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Comparison;

import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import NavBar from "../partials/navbar/navbar";
import DashBoardRoute from "./dashboardRoute";
import EachCountry from "../country/eachCountry";
import Footer from "../partials/footer/footer";
import Error from "../partials/error/error";
import ScrollToTop from "../partials/scrollTop";
import Loading from "../partials/loading/loadingPage";
import Comparison from "../compare/comparison";

//Main Switch page to redirect each path
class DashBoard extends Component {
  //create the instance for refresh interval
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      statsAfrica: {},
      statsCountries: [],
      toggleSorting: true,
      error: false,
      sortedBy: "country",
    };
    this.handleSort = this.handleSort.bind(this);
  }
  //collectdata from API
  componentDidMount() {
    this.collectedData();
  }

  collectedData = async () => {
    let currentComponent = this;
    //Collect Continent data
    await axios
      .get(`https://corona.lmao.ninja/v2/continents/Africa?today=&strict=`)
      .then((resp) => {
        const allCountries = resp.data.countries.toString();
        const runAllCountries = async () => {
          await axios(
            `https://corona.lmao.ninja/v2/countries/${allCountries}?today=true&strict=true&query =`
          )
            .then((response) => {
              currentComponent.setState({
                statsAfrica: resp.data,
                statsCountries: response.data,
              });
            })
            .catch((err) => {
              console.log(err);
              currentComponent.setState({
                error: true,
              });
            });
        };
        runAllCountries();
      })
      .catch((err) => {
        console.log(err);
        currentComponent.setState({
          error: true,
        });
      });
    //Call the function with setTimeout to keep an auto componentDidMount every 1min
    this.intervalID = setTimeout(this.collectedData.bind(this), 60000);
  };
  // clear the interval when the component unmounts

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  //Sort data on key
  handleSort(sortKey) {
    const toggle = this.state.toggleSorting;
    const sortMgt = this.state.statsCountries.sort((a, b) => {
      if (sortKey === "country") {
        if (toggle) {
          return a[sortKey] > b[sortKey] ? -1 : 1;
        } else {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        }
      } else {
        return toggle ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey];
      }
    });
    this.setState({
      statsCountries: sortMgt,
      toggleSorting: !toggle,
      sortedBy: sortKey,
    });
  }

  render() {
    const statsCountries = this.state.statsCountries;
    return (
      <ScrollToTop>
        {" "}
        <div className="dashboard-cont">
          <div className="dashboard-body">
            <NavBar />
            {this.state.error ? (
              <Error />
            ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <DashBoardRoute
                      {...routeProps}
                      dashBoardProps={this.state}
                      handleSort={this.handleSort}
                    />
                  )}
                />
                <Route
                  exact
                  path="/comparison"
                  render={(routeProps) => (
                    <Comparison
                      comparisonProps={this.state.statsAfrica.countries}
                    />
                  )}
                />
                {statsCountries.length ? (
                  statsCountries.map((country) => (
                    <Route
                      key={country.country}
                      exact
                      path={`/${country.country}`}
                      render={() => (
                        <EachCountry key={country} countryDetail={country} />
                      )}
                    />
                  ))
                ) : (
                  <Loading />
                )}
                {/* Redirect to home "/" if data is not found for non African Countries */}
                <Route
                  render={(routeProps) => (
                    <DashBoardRoute
                      {...routeProps}
                      dashBoardProps={this.state}
                      handleSort={this.handleSort}
                    />
                  )}
                />
              </Switch>
            )}
          </div>
          <div className="dashboard-footer">
            <Footer />
          </div>
        </div>
      </ScrollToTop>
    );
  }
}

export default DashBoard;

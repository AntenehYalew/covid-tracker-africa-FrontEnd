import React, { Component } from "react";
import DashboardHeader from "./dashboardheader";
import DashBoardBody from "./dashboardbody";
import Loading from "../partials/loading/loadingPage";
import "./dashboardRoute.css";
class DashBoardRoute extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
  }
  //Handle sorting props on key values to display asc or decs order
  handleClick(evt, sortBy) {
    this.props.handleSort(sortBy);
  }
  //Handle Route on click to the country's page
  handleRoute = (country) => {
    this.props.history.push(`/${country}`);
  };

  render() {
    const dashBoardProps = this.props.dashBoardProps;
    const updatedTime = Math.floor(
      (Date.now() - dashBoardProps.statsAfrica.updated) / 60000
    );
    const sortedBy = this.props.dashBoardProps.sortedBy;
    return (
      <div className="container dashboardroute-cont">
        {dashBoardProps.statsCountries.length > 0 ? (
          <div>
            <DashboardHeader statsAfrica={dashBoardProps.statsAfrica} />
            <div className="table-cont">
              <h3>
                Public information collected from &nbsp;
                <a
                  href="https://coronavirus.jhu.edu/map.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  John Hopkins University
                </a>
              </h3>
              <small>(Updated: {updatedTime} min ago)</small>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th
                      colSpan="2"
                      rowSpan="2"
                      className={
                        sortedBy === "country"
                          ? "th-country sorted"
                          : "th-country"
                      }
                      onClick={(e) => this.handleClick(e, "country")}
                    >
                      Country
                      <i className="fas fa-sort"></i>
                    </th>
                    <th colSpan="2" className="th-cases ">
                      Cases
                    </th>
                    <th colSpan="2" className="th-death ">
                      Deaths
                    </th>
                    <th className="th-tests ">Tests</th>
                  </tr>
                  <tr>
                    <th
                      className={
                        sortedBy === "cases" ? "th-cases sorted" : "th-cases"
                      }
                      onClick={(e) => this.handleClick(e, "cases")}
                    >
                      Total<i className="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        sortedBy === "todayCases"
                          ? "th-cases sorted"
                          : "th-cases"
                      }
                      onClick={(e) => this.handleClick(e, "todayCases")}
                    >
                      New<i className="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        sortedBy === "deaths" ? "th-death sorted" : "th-death"
                      }
                      onClick={(e) => this.handleClick(e, "deaths")}
                    >
                      Total<i className="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        sortedBy === "todayDeaths"
                          ? "th-death sorted"
                          : "th-death"
                      }
                      onClick={(e) => this.handleClick(e, "todayDeaths")}
                    >
                      New<i className="fas fa-sort"></i>
                    </th>
                    <th
                      className={
                        sortedBy === "tests" ? "th-tests sorted" : "th-tests"
                      }
                      onClick={(e) => this.handleClick(e, "tests")}
                    >
                      Total<i className="fas fa-sort"></i>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dashBoardProps.statsCountries.map((m) => (
                    <DashBoardBody
                      handleRoute={this.handleRoute}
                      key={m.country}
                      statsCountries={m}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default DashBoardRoute;

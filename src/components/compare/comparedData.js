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

        {/*     <div className="row">
          <div className="col-6 compareddata-left">
            <h5>{countryOne.country}</h5>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4">
                Cases
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countryOne.cases)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countryOne.casesPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Active
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countryOne.active)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countryOne.activePerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Deaths
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countryOne.deaths)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countryOne.deathsPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Critical
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countryOne.critical)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countryOne.criticalPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Recovered
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countryOne.recovered)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countryOne.recoveredPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Tests
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>
                      {countryOne.tests === 0
                        ? "Not Public"
                        : this.countryNumFormat(countryOne.tests)}
                    </div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>

                    <div>
                      {countryOne.testsPerOneMillion === 0
                        ? "Not Public"
                        : this.countryNumFormat(countryOne.testsPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 compareddata-right">
            <h5>{countrytwo.country}</h5>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4">
                Cases
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countrytwo.cases)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countrytwo.casesPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Active
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countrytwo.active)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countrytwo.activePerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Deaths
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countrytwo.deaths)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countrytwo.deathsPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Critical
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countrytwo.critical)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countrytwo.criticalPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Recovered
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>{this.countryNumFormat(countrytwo.recovered)}</div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>
                    <div>
                      {this.countryNumFormat(countrytwo.recoveredPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                Tests
                <div className="row">
                  <div className="col-6">
                    <div>Total</div>
                    <div>
                      {countrytwo.tests === 0
                        ? "Not Public"
                        : this.countryNumFormat(countrytwo.tests)}
                    </div>
                  </div>
                  <div className="col-6">
                    <div> /mil</div>

                    <div>
                      {countrytwo.testsPerOneMillion === 0
                        ? "Not Public"
                        : this.countryNumFormat(countrytwo.testsPerOneMillion)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ComparedData;

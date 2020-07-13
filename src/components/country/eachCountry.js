import React, { Component } from 'react'
import { Bar,Line  } from 'react-chartjs-2';
import axios from 'axios';
import "./eachCountry.css"



class EachCountry extends Component {
    constructor (props) {
        super(props)
        this.state = {
            casesData :{
                labels :[],
                datasets:[{
                    label:"Cases",
                    borderColor: "rgba(175, 204, 250,0.8)",
                    data:[],
                    borderWidth:3,
                    fill: false,
                    pointRadius:3,
                    pointStyle:"star"
                }]
            },
            deathsData:{
                labels :[],
                    datasets:[{
                            label:"Death",
                            borderColor: "rgba(250, 152, 200,0.8)",
                            data:[],
                            borderWidth:3,
                            fill: false,
                            pointRadius:3,
                            pointStyle:"star"
                    }]
            }
        }
    }

    async componentDidMount(){
        await axios.get(`https://corona.lmao.ninja/v2/historical/${this.props.countryDetail.country}?lastdays=all`)
                .then(res=>{
                    const labels = Object.keys(res.data.timeline.cases)
                    const casesData = Object.values(res.data.timeline.cases)
                    const deathData = Object.values(res.data.timeline.deaths)
                    const newCasesData = [...this.state.casesData.datasets]
                    newCasesData[0] = {...newCasesData[0], data:casesData}
                    const newDeathData = [...this.state.deathsData.datasets]
                    newDeathData[0] = {...newDeathData[0], data:deathData}
                    this.setState({
                        casesData: {
                            labels :labels,
                            datasets:newCasesData
                        },
                        deathsData:{
                            labels :labels,
                            datasets:newDeathData
                        }
                    })
                })
  
    }

    render () {

        return (
            <div className="container">
            <div className="row">
                <div className="col-3 country-flag">
                    <img  src={this.props.countryDetail.countryInfo.flag} />
                </div>
                <div className="col-5">
                    {this.props.countryDetail.country}
                </div>
                <div className="col-4">
                    {this.props.countryDetail.population}
                </div>
            </div>
           

            <div className="row">
                <div className="col-3">
                    <div>Active</div>
                    <div>{this.props.countryDetail.active}</div>
                </div>
                <div className="col-3">
                    <div>Active/Mil</div>
                    <div>{this.props.countryDetail.activePerOneMillion}</div>
                </div>
                <div className="col-3">
                    <div>Cases</div>
                    <div>{this.props.countryDetail.cases}</div>
                </div>
                <div className="col-3">
                    <div>Cases/Mil</div>
                    <div>{this.props.countryDetail.casesPerOneMillion}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div>critical</div>
                    <div>{this.props.countryDetail.critical}</div>
                </div>
                <div className="col-3">
                    <div>Critical/Mil</div>
                    <div>{this.props.countryDetail.criticalPerOneMillion}</div>
                </div>
                <div className="col-3">
                    <div>recovered</div>
                    <div>{this.props.countryDetail.deaths}</div>
                </div>
                <div className="col-3">
                    <div>recovered/Mil</div>
                    <div>{this.props.countryDetail.recoveredPerOneMillion}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div>recovered</div>
                    <div>{this.props.countryDetail.recovered}</div>
                </div>
                <div className="col-3">
                    <div>recovered/Mil</div>
                    <div>{this.props.countryDetail.recoveredPerOneMillion}</div>
                </div>
                <div className="col-3">
                    <div>tests</div>
                    <div>{this.props.countryDetail.tests}</div>
                </div>
                <div className="col-3">
                    <div>tests/Mil</div>
                    <div>{this.props.countryDetail.testsPerOneMillion}</div>
                </div>
            </div>
            <div className="country-cases">
            <Line 
                data={this.state.casesData}
                options={{ maintainAspectRatio: false }}
               />
            </div>
            <div className="country-deaths">
              <Line 
                data={this.state.deathsData}
                options={{ maintainAspectRatio: false }}
               />
              </div>
             
            </div>
        )
    }
}


export default EachCountry
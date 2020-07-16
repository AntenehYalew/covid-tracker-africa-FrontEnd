import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import "./eachCountry.css"



class EachCountry extends Component {
    constructor (props) {
        super(props)
        const chartOptions = {
            fill: "origin",
            lineTension: 0.1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
           }
        this.state = {
            casesData :{
                labels :[],
                datasets:[{
                    label:"Cases",
                    borderColor: "rgb(252,223,127)",
                    backgroundColor:"rgb(252,223,127)",
                    pointBorderColor: 'rgb(252,223,127)',
                    pointHoverBackgroundColor: 'rgb(252,223,127)',
                    data:[],
                    ...chartOptions
                }]
            },
            deathsData:{
                labels :[],
                    datasets:[{
                            label:"Deaths",
                            borderColor: "rgb(248,110,121)",
                            backgroundColor:"rgb(248,110,121)",
                            pointBorderColor: 'rgb(248,110,121)',
                            pointHoverBackgroundColor: 'rgb(248,110,121)',
                            data:[],
                            ...chartOptions
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

    countryNumFormat = (num)=>{
        return  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }

    render () {
        const  axesOptions = {
            ticks: {
                beginAtZero: true,
                fontColor: "white",
            },
            gridLines: {
                display: false
            }
        }
        const datasetsOptions = {
            maintainAspectRatio: true,
            tooltips: {
                    mode: 'index',
                    intersect: false
                },
            hover: {
                mode: 'index',
                intersect: false
            },
            scales:{
                yAxes: [axesOptions],
                xAxes: [axesOptions]
            },
            legend:{
                labels:{
                    boxWidth:0,
                    fontColor: "white",
                    fontFamily:  'EB Garamond, serif',
                    fontSize: 18,
                }
            },
            title: {
                display: true,
                text: 'Data collected from John Hopkins University',
                position:"bottom",
                fontFamily:  'EB Garamond, serif',
                fontColor: "white",
                fontSize: 15,
                fontStyle:"italic",
                padding: 25
            }
            
        }
        return (
            <div className="container country-cont">
            <div className="container row">
                <div className="col-6 country-flag">
                    <img  src={this.props.countryDetail.countryInfo.flag} />
                </div>
                <div className="col-6 country-name">
                    {this.props.countryDetail.country}
                </div>
            </div>
           

            <div className="container row">
            
                <div className="col-md-4 col-6 country-yellow">
                         Cases
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.cases)}</div>
                    </div>
                    <div className="col-6">                
                        <div> /mil</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.casesPerOneMillion)}</div>
                    </div>
                    </div>
                </div>

                <div className="col-md-4 col-6 country-yellow">
                         Active
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.active)}</div>
                    </div>
                    <div className="col-6">                
                        <div>/mil</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.activePerOneMillion)}</div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-6 country-red">
                         Deaths
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.deaths)}</div>
                    </div>
                    <div className="col-6">                
                        <div>/mil</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.deathsPerOneMillion)}</div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-6 country-red">
                         Critical
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.critical)}</div>
                    </div>
                    <div className="col-6">                
                        <div>/mil</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.criticalPerOneMillion)}</div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-6 country-green">
                        Recovered
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.recovered)}</div>
                    </div>
                    <div className="col-6">                
                        <div>/mil</div>
                        <div>{this.countryNumFormat(this.props.countryDetail.recoveredPerOneMillion)}</div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 col-6 country-green">
                        Tests
                         <div className="row">
                    <div   className="col-6">
                        <div>Total</div>
                        <div>{this.props.countryDetail.tests===0? "Not Public": this.countryNumFormat(this.props.countryDetail.tests)}</div>
                    </div>
                    <div className="col-6">                
                        <div>/mil</div>
                        <div>{this.props.countryDetail.testsPerOneMillion===0?"Not Public": this.countryNumFormat(this.props.countryDetail.testsPerOneMillion)}</div>
                    </div>
                    </div>
                </div>
      
            </div>
            <div className="country-cases">
            <Line 
                data={this.state.casesData}
                options={
                    datasetsOptions
                 }
               />
            </div>
            <div className="country-deaths">
              <Line 
                data={this.state.deathsData}
                options={datasetsOptions}
               />
              </div>
             
            </div>

            
        )
    }
}


export default EachCountry
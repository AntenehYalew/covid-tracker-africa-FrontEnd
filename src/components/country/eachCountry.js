import React, { Component } from 'react'
import { Bar,Line  } from 'react-chartjs-2';
import axios from 'axios';



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
            <div>
            <div style={{width:"50%"}}>
            <Line 
                data={this.state.casesData}
                options={{ maintainAspectRatio: false }}
               />
            </div>
            <div style={{width:"50%"}}>
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
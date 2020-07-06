import React, { Component } from 'react'
import { Bar,Line  } from 'react-chartjs-2';
import axios from 'axios';



class EachCountry extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data :{
                labels :[],
                datasets:[{
                    label:"Covid-cases",
                    borderColor: 'rgb(255, 99, 132)',
                    data:[]
                },
                {
                    label:"Covid-death",
                    borderColor: 'rgb(55, 199, 12)',
                    data:[]
                }
            ]
            }
        }
    }

    async componentDidMount(){
        await axios.get(`https://corona.lmao.ninja/v2/historical/${this.props.countryDetail.country}?lastdays=all`)
                .then(res=>{
                    const labels = Object.keys(res.data.timeline.cases)
                    const casesData = Object.values(res.data.timeline.cases)
                    const deathData = Object.values(res.data.timeline.deaths)
                    this.setState({
                        data: {
                            labels :labels,
                            datasets:[{
                                label:"Covid-cases",
                                borderColor: 'rgb(237, 220, 72)',
                                data:casesData
                            },
                            {
                                label:"Covid-death",
                                borderColor: 'rgb(251, 65, 42)',
                                data:deathData
                            }
                        ]
                        }
                    })
                })
  
    }

    render () {

        return (
            <div>
              <Line 
                data={this.state.data}
                options={{ maintainAspectRatio: false }}
               />
            </div>
        )
    }
}


export default EachCountry
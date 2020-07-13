import React, { Component } from 'react'
import "./dashboardHeader.css"

class DashboardHeader extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    headerNumFormat = (num)=>{
        return  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }

    render () {
    
        return (
     

<div className="container dashBoard-cont">
    <div className="dashboard-africa-left">
        <img src = "https://www.aftld.org/wp-content/uploads/2019/02/2000px-FlagsMapAfrica.svg-1.png"/>
    </div>
    <div className="dashboard-africa-right">
            <div className="row">
                <div className="col cases ">
                <h3>New Cases </h3>
                </div> 
                <div className="col cases ">
                   <h3> {this.headerNumFormat(this.props.statsAfrica.todayCases)}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col death ">
                   <h3>New Deaths</h3> 
                </div> 
                <div className="col death ">
                      <h3>{this.headerNumFormat(this.props.statsAfrica.todayDeaths)} </h3>
                </div>
            </div>
            <div className="row">
                <div className="col cases">
                    <h3>Total Cases</h3> 
                </div>
                <div className="col cases">
                      <h3>{this.headerNumFormat(this.props.statsAfrica.cases)} </h3>
                </div>
            </div>
            <div className="row">
                <div className="col death">
                    <h3>Total Deaths</h3>      
                </div>  
                <div className="col death">
                    <h3> {this.headerNumFormat(this.props.statsAfrica.deaths)} </h3>
                </div>
            </div>
            <div className="row">
                <div className="col tests">
                    <h3>Total Tests</h3>      
                </div>
                <div className="col tests">
                    <h3> {this.headerNumFormat(this.props.statsAfrica.tests)} </h3>
                </div> 
            </div>
    
    </div>
</div>


        )
    }
}

export default DashboardHeader
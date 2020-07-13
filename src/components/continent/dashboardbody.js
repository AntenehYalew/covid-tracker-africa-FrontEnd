import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./dashboardbody.css"

class DashBoardBody extends Component {
    constructor (props) {
        super(props)
        this.state={
            statsCountries:[]
        }
        this.handleClick = this.handleClick.bind(this)

    }
    numFormat = (num)=>{
      return  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    handleClick(){
       this.props.handleRoute(this.props.statsCountries.country)
    }
    
    render () {
        const allData = this.props.statsCountries
        return (
                <tr onClick={this.handleClick}>
                    <td className="td-flag"><img className="flag" src={allData.countryInfo.flag}/></td>
                    <td className="td-country"> {allData.country} </td>
                    <td className="td-ttl-cases">{this.numFormat(allData.cases)}</td>
                    <td className="td-tdy-cases">{this.numFormat(allData.todayCases)}</td>
                    <td className="td-ttl-death">{this.numFormat(allData.deaths)}</td>
                    <td className="td-tdy-death">{this.numFormat(allData.todayDeaths)}</td>
                    <td className="td-ttl-tests">{allData.tests === 0? "Not Public" : this.numFormat(allData.tests)}</td>
                </tr>
        )
    }
}

export default DashBoardBody


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
        this.context.router.value.history.push("/Ethiopia")
    }

    render () {
        const allData = this.props.statsCountries
        return (
                <tr onClick={this.handleClick}>
                    <td className="td-country">  <Link exact to={`/${allData.country}`}>{allData.country} </Link> </td>
                    <td className="td-flag"><img className="flag" src={allData.countryInfo.flag}/></td>
                    <td className="td-ttl-cases">{this.numFormat(allData.cases)}</td>
                    <td className="td-tdy-cases">{this.numFormat(allData.todayCases)}</td>
                    <td className="td-ttl-death">{this.numFormat(allData.deaths)}</td>
                    <td className="td-tdy-death">{this.numFormat(allData.todayDeaths)}</td>
                    <td className="td-ttl-tests">{this.numFormat(allData.tests)}</td>
                </tr>
        )
    }
}

export default DashBoardBody


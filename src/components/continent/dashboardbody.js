import React, { Component } from 'react'
import axios from "axios"

class DashBoardBody extends Component {
    constructor (props) {
        super(props)
        this.state={
            statsCountries:[]
        }
    }

    render () {
        const allData = this.props.statsCountries
        return (
            <div>
                
                    <h5 >{allData.country} // Cases:- {allData.cases} // deaths:-{allData.deaths} // todayCases:- {allData.todayCases}</h5>
            </div>
        )
    }
}

export default DashBoardBody


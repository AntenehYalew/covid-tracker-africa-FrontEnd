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
                {allData.map(m=>
                    <h5 key={m.country}>{m.country} // Cases:- {m.cases} // deaths:-{m.deaths} // todayCases:- {m.todayCases}</h5>
                )}

         
                 
              
            </div>
        )
    }
}

export default DashBoardBody


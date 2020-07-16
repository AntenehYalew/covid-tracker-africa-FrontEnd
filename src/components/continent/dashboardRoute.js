import React, { Component } from 'react'
import DashboardHeader from "./dashboardheader"
import DashBoardBody from "./dashboardbody"
import Loading from "../partials/loadingPage"
import "./dashboardRoute.css"
class DashBoardRoute extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleRoute = this.handleRoute.bind(this)
    }

    handleClick(evt, sortBy){
        this.props.handleSort(sortBy)
    }
    handleRoute =(country)=>{
      this.props.history.push(`/${country}`)
    }
    
    render () {
        return (
            <div className="container dashboardroute-cont">   
             {this.props.dashBoardProps.statsCountries.length>0 ?
              <div>
                <DashboardHeader statsAfrica={this.props.dashBoardProps.statsAfrica} />
                <div className="table-cont">
                <h3>Public information collected from <a href="https://coronavirus.jhu.edu/map.html" target="_blank">John Hopkins University</a> </h3>
                <table className="table table-striped" >
                <thead>
                <tr>
                     <th colSpan="2" rowSpan="2" className="th-country " onClick={e=>this.handleClick(e,"country")}>Country <i class="fas fa-sort"></i></th>
                    <th colSpan="2" className="th-cases ">Cases</th>
                    <th colSpan="2" className="th-death "> Deaths</th>
                    <th className="th-tests ">Tests</th>
                </tr>
                    <tr >    
                        <th className="th-cases "  onClick={e=>this.handleClick(e,"cases")}>Total<i class="fas fa-sort"></i></th>
                        <th className="th-cases " onClick={e=>this.handleClick(e,"todayCases")}>New<i class="fas fa-sort"></i></th>
                        <th className="th-death " onClick={e=>this.handleClick(e,"deaths")}>Total<i class="fas fa-sort"></i></th>
                        <th className="th-death " onClick={e=>this.handleClick(e,"todayDeaths")}>New<i class="fas fa-sort"></i></th>
                        <th className="th-tests " onClick={e=>this.handleClick(e,"tests")}>Total<i class="fas fa-sort"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.dashBoardProps.statsCountries.map(m=>
                            <DashBoardBody handleRoute={this.handleRoute} key={m.country} statsCountries = {m}/>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
            :  
              <Loading/>              
        }

            </div>
        )
    }
}

export default DashBoardRoute
import React, { Component } from 'react'
import axios from "axios"
import {Switch, Link, Route} from "react-router-dom"
import NavBar from "./navbar"

import DashBoardRoute from "./dashboardRoute"
import EachCountry from "../country/eachCountry"

class DashBoard extends Component {
    constructor (props) {
        super(props)
        this.state={
            statsAfrica:{},
            statsCountries:[],
            toggleSorting:true
        }

        this.handleSort = this.handleSort.bind(this)

    }

async componentDidMount(){
    await axios.get("/countryupdate")
         .then(response=>{
             this.setState({
                statsAfrica:response.data.continentData,
                statsCountries:response.data.countryData
             })
         })
}



handleSort(sortKey){
    const sortMgt =  this.state.statsCountries.sort((a,b)=>{
        if(sortKey==="country"){
            if(this.state.toggleSorting){
                return ((a[sortKey] > b[sortKey])?-1 : 1)
            } else{
                return ((a[sortKey] > b[sortKey])? 1 : -1)
            }
       }else{
            return (this.state.toggleSorting ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])
        }

    })
    this.setState({
        statsCountries:sortMgt,
        toggleSorting:!this.state.toggleSorting
    })
 
}


    render () {
        return (
            <div>
            <NavBar />
            
             <Switch>
                    <Route exact path="/" render={routeProps=><DashBoardRoute {...routeProps} dashBoardProps={this.state} handleSort={this.handleSort} /> }/>
         
                {this.state.statsCountries.map(m=>
                    <Route exact path={`/${m.country}`} render={()=> <EachCountry countryDetail = {m} />} />
                )}
               </Switch> 
                 
              
            </div>
      
        )
    }
}

export default DashBoard










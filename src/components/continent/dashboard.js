import React, { Component } from 'react'
import axios from "axios"
import {Switch, Route} from "react-router-dom"
import NavBar from "../partials/navbar"
import DashBoardRoute from "./dashboardRoute"
import EachCountry from "../country/eachCountry"
import Footer from "../partials/footer"
import Loading from "../partials/loadingPage"

//Main Switch page to redirect each path
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
//collectdata from API
async componentDidMount(){
  let currentComponent = this;
  //Collect Continent data
    await axios.get(`https://corona.lmao.ninja/v2/continents/Africa?today=&strict=`)
    .then(resp=>{
      const allDetails = {continentData:resp.data, countryData:[]}
      //Collect Country Data
      async function runAllCountries(){
        for (let i = 0; i< resp.data.countries.length; i++){
          const newdata = await axios (`https://corona.lmao.ninja/v2/countries/${resp.data.countries[i]}?yesterday=true&strict=true&query =`)
            allDetails.countryData.push(newdata.data)
        }
        currentComponent.setState({
            statsAfrica:allDetails.continentData,
            statsCountries:allDetails.countryData,
    
         })
       
      }
      runAllCountries()
    })    

      
}


//Sort data on key
handleSort(sortKey){
    const toggle = this.state.toggleSorting
    const sortMgt =  this.state.statsCountries.sort((a,b)=>{
        if(sortKey==="country"){
            if(toggle){
                return ((a[sortKey] > b[sortKey])?-1 : 1)
            } else{
                return ((a[sortKey] > b[sortKey])? 1 : -1)
            }
       }else{
            return (toggle? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])
        }

    })
    this.setState({
        statsCountries:sortMgt,
        toggleSorting:!toggle
    })
 
}

    render () {
        const statsCountries = this.state.statsCountries
        return (
            <div style={{minHeight:"100vh", position:"relative"}}>
            <div>
            <NavBar />
             <Switch>
                    <Route exact path="/" render={routeProps=><DashBoardRoute {...routeProps} dashBoardProps={this.state} handleSort={this.handleSort} /> }/>
                    {statsCountries.length?
                        statsCountries.map(country=>
                        <Route exact path={`/${country.country}`} render={()=> <EachCountry key={country} countryDetail = {country} />} />
                    ) 
                        : <Loading/>
                     }
                     {/* Redirect to home "/" if data is not found for non African Countries */}
                     <Route render={routeProps=><DashBoardRoute {...routeProps} dashBoardProps={this.state} handleSort={this.handleSort} /> }/>
            </Switch> 
            </div>    
                <Footer />
            </div>
      
        )
    }
}

export default DashBoard










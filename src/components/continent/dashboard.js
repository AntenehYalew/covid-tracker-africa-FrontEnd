import React, { Component } from 'react'
import axios from "axios"
import {Switch, Link, Route} from "react-router-dom"
import DashboardHeader from "./dashboardheader"
import DashBoardBody from "./dashboardbody"
import EachCountry from "../country/eachCountry"

class DashBoard extends Component {
    constructor (props) {
        super(props)
        this.state={
            statsAfrica:{},
            statsCountries:[],
            ascending:true
        }

        this.handleCases = this.handleCases.bind(this)
        this.handleDeaths = this.handleDeaths.bind(this)
        this.handletdyCases = this.handletdyCases.bind(this)
      
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



handleCases(){
    const sortMgt =  this.state.statsCountries.sort((a,b)=>{
       return (this.state.ascending ? b.cases - a.cases : a.cases - b.cases)
    })
    this.setState({
        statsCountries:sortMgt,
       ascending:!this.state.ascending
    })
 
}
handleDeaths(){
    const sortMgt =  this.state.statsCountries.sort((a,b)=>{
       return (this.state.ascending ? b.deaths - a.deaths : a.deaths - b.deaths)
    })
    this.setState({
        statsCountries:sortMgt,
       ascending:!this.state.ascending
    })
 
}
handletdyCases(){
    const sortMgt =  this.state.statsCountries.sort((a,b)=>{
       return (this.state.ascending ? b.todayCases - a.todayCases : a.todayCases - b.todayCases)
    })
    this.setState({
        statsCountries:sortMgt,
       ascending:!this.state.ascending
    })
 
}

    render () {
        return (
            
            <div>
             <Switch>
             <Route exact path="/">
          {/*    {this.state.statsCountries.length>0 &&  */}
             <div>
             <DashboardHeader statsAfrica={this.state.statsAfrica} />
           
            <table className="table table-striped" >
            <thead>
                <tr>    
                    <th className="th-country">Country</th>
                    <th className="th-flag">Flag</th>
                    <th className="th-cases"  onClick={this.handleCases}>Total Cases</th>
                    <th className="th-cases" onClick={this.handletdyCases}>New Cases</th>
                    <th className="th-death" onClick={this.handleDeaths}>Total Death</th>
                    <th className="th-death">New Death</th>
                    <th className="th-tests">Total Tests</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.statsCountries.map(m=>
                        <DashBoardBody key={m.country} statsCountries = {m}/>
                    )}
                </tbody>
            </table>
            </div>
    {/*     } */}

             </Route>
                {this.state.statsCountries.map(m=>
                    <Route exact path={`/${m.country}`} render={()=> <EachCountry countryDetail = {m} />} />
                )}
                </Switch> 
                 
              
            </div>
      
        )
    }
}

export default DashBoard






/*    async componentDidMount(){

        var countriesData = []

        async function countries(m){
            let newdata = await axios.get(`/countryupdate/${m}`)
            countriesData.push(newdata.data)
         }
        
    const processing = async()=>{
        const continent = await axios.get(`/continentupdate`)
        for (const m of continent.data.countries){
            await countries(m)
        }
        this.setState({
            statsAfrica:continent.data
        })
        this.setState(crntState=>({
            statsCountries:[...crntState.statsCountries, ...countriesData]
        }))
    }
        
await processing()


    } */









/* import React, { Component } from 'react'
import axios from "axios"
import './dashboard.css'


class DashBoard extends Component {
    constructor (props) {
        super(props)
        this.state ={
            continentUpdate:{}
        }
       
    }
    
    async componentDidMount(){
       await axios({
            methdo:"get",
            url:"/continentupdate"
            })
             .then(res=>{
                 this.setState({
                     continentUpdate: res.data
                 })
             })
             .catch(err=>{
                 console.log(err)
             })
        this.props.onHandleList(this.state.continentUpdate.countries)
    }

    
    render () {
        const continentData = this.state.continentUpdate
        return (
            <div>

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
                                   <h3> {continentData.todayCases}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col death ">
                                   <h3>New Death</h3> 
                                </div> 
                                <div className="col death ">
                                      <h3>{continentData.todayDeaths} </h3>
                                </div>
                                </div>
                            <div className="row">
                                <div className="col cases">
                                    <h3>Total Cases</h3> 
                                </div>
                                <div className="col cases">
                                      <h3>{continentData.cases} </h3>
                                </div>
                                </div>
                            <div className="row">
                                <div className="col death">
                                    <h3>Total Death</h3>      
                                </div>  
                                <div className="col death">
                                    <h3> {continentData.deaths} </h3>
                                </div>
                                </div>
                            <div className="row">
                                <div className="col tests">
                                    <h3>Total Tests</h3>      
                                </div>
                                <div className="col tests">
                                    <h3> {continentData.tests} </h3>
                                </div> 
                                </div>
                    
                    </div>
                </div>
      
              </div>
        )
    }
}

export default DashBoard */
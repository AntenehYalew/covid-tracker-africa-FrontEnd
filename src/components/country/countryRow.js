/* import React, { Component } from 'react'
import axios from "axios"
import "./eachCountry.css"



class CountryRow extends Component {
    constructor(props){
        super(props)
        this.state = {
   
        }
     
    }

componentDidUpdate(){
    if(this.state.updatedData.length===0){
        this.setState({
            updatedData:this.props.countryList
        })
    }
    console.log("DidUpdate")
}



componentDidMount(){
    console.log("ROW MOUNT")
    console.log(this.props.countryList)
}


     async componentDidMount(){
        await axios({
                method:"get",
                url:`/countryupdate/${this.props.singleCountry}`
                }).then(res=>{
                    this.setState({
                        country       :res.data.country,
                        flag          :res.data.countryInfo.flag,
                        todayCases    :res.data.todayCases,
                        todayDeaths   :res.data.todayDeaths,
                        cases         :res.data.cases,
                        deaths        :res.data.deaths,
                        tests         :res.data.tests
                    })
                 }).catch(err=>{
                     console.log(err)
                 })
    }

    render () {
        return (
                    <tr>
                        <th className="td-country" scope="row">{this.state.country}</th>
                        <td className="td-flag"><img className="flag" src={this.state.flag}/></td>
                        <td  className="td-tdy-cases">{this.state.todayCases}</td>
                        <td  className="td-tdy-death">{this.state.todayDeaths}</td>
                        <td  className="td-ttl-cases">{this.state.cases}</td>
                        <td  className="td-ttl-death">{this.state.deaths}</td>
                        <td  className="td-ttl-tests">{this.state.tests === 0 ? "Not Public" : this.state.tests}</td>
                    </tr>
       
       )
    }
}

export default CountryRow */
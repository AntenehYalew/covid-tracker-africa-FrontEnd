/* import React, { Component } from 'react'
import axios from "axios"
import CountryRow from "./countryRow"
import "./eachCountry.css"

class EachCountry extends Component {
    constructor (props) {
        super(props)
        this.state={
            countryList:[]
        }
    }

  async componentDidMount(){
    const allNewdata = []
    const getNewdata = async(m) =>{
        let newdata = await axios ({
            method:"get",
            url:`/countryupdate/${m}`
        })
        allNewdata.push(newdata.data)
    }
    
     const updateddata = async()=>{
         for(const m of this.props.countryList){
             await getNewdata(m)
         }
         this.setState(crntState=>({
            countryList :[...crntState.countryList, ...allNewdata]
         }))
     }

     await updateddata()

    }
    
    render () {

        return (
            <div>
            <div className="container">
            <table className="table table-striped">
                 <thead>
                    <tr>
                        <th scope="col" className="th-country">Country</th>
                        <th scope="col" className="th-flag">Flag</th>
                        <th scope="col" className="th-cases">New Cases</th>
                        <th scope="col" className="th-death">New Deaths</th>
                        <th scope="col" className="th-cases">Total Cases</th>
                        <th scope="col" className="th-death">Total Deaths</th>
                        <th scope="col" className="th-tests">Total Tests</th>
                    </tr>
                </thead>
                <tbody>
            
                </tbody>
                </table>
            </div>
        
            </div>
        )
    }
}


export default EachCountry */
import React, { Component } from 'react'

class DashboardHeader extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        console.log("dashboard header")
    }

    render () {
        return (
            <div>
                <h1>{this.props.statsAfrica.continent}</h1>
            </div>
        )
    }
}

export default DashboardHeader
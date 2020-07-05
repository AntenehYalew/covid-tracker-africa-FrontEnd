import React, { Component } from 'react'


class EachCountry extends Component {
    constructor (props) {
        super(props)

    }

    render () {

        return (
            <div>
                <h1>{this.props.countryDetail.country}</h1>
                <img src={this.props.countryDetail.countryInfo.flag} />
            </div>
        )
    }
}


export default EachCountry
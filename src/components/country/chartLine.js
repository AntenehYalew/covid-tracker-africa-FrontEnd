import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class ChartLine extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //chart configuration
    const axesOptions = {
      ticks: {
        beginAtZero: true,
        fontColor: "white",
        precision: 0,
      },
      gridLines: {
        display: false,
      },
    };
    //chart options

    const screenresolution = () => {
      return window.innerWidth < 500 ? false : true;
    };

    const datasetsOptions = {
      maintainAspectRatio: screenresolution(),
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
      },
      scales: {
        yAxes: [axesOptions],
        xAxes: [axesOptions],
      },
      animation: {
        duration: 1000,
        easing: "easeInCirc",
      },
      legend: {
        labels: {
          boxWidth: 30,
          fontColor: "white",
          fontFamily: "EB Garamond, serif",
          fontSize: 15,
          padding: 25,
        },
      },
      title: {
        display: true,
        text: "Data collected from John Hopkins University",
        position: "bottom",
        fontFamily: "EB Garamond, serif",
        fontColor: "white",
        fontSize: 15,
        fontStyle: "italic",
        padding: 25,
      },
    };
    return (
      <div>
        <div className="country-cases">
          <Line data={this.props.chartProps} options={datasetsOptions} redraw />
        </div>
      </div>
    );
  }
}

export default ChartLine;

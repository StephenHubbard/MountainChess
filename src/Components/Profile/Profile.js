import React, { Component } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
import { Line } from "react-chartjs-2";
import "./Profile.css";
//import redux functions

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      profile_img: "",
      //this will be the placeholder empty data state object to be filled by a database call
    //   data: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: `Value ($USD)`,
    //         data: [],
    //         borderColor: ["rgb(106, 226, 160)"]
    //       }
    //     ]
    //   }
      data: {
        labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        datasets: [
          {
            data: [889, 830, 799, 899, 943, 1003, 1377, 1421, 1855, 2478],
            label: "DUMMY ELO DATA",
            borderColor: "#38738f",
            fill: false
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="profile">
          <h1> Your Profile </h1>
        <div className="chart">
          <div className="chart-row">
            <Line
              data={this.state.data}
              options={{
                maintainAspectRatio: true,
                title: {
                  display: true,
                  text: `Expected value over the next 5 years`
                },
                scales: {
                  yAxes: [
                    {
                      ticks: { beginAtZero: false }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

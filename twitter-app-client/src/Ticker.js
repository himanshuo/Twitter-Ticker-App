import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import io from 'socket.io-client';
const socket = io('http://34.195.213.56:3001/');
import './container.css';



class Ticker extends Component {
  constructor(props) {
   super();
   this.ticker = props.ticker;
   socket.emit('register', this.ticker);
 }
  render() {
    return (
      <div id={this.ticker}></div>
    );
  }

  componentDidMount() {
    return (
      this.renderChart()
    )
  }

  renderChart() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Create the chart
    Highcharts.stockChart(this.ticker, {
        chart: {
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    socket.on('count', function(msg){
                      var curTime = (new Date()).getTime(); // current time
                      series.addPoint([curTime, msg], true, false);
                    });
                }
            }
        },

        title: {
            text: this.ticker
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: this.ticker,
            data: []
        }]
    });
  }



}

export default Ticker;

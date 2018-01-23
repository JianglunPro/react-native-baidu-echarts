import React, { Component } from 'react';
import { View, WebView, Platform } from 'react-native';

const echart_html = require('./echarts.html');


export default class Echarts extends Component {

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.webview.reload()
    }
  }

  render() {
    return (
      <View style={[this.props.style, { flexDirection: 'column' }]}>
        <WebView
          ref={ref => this.webview = ref}
          style={{ flex: 1 }}
          source={echart_html}
          injectedJavaScript={renderChart(this.props)}
          scrollEnabled={false}
          bounces={false}
        />
      </View>
    );
  }
}

function renderChart(props) {
  return `
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
  `;
}

function toString(obj) {
  return JSON.stringify(obj);
}

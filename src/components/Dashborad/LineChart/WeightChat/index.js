import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class WeightChat extends Component {

    setOption = () => {
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                axisLine: {
                    lineStyle: {
                        color: "#999"
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                splitNumber: 4,
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    },
                },
                nameTextStyle: {
                    color: "#999"
                },
                splitArea: {
                    show: false
                }
            }],
            series: [{
                name: '整体估重',
                type: 'line',
                data: [3100, 3500, 4100, 4300, 4700, 5100, 5700, 6000, 6200, 6600 ],
                lineStyle: {
                    normal: {
                        width: 8,
                        color: {
                            type: 'linear',

                            colorStops: [{
                                offset: 0,
                                color: '#A9F387' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#48D8BF' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(72,216,191, 0.3)',
                        shadowBlur: 10,
                        shadowOffsetY: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff',
                        borderWidth: 10,
                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                        shadowBlur: 100,*/
                        borderColor: "#A9F387"
                    }
                },
                smooth: true
            }]
        };
        return option;
    }

    render() {
        return (
            <div>
                <ReactEcharts option={this.setOption()} />
            </div>
        )
    }
}

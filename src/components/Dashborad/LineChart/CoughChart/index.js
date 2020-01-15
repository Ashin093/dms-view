import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

export default class CoughChart extends Component {

    setOption = () => {
        let option = {
            fontFamily: 'Roboto',
            name: '咳喘次数',
            backgroundColor: new echarts.graphic.LinearGradient(1, 1, 1, 0, [{
                offset: 0,
                color: 'rgba(130,215,243, 0.1)'
            }]),
            title: {
                text: '79次', //最近一次数据
                subtext: '咳喘次数',
                textStyle: {
                    fontWeight: 'bolder',
                    fontSize: 48,
                    color: '#0099ff',
                },
                subtextStyle: {
                    fontWeight: 'bolder',
                    fontSize: 24,
                    color: '#0099ff',
                },
                right: '0%',
                top: '0%'
            },
            grid: {
                left: '1%',
                right: '5%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
                axisLabel: {
                    show: true,
                    interval: 0,
                    fontSize: 10,
                    color: '#A2A2A2',
                    // fontWeight: 'bold'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
            }],
            yAxis: [{
                show: false,
                min: 72, //最低为临近BMI线减3
                max: 90, //最高为临近BMI线加3或最高值加3
            }],
            series: [{
                name: '次数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                showSymbol: true,
                lineStyle: {
                    normal: {
                        width: 5,
                        color: '#0099ff',
                        shadowBlur: 6,
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowOffsetY: 8,
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [{
                            offset: 0,
                            color: 'rgba(58,191,238, 1)'
                        }, {
                            offset: 1,
                            color: 'rgba(58,191,238, 0.3)'
                        }]),
                    },
                    opacity:0
                },
                itemStyle: {
                    normal: {
                        color: '#0099ff',
                        borderColor: 'green',
                        borderWidth: 10,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: '#0099ff',
                        fontSize: 24,
                    },
                },
                markLine: {
                    lineStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0.3)',
                        },
                    },
                    data: [{
                        name: '峰值 90次',
                        label: {
                            normal: {
                                formatter: '峰值 90次',
                                position: 'middle',
                                fontSize: 18,
                            }
                        },
                        yAxis: 90, //体质指数（BMI32）=体重（kg）÷身高^2（m）
                    }, {
                        name: '均值 82.4次',
                        label: {
                            normal: {
                                formatter: '均值 82.4次',
                                position: 'middle',
                                fontSize: 18,
                            }
                        },
                        yAxis: 82.4,
                    }]
                },
                data: [87, 82, 80, 90, 88, 83, 79, 87, 86, 81, 77, 89, 81, 83, 79]
            },]
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

import React, { Component } from 'react'
import { Radio, Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import { WaterWave } from 'ant-design-pro/lib/Charts';


export default class GaugeCard extends Component {

    state = { type: "0" ,unit:'ppm',title:'CO2',value:45};
    setOption = data => {
        let option = {
            // backgroundColor: "#062a44",
            series: [{
                type: 'gauge',
                radius: '70%',
                min: 0, //最小刻度
                max: 100, //最大刻度
                splitNumber: 10, //刻度数量
                startAngle: '269.99',
                endAngle: '-90',
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: [
                            [0.2, '#78B5F3'],
                            [1, '#3C8FF4']
                        ]
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#fff',
                    distance: -35,
                    fontSize: 15
                }, //刻度标签。
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    lineStyle: {
                        color: '#3C8FF4', //用颜色渐变函数不起作用
                        width: 1,
                    },
                    length: 10
                }, //刻度样式
                splitLine: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: '#3C8FF4', //用颜色渐变函数不起作用
                    }
                }, //分隔线样式
                itemStyle: {
                    normal: {
                        show: false
                    }
                },
                pointer: {
                    show: true,
                    length: '60%',
                    width: 7, //指针粗细
                },
                z: 12,
                "detail": {
                    "formatter": function (value) {
                        // if (value !== 0) {
                        //     var num = Math.round(value);
                        //     return  parseInt(num).toFixed(0) + "%";
                        // } else {
                        //     return 0;
                        // }
                        var num = Math.round(value);
                        return parseInt(num).toFixed(0) + data.unit;
                    },
                    "offsetCenter": ['0%','65%'],
                    "textStyle": {
                        padding: [0, 0, 80, 0],
                        "fontSize": 20,
                        fontWeight: '700',
                        "color": '#FBA51C'
                    }
                },
                "title": {
                    color: 'black',
                    "fontSize": 14,
                    //"offsetCenter": ['-20%', "30%"]
                },
                "data": [{
                    "name": data.title,
                    "value": data.value,
                }],
            },
            {
                title: {
                    show: false
                },
                type: "gauge",
                radius: '100%',
                splitNumber: 10,
                startAngle: '269.99',
                endAngle: '-90',
                z: 11,
                "axisLine": {
                    "lineStyle": {
                        "color": [
                            [data.value / 100, "#3C8FF4"],
                            [1, "#FBDB5A"]
                        ],
                        "width": 15,
                        borderWidth: 5,
                        borderColor: 'red'
                    }
                },
                axisLabel: {
                    show: false,
                },
                "axisTick": {
                    show: false,

                },
                "splitLine": {
                    "show": false,
                },
                pointer: {
                    show: false
                },
                detail: {
                    show: false
                },
            },
            {
                name: 'pie',
                type: 'pie',
                clockWise: true,
                startAngle: -270,
                radius: ['70%', '93%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                data: ['100'],
                z: 1,
                labelLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: '#3C8FF4',
                    }
                }
            },
            ]
        };
        return option;
    }

    onChange = e => {
        let type = e.target.value;
        this.setState({
            type
        })
    }

    renderGauge = type => {
        //type值 0-3分别代表 
        //0:温度
        //1:湿度
        //2:二氧化碳
        //3:氨气
        let component;
        let data;
        switch (type) {
            case "0":
                data = {
                    title: '温度',
                    unit: '°C',
                    value: 27
                }
                component = <ReactEcharts option={this.setOption(data)}></ReactEcharts>;
                break;
            case "1":
                data = {
                    title: '湿度',
                    unit: '%',
                    value: 45
                }
                // component = <ReactEcharts option={this.setOption(data)}></ReactEcharts>;
                component = <WaterWave
                    height={300}
                    title={data.title}
                    percent={data.value}
                />
                break;
            case "2":
                data = {
                    title: 'CO2',
                    unit: 'ppm',
                    value: 45
                }
                component = <ReactEcharts option={this.setOption(data)}></ReactEcharts>;
                break;
            case "3":
                data = {
                    title: 'NH3',
                    unit: 'ppm',
                    value: 10
                }
                component = <ReactEcharts option={this.setOption(data)}></ReactEcharts>;
                break;
            default:
                break;
        }
        return component;
    }

    render() {
        return (
            <Card
                title={"环控数据"}
                extra={
                    <Radio.Group defaultValue={this.state.type} buttonStyle={"solid"} onChange={this.onChange}>
                        <Radio.Button value="0">温度</Radio.Button>
                        <Radio.Button value="1">湿度</Radio.Button>
                        <Radio.Button value="2">二氧化碳</Radio.Button>
                        <Radio.Button value="3">氨气</Radio.Button>
                    </Radio.Group>
                }
            >
                <div style={{ textAlign: 'center' }}>
                    {this.renderGauge(this.state.type)}
                </div>
                
            </Card>
        )
    }
}

import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import './index.less';
import utils from "../../../utils/utils";
import schedule from 'node-schedule';
// import settings from './../../../config/settings';
let settings = require('./../../../config/settings');
let Moment = require('moment');
let _ = require('lodash');
export default class WeightRiseLineChart extends Component {


    constructor(props){
        super(props);
        let birthDate = settings.default.chartData.birthDay;
        let diff = Moment().diff(birthDate,'week') + 4;//当前时间距离猪只进舍的周数
        let tempWeightArr = _.dropRight(settings.default.chartData.standard_weight_fff,settings.default.chartData.standard_weight_fff.length-diff);

        //计算横轴周坐标
        let weekcount = 26;
        let xAxis = [];
        for(let i = 1 ; i < weekcount+1; i ++){
            xAxis.push(i+'周');
        }

        this.state={
            m_data : settings.default.chartData.standard_weight_mmm.map((item)=>{
                return (item+settings.default.chartData.weightRiseOffset)*settings.default.chartData.pigCount
            }),
            f_data: tempWeightArr.map((item)=>{
                return ((item+settings.default.chartData.weightRiseOffset)*settings.default.chartData.pigCount).toFixed(1)
            }),
            s_data: settings.default.chartData.standard_weight.map((item)=>{
                return (item+settings.default.chartData.weightRiseOffset)*settings.default.chartData.pigCount
            }),
            xAxis:xAxis
        };

    }

    componentDidMount() {



        this.clacEchart();

        schedule.scheduleJob('1 0 0 * * 1', () =>{//每周一0点1秒开始执行

            this.clacEchart();
        });

    }


    //定义绘制echart方法
    clacEchart = ()=> {
        let expression = settings.default.chartData.weightRiseCalc;
        let α = settings.default.chartData.weightRiseParam.α;
        let K = settings.default.chartData.weightRiseParam.K;
        let r = settings.default.chartData.weightRiseParam.r;

        // t+=settings.default.chartData.weightBeforeFeed;
        let beginDay = settings.default.chartData.weightBeforeFeed;

        let weightArr_s = [];
        for(let i = 1 ; i < this.state.xAxis.length+1; i++){
            let t = beginDay + i * 7;
            let weight_t = expression(K,α,r,t).toFixed(2) * settings.default.chartData.pigCount;
            weightArr_s.push(weight_t);
        }
        this.setState({
            s_data:weightArr_s.map((item)=>{
                return item.toFixed(1)
            })
        })

        //模拟实际数据
        let α_offset = α + utils.randomCoefficient(settings.default.chartData.weightRiseParamOffset.α);
        let K_offset = K + utils.randomCoefficient(settings.default.chartData.weightRiseParamOffset.K);
        let r_offset = r + utils.randomCoefficient(settings.default.chartData.weightRiseParamOffset.r);

        //获取系统运行至今天的天数
        let dayDiff = utils.getDateDiff(new Date(settings.default.chartData.birthDay)) ;
        // dayDiff += settings.default.chartData.weightBeforeFeed;
        let weight_f = [];
        for(let i = 1 ; i < dayDiff+1 ; i++){
            let tempDay = i + beginDay;
            let res = expression(K_offset,α_offset,r_offset,tempDay);
            weight_f.push((res*settings.default.chartData.pigCount).toFixed(2));
        }
        console.log(weight_f);

        //计算当前时间是第几周
        let countFlag = 1;
        let sumFlag = 0;
        let avgArr = [];
        weight_f.forEach((item)=>{
            sumFlag+=Number(item);
            countFlag+=1;
            if(countFlag%7===0){
                avgArr.push((sumFlag/7).toFixed(1));
                sumFlag = 0;
            }
        });
        this.setState({
            f_data:avgArr
        })
    }

    setOption=()=>{
        let option= {
            tooltip:{
                trigger:'axis'
            },
            title: {
                text: '整体估重',
                textStyle: {
                    color:'white'
                },
                left: '55px',
            },
            textStyle:{
                color: '#B6C6F9',
                fontStyle:'normal',
                fontWeight:'bolder'
            },
            legend: {
                data:['实际体重','标准体重'],
                textStyle: {
                    color:'#B6C6F9'
                }

            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.xAxis,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '体重',
                    axisLabel: {
                        formatter: '{value} kg'
                    }
                }
            ],
            series: [
                {
                    name:'实际体重',
                    type:'bar',
                    data:this.state.f_data
                },
                {
                    name:'标准体重',
                    type:'line',

                    data:this.state.s_data
                }
            ]
        };
        return option;

    };

    render() {
        return (
            <div className={"weight_container"}>
                <ReactEcharts option={this.setOption()}/>
            </div>
        );
    }
}

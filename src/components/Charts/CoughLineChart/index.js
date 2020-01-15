/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import echarts from 'echarts';
import util from './../../../utils/utils';
import settings from './../../../config/settings';
// import axios from './../../../utils/axiosUtil';
import Moment from 'moment';
import schedule from 'node-schedule';
import './index.less';
import axios from './../../../utils/axiosUtil';

let sourceUrl = 'http://'+settings.dataSource.ip+':'+settings.dataSource.port+'/parse/classes';
let calcObject  = {};

export default class CoughLineChart extends Component {

    constructor(props){
       super(props);
        let date = [];

        let data = [];

        for (let i = 1; i < 15; i++) {
            date.push(util.dateAdd(-i));
            calcObject[util.dateAdd(-i)] = [];
        }

        for (let j = 1 ; j < 100 ; j++){
            data.push(Math.floor(Math.random()*(99-0)+0));
        }

        this.state={
            date : _.reverse(date),
            data: data
        };
    }

    componentDidMount() {
        // return;
        let beginDate = util.dateAdd(-settings.chartData.cough_days);
        //将时间格式转换为iso格式，并将时分秒置为0
        beginDate = util.dateTimeMake0_iso(beginDate);
        axios.get(sourceUrl+'/CoughRecord',{
            where:'{"pigHouse":{"__type":"Pointer","className":"PigHouse","objectId":"'+ settings.pigHouseKey +'"},"count":{"$gt":0},"startTime":{"$gt":{"__type":"Date","iso":"'+ beginDate +'"}}}',
            limit: 6720//咳嗽数据3分钟采集一次，14天数据为：20*24*14=6720
        }).then(res=>{
            console.log(this.state.date);
            console.log(res);


            for(let i = 0 ; i < res.data.results.length; i++){
                let dataObj = res.data.results[i];
                let timeKey = Moment(dataObj.startTime.iso).format('YYYY-MM-DD');
                if (calcObject[timeKey] instanceof Array){
                    calcObject[timeKey].push(dataObj.count);
                }
            }
            console.log(calcObject);

            let newEchartData = [];
            for(let j in this.state.date){
                newEchartData.push(util.arraySum(calcObject[this.state.date[j]]));
            }
            this.setState({
                data:newEchartData
            })
        });



        schedule.scheduleJob('0 0 0 * * ?',()=>{
            axios.get(sourceUrl+'/CoughRecord',{
                where:'{"pigHouse":{"__type":"Pointer","className":"PigHouse","objectId":"'+ settings.pigHouseKey +'"},"count":{"$gt":0},"startTime":{"$gt":{"__type":"Date","iso":"'+ beginDate +'"}}}',
                limit: 6720//咳嗽数据3分钟采集一次，14天数据为：20*24*14=6720
            }).then(res=>{
                console.log(this.state.date);
                console.log(res);


                for(let i = 0 ; i < res.data.results.length; i++){
                    let dataObj = res.data.results[i];
                    let timeKey = Moment(dataObj.startTime.iso).format('YYYY-MM-DD');
                    if (calcObject[timeKey] instanceof Array){
                        calcObject[timeKey].push(dataObj.count);
                    }
                }
                console.log(calcObject);

                let newEchartData = [];
                for(let j in this.state.date){
                    newEchartData.push(util.arraySum(calcObject[this.state.date[j]]));
                }
                this.setState({
                    data:newEchartData
                })
            });
            }
        )
    }



    setOption=()=>{
        let option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: '55px',
                top:'15px',
                text: '咳喘指数',
                textStyle: {
                    color:'white'
                },
            },
            textStyle:{
                color: '#B6C6F9',
                fontStyle:'normal',
                fontWeight:'bolder'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.date
            },
            yAxis: {
                type: 'value',
                // boundaryGap: [0, '100%']
            },
            series: [
                {
                    name:'咳喘指数',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 70, 131)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 158, 68)'
                        }])
                    },
                    data: this.state.data
                }
            ]
        };

        return option;
    };

    render() {
        return (
            <div className={"cough_container"}>
                <ReactEcharts option={this.setOption()}/>
            </div>
        );
    }
}


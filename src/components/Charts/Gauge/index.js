import React, {Component} from 'react';
// import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
// import _ from 'lodash';
import settings from './../../../config/settings';
// import axios from 'axios';
import {Col, Row} from "antd";
import axios from './../../../utils/axiosUtil';

const sourceUrl = 'http://'+settings.dataSource.ip+':'+settings.dataSource.port+'/parse/classes';
// eslint-disable-next-line no-unused-vars
const deviceId = '';
// eslint-disable-next-line no-unused-vars
const CO2Key = '';
const NH3Key = '';
const TAHKey = '';


export default class Gauge extends Component {

    constructor(props) {
        super(props);
        this.state = {humidity:30,max:5,min:-5,timer:null,range:[1,-1],temperature:30,ammonia:10,tempTimer:null,ammTimer:null};
    }


    componentDidMount() {
        // this.state.timer = setInterval(()=>{
        //     if(this.state.humidity>50) this.setState({humidity:50});
        //     if(this.state.humidity<30) this.setState({humidity:30});
        //     this.setState({range:_.shuffle(this.state.range)});
        //     this.setState({humidity:this.state.humidity+this.state.range[0]});
        //
        // },3000)
        //
        // this.state.tempTimer = setInterval(()=>{
        //     if(this.state.temperature>33) this.setState({temperature:33});
        //     if(this.state.temperature<27) this.setState({temperature:27});
        //     this.setState({range:_.shuffle(this.state.range)});
        //     this.setState({temperature:this.state.temperature+this.state.range[0]});
        //     if(this.state.temperature>33) this.setState({temperature:33});
        //     if(this.state.temperature<27) this.setState({temperature:27});
        // },10000)
        //
        // this.state.ammTimer = setInterval(()=>{
        //     this.setState({range:_.shuffle(this.state.range)});
        //     this.setState({ammonia:this.state.ammonia+this.state.range[0]});
        //     if(this.state.ammonia>20) this.setState({ammonia:20});
        //     if(this.state.ammonia<5) this.setState({ammonia:5});
        //
        // },20000)
        // return;
        //组件初始化时，通过猪舍id查询当前所需设备id
        async function initKeys() {


            await axios.get(sourceUrl+'/CO2',{
                where:'{"device":{"__type":"Pointer","className":"Device","objectId":"'+ settings.deviceKey +'"}}'
            }).then(res=>{
                console.log(res.data.results[0].objectId);
                this.CO2Key = res.data.results[0].objectId;
            });
            await axios.get(sourceUrl+'/NH3',{
                where:'{"device":{"__type":"Pointer","className":"Device","objectId":"'+ settings.deviceKey +'"}}'
            }).then(res=>{
                console.log(res.data.results[0].objectId);
                this.NH3Key = res.data.results[0].objectId;
            });
            await axios.get(sourceUrl+'/TempAndHumidity',{
                where:'{"device":{"__type":"Pointer","className":"Device","objectId":"'+ settings.deviceKey +'"}}'
            }).then(res=>{
                console.log(res.data.results[0].objectId);
                this.TAHKey = res.data.results[0].objectId;
            });

        }

        initKeys().then(()=>{

            // console.log('deviceId',deviceId);
            // console.log('CO2Key',CO2Key);
            // console.log('NH3Key',NH3Key);
            // console.log('TAHKey',TAHKey);
            this.setState({
                tempTimer: setInterval(() => {
                    // if(this.state.temperature>30) this.setState({temperature:30});
                    // if(this.state.temperature<18) this.setState({temperature:18});
                    // this.setState({range:_.shuffle(this.state.range)});
                    // this.setState({temperature:this.state.temperature+this.state.range[0]});
                    axios.get('http://' + settings.dataSource.ip + ':' + settings.dataSource.port + '/parse/classes/TempAndHumidityRecord', {
                        limit: '1',
                        order: '-createdAt',
                        where: '{"TempAndHumidity":{"__type":"Pointer","className":"TempAndHumidity","objectId":"' + TAHKey + '"}}'
                    }).then(res => {
                        // console.log(res);
                        let result = res.data.results[0];
                        // console.log(result);
                        this.setState({
                            temperature: parseInt(result['temp']),
                            humidity: parseInt(result['humidity'])
                        });
                    })
                }, 10000),
                ammTimer: setInterval(() => {
                    axios.get('http://' + settings.dataSource.ip + ':' + settings.dataSource.port + '/parse/classes/NH3Record', {
                        limit: '1',
                        order: '-createdAt',
                        where: '{"nh3":{"__type":"Pointer","className":"NH3","objectId":"' + NH3Key + '"}}'
                    }).then(res => {
                        // console.log(res);
                        let result = res.data.results[0];
                        // console.log(result);
                        this.setState({
                            ammonia: parseInt(result['ppm'])
                        })
                        // this.state.ammTimer = result.ppm;
                    })
                }, 20000)
            })

        }).catch(err=>{
            console.log(err);
        });

    }

    componentWillUnmount() {
        // clearInterval(this.state.timer);
        clearInterval(this.state.tempTimer);
        clearInterval(this.state.ammTimer);
    }


    getOption1=()=>{
        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    title:{
                        show:true,
                        fontSize:18,
                        color:'#ccc'
                    },
                    axisLabel:{//刻度值得样式
                        fontWeight:'bold',
                        fontSize: 16
                    },
                    name: '湿度',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data:[{value:this.state.humidity,name:'湿度'}],
                    radius:'95%',//仪表盘半径
                    axisLine:{
                        lineStyle:{
                            color:[[0.6, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']],
                            width:10
                        }
                    },
                    splitLine:{
                        length:20
                    }
                }
            ]
        }
    };

    getOption2=()=>{
        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    title:{
                        show:true,
                        fontSize:18,
                        color:'#ccc'
                    },
                    axisLabel:{//刻度值得样式
                        fontWeight:'bold',
                        fontSize: 16
                    },
                    name: '温度',
                    type: 'gauge',
                    detail: {formatter:'{value}℃'},
                    data:[{value:this.state.temperature,name:'温度'}],
                    radius:'95%',//仪表盘半径
                    axisLine:{
                        lineStyle:{
                            color:[[0.5, '#c23531'] ,[0.6,'#63869e'], [0.8, '#91c7ae'], [1, '#c23531']],
                            width:10
                        }
                    },
                    splitLine:{
                        length:20
                    },
                    min:-50,
                    max:50
                }
            ]
        }
    };

    getOption3=()=>{
        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}ppm"
            },
            series: [
                {
                    title:{
                        show:true,
                        fontSize:15,
                        color:'#ccc'
                    },
                    axisLabel:{//刻度值得样式
                        fontWeight:'bold',
                        fontSize: 16
                    },
                    name: '氨气',
                    type: 'gauge',
                    detail: {formatter:'{value}'},
                    data:[{value:this.state.ammonia,name:'氨气(mg/m3)'}],
                    radius:'95%',//仪表盘半径
                    axisLine:{
                        lineStyle:{
                            color:[[0.2, '#91c7ae'], [0.3, '#63869e'], [1, '#c23531']],
                            width:10
                        }
                    },
                    splitLine:{
                        length:20
                    }
                }
            ]
        }
    };

    render() {
        return (
            <div style={{paddingLeft:'10px'}}>
                <Row>
                    <Col span={8}><ReactEcharts option={this.getOption1()} style={{height:'260px',width:'260px'}}/></Col>
                    <Col span={8}><ReactEcharts option={this.getOption2()} style={{height:'260px',width:'260px'}}/></Col>
                    <Col span={8}><ReactEcharts option={this.getOption3()} style={{height:'260px',width:'260px'}}/></Col>
                </Row>
            </div>
        );
    }
}


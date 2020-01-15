import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts/lib/echarts';
import './index.less';
import _ from 'lodash';
import settings from './../../../config/settings';
import util from './../../../utils/utils';
import axios from "../../../utils/axiosUtil";
import Moment from "moment";
import schedule from 'node-schedule';
let sportKey = '';
let echartData = [];

export default class LineChart extends Component {

    constructor(props){
        super(props);
        const xArr = [];//坐标轴，保存0点到23点坐标轴信息
        const motion = settings.chartData.motion;//对应坐标轴数组，保存对应时间的标准数据
        for(let i = 0 ; i < 24 ; i++){
            xArr.push(i);
        }

        this.state = {
            xAxis:xArr.map((item)=>{
                if(item<10){
                    return '0' + item + ':00';
                }else{
                    return item + ':00';
                }
            }),
            data:motion,
            data2:motion.map((item)=>{

                let result = item + this.motionDataFactory();
                return result < 0 ? 0 : result;
                // return item + this.motionDataFactory()
            }),
            data3:_.dropRight(motion.map((item)=>{
                let result = item + this.motionDataFactory();
                return result < 0 ? 0 : result;
            }),24-(new Date().getHours()+1)),
        };
        // console.log(this.state);
    }

    componentDidMount() {
        // return;
        let sourceUrl = 'http://'+settings.dataSource.ip+':'+settings.dataSource.port+'/parse/classes';
        let beginTime = util.dateAdd(-2);
        for(let i = 0 ; i < 3; i ++){
            echartData[i] = [];
        }
        //组件初始化时，通过猪舍id查询当前所需设备id
        async function initKeys() {

            await axios.get(sourceUrl+'/SportDetec',{
                where:'{"device":{"__type":"Pointer","className":"Device","objectId":"'+ settings.deviceKey +'"}}'
            }).then(res=>{
                console.log(res.data.results[0].objectId);
                sportKey = res.data.results[0].objectId;
            });
        }

        initKeys().then(()=>{
            let getData =  () =>{
                axios.get(sourceUrl+'/SportRecord',{
                    limit:5000,
                    where:'{"detecTime":{"$gt":{"__type":"Date","iso":"'+ beginTime +'"}},"sportDetec":{"__type":"Pointer","className":"SportDetec","objectId":"'+ sportKey +'"}}'
                }).then(res=>{
                    console.log('========',res);
                    let result = res.data.results;
                    result.forEach((item)=>{
                        let time = Moment(item.detecTime.iso,'YYYY-MM-DD').format('YYYY-MM-DD');//这里注意一定要先转为日期字符串再格式化，否则会出现格式化日期不是预期值得问题
                        if(echartData[util.getDateDiff(time)] instanceof Array){
                            echartData[util.getDateDiff(time)].push(item);
                        }
                    });
                    console.log(echartData);
                    //注释代码为测试分组结果用例
                    // let jintian = new Set();
                    //
                    // echartData.forEach((days)=>{
                    //     days.forEach(data=>{
                    //         jintian.add(Moment(data.detecTime.iso,'YYYY-MM-DD').format('YYYY-MM-DD'));
                    //
                    //     })
                    // })
                    // console.log('jintian==',jintian)

                    // echartData.forEach((dateArr)=>{
                    //     dateArr.forEach((data)=>{
                    //         console.log(Moment(data.detecTime.iso,'YYYY-MM-DD HH:mm:ss').hours());
                    //     })
                    // });

                    // echartData.forEach(item=>{
                    //     this.setState({data3:util.sportDataFormat(item)})
                    //     return;
                    // })

                    for(let eIndex=0;eIndex<echartData.length ;eIndex++){
                        let temp = util.sportDataFormat(echartData[eIndex]);
                        if(eIndex===0){
                            this.setState({
                                data3:temp
                            });
                        }else if(eIndex===1){
                            this.setState({
                                data2:temp
                            });
                        }else{
                            this.setState({
                                data:temp
                            })
                        }

                    }
                });
            }

            getData();

            schedule.scheduleJob('0 0 * * * ? *',function () {
                getData();
            });

        }).catch(err=>{
            console.log(err);
        });
    }



    getOption=()=>{
        let option = {
            title: {
                text: '平均运动量',
                textStyle: {
                    color:'white'
                },
                left: '55px',
                top:'15px'
            },
            textStyle:{
                color: '#B6C6F9',
                fontStyle:'normal',
                fontWeight:'bolder'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#B6C6F9'
                    }
                }
            },
            color:['red','#FFCCFF','#FFFF99'],
            legend: {
                data:['前天','昨天','今天'],
                textStyle:{
                    color:'#B6C6F9'
                },
                left:'15%',
                top:'7%',

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // lineStyle:{
            //     width:1000000,
            //     type:'dotted',//solid dashed dotted
            //
            // },
            // smooth:true,//如果是 boolean 类型，则表示是否开启平滑处理。如果是 number 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 true 时相当于设为 0.5。
            // smoothMonotone:'x',
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : this.state.xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            markArea:{
                label:{
                    show:true,
                    position: [10,10],
                }
            },
            series : [
                {
                    name:'前天',
                    type:'line',
                    smooth:0.3,
                    symbol:'rect',
                    data:this.state.data,
                    lineStyle:{
                        color:'red'
                    }
                },{
                    name:'昨天',
                    type:'line',
                    smooth:0.3,
                    symbol:'rect',
                    data:this.state.data2,
                    lineStyle:{
                        color:'#FFCCFF',
                    }
                    // areaStyle:{}
                },{
                    name:'今天',
                    type:'line',
                    smooth:0.3,
                    symbol:'rect',
                    data:this.state.data3,
                    // data:[10,15,8,7,10,20,15,19,17,10,9,7,8,7,9,10,15,11],
                    // areaStyle:{}
                    areaStyle:{
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0, color: '#333366' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#333366' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        opacity:0.8,
                        origin:'end',
                    },
                    lineStyle:{
                        color:'#FFFF99',
                        width: 3
                    }
                }
            ]
        };
        return option;
    };

    motionDataFactory=()=>{ //根据偏差值生成新的随机数组
        let tempLength = settings.chartData.motion_offset.max - settings.chartData.motion_offset.min;
        return parseInt(Math.random() * (tempLength+1) + settings.chartData.motion_offset.min,10);
    };

    render() {
        return (
            <div>
                <ReactEcharts option={this.getOption()} style={{height:'30vh'}}/>
            </div>
        );
    }
}

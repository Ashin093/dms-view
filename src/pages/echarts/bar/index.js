import React, {Component} from 'react';
import {Row,Col} from 'antd';
// import echarts from 'echarts';
//按需加载
import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/legend';
import echartTheme from '../../../config/echartTheme';
// import ReactEcharts from 'echarts-for-react';
import './index.less';
import Gauge from "../../../components/Charts/Gauge";
import LabelChart from "./../../../components/Charts/LabelChart";
import Video from "../../../components/Video";
import LineChart from "../../../components/Charts/LineChart";
import LabelDetail from "../../../components/Charts/LabelDetail";
import CoughLineChart from "../../../components/Charts/CoughLineChart";
import WeightRiseLineChart from "../../../components/Charts/WeightRiseLineChart";

export default class Bar extends Component {

    componentWillMount() {
        echarts.registerTheme('theme',echartTheme);
    }



    getOption = () =>{
       let option = {
           title:{
               text:'demo'
           },
           tooltip:{
             trigger:'axis'
           },
           xAxis:{
               data:['周一','周二','周三','周四','周五','周六','周日']
           },
           yAxis:{
               type:'value'
           },
           series:[
               {
                   name:'count',
                   type:'bar',
                   data:[1000,2000,1500,3000,2000,1200,2500]
               },{
                    name:'count1',
                   type:'bar',
                   data:[2000,3888,4888,2999,1999,3388,1000]
               }
           ]
       }
       return option;
    }

    render() {
        return (
            <div className={"container_"}>
                <Row className={"header_chart"}>
                    <Col span={24} className={'header_content'}>智慧养殖数据分析平台</Col>
                </Row>
                <Row style={{height:'calc(82vh)'}}>
                    <Col span={16}>
                        <Row>
                            <Col span={10}><LabelChart/></Col>
                            <Col span={14}><Gauge/></Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <CoughLineChart/>
                            </Col>
                            <Col span={12}>
                                <WeightRiseLineChart/>
                            </Col>
                        </Row>
                        <Row><LineChart/></Row>
                    </Col>
                    <Col span={8}>
                        <Row><LabelDetail/></Row>
                        <Row><Video/></Row>
                    </Col>
                </Row>
                <Row className={'footer_chart'} style={{height:'calc(8vh)'}}>
                    <Col span={24} ></Col>
                </Row>
            </div>
        );
    }
}

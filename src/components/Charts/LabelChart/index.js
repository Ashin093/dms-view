import React, {Component} from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd';
import './index.less';
import util from './../../../utils/utils';
import settings from './../../../config/settings';
import moment from 'moment';
import utils from "../../../utils/utils";
import _ from 'lodash';
export default class LabelChart extends Component {
    constructor(props){
        super(props);
        let weightArr = settings.chartData.standard_weight_fff;
        let birthDay = settings.chartData.birthDay;
        let weekDiff = moment().diff(birthDay,'week');
        if(weekDiff>weightArr.length){
            let last = weightArr[weightArr.length-1];
            let offset = [5.10,5.20,6.10,6.20,6.50,7.00];
            let forindex = weekDiff-weightArr.length;
            for(let i = 0 ; i < forindex ; i ++){
                last+=_.shuffle(offset)[0];
                weightArr.push(last);
            }
        }
        let eachPigW = weightArr[weekDiff-1];
        console.log('当前单只猪重量为：',eachPigW);
        let riseOffset;
        if(weekDiff>weightArr.length){
            riseOffset = weightArr[weightArr.length];
        }else{
            riseOffset = weightArr[weekDiff];
        }

        this.state = {
            days : 0,
            timer: null,
            nowTime : util.formatDate(new Date()),
            pigWeight:eachPigW.toFixed(1),
            pigCount:settings.chartData.pigCount,
            weightRise:(riseOffset-eachPigW)/7
        }

    }

    componentDidMount() {

        this.setState({
            timer: setInterval(() => {
                let now = new Date();
                this.setState({ nowTime: util.formatDate(now) });
                this.setState({ days: util.getDateDiffDetail(settings.chartData.birthDay) });
            }, 1000)
        })

        let expression = settings.chartData.weightRiseCalc;
        let α = settings.chartData.weightRiseParam.α;
        let K = settings.chartData.weightRiseParam.K;
        let r = settings.chartData.weightRiseParam.r;
        let t = utils.getDateDiff(settings.chartData.birthDay);
        t+=settings.chartData.weightBeforeFeed;
        let nowWeight = 0;
        nowWeight = expression(K,α,r,t);
        let lastDayWg = expression(K,α,r,t-1);

        // console.log('第'+t+'天的重量为：'+nowWeight.toFixed(1));
        // console.log(nowWeight.toFixed(2)*30);
        // console.log((nowWeight-lastDayWg).toFixed(2)*settings.chartData.pigCount);
        this.setState({
            pigWeight:(nowWeight.toFixed(2)*settings.chartData.pigCount).toFixed(2),
            weightRise:(nowWeight-lastDayWg).toFixed(2)*settings.chartData.pigCount
        });


    }

    render() {
        return (
            <div className={"label_content"} >
                <Row gutter={5}>
                    <Col span={12}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false}>
                            <Statistic className={"statistic_"}
                                       title="系统已运行"
                                       value={this.state.days}
                                       valueStyle={{ color: '#E8EF54',fontSize:18 ,paddingLeft:25}}
                            />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false}>
                            <Statistic className={"statistic_"}
                                title={"监测猪只"}
                                value={this.state.pigCount}
                                valueStyle={{color:'#E8EF54',fontSize:18,paddingLeft:25}} suffix={"只"}
                            >
                            </Statistic>
                        </Card>
                    </Col>


                </Row>
                <Row gutter={5}>
                    <Col span={12}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false}>
                            <Statistic className={"statistic_"}
                                title="整体估重"
                                value={this.state.pigWeight}
                                valueStyle={{ color: '#E8EF54',fontSize:38,paddingLeft:25}}
                                suffix="kg"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false}>
                            <Statistic className={"statistic_"}
                                title={"日增重"}
                                value={this.state.weightRise}
                                valueStyle={{color:'#E8EF54',fontSize:38}}
                                precision={2}
                                prefix={<Icon type="rise" />}
                                suffix={"kg"}
                            >
                            </Statistic>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


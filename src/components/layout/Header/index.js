import React, {Component} from 'react';
import {Row,Col} from "antd";
import './index.less';
import Util from '../../../utils/utils';

export default class Header extends Component {
    componentWillMount() {
        this.setState({
            userName : 'admin'
        });
        setInterval(()=>{

           let date = new Date();
           let sysTime = Util.formatDate(date);
           let weekday = Util.getWeekDay(date);
           this.setState({
               sysTime:sysTime,
               weekday:weekday
           })
        },1000);
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="/login">退出</a>
                        {/*<Button type={"primary"} title={"退出"} >退出</Button>*/}
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">星期{this.state.weekday}</span>
                    </Col>
                </Row>
            </div>
        );
    }
}





import React, { Component } from 'react';
import { Col, Row } from 'antd';//antd实际上是个对象，通过{Row}的方式，把Row从antd中解构出来，这是ES6的语法
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from "./components/NavLeft";
import './style/common.less';
// import Home from "./pages/home";
// import Home from "./pages/route_demo/route1/Home";
export default class Admin extends Component {
    render() {
        return (
            <Row className="container">
                {/*左侧导航*/}
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                {/*右侧内容*/}
                <Col span={20} className="main">
                    <Row><Header /></Row>
                    <Row className="content">
                        {/*<Home/>*/}
                        {this.props.children}
                    </Row>
                    <Row><Footer /></Row>
                </Col>
            </Row>
        );
    }
}

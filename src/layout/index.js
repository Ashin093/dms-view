import React, { Component } from 'react';
import { Col, Row } from 'antd';//antd实际上是个对象，通过{Row}的方式，把Row从antd中解构出来，这是ES6的语法
import Message from '../components/layout/Message'
import NavLeft from "./../components/layout/NavLeft";
import './index.less'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import HeaderImg from '../components/layout/HeaderImg';
import { connect } from 'react-redux';
import Help from '../components/layout/Help';
const { Header, Content, Sider } = Layout;

class Layout_ extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div>
                <Layout className={"container"}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={"250px"}>
                        <NavLeft/>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
                            <Row className={"height"}>
                                <Col  span={1} className={"height"}>
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                        style={{ float: 'left' }}
                                    />
                                    {/* <HeaderComponent></HeaderComponent> */}
                                </Col>
                                
                                <Col span={8} offset={14} className={"height"}>
                                    <Row type="flex" justify="end" >
                                        <Col className={"height"}>
                                            <Help/>
                                        </Col>
                                        <Col className={"height"}>
                                            <Message/>
                                        </Col>
                                        <Col className={"height"}>
                                            <HeaderImg/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Header>
                        <Content
                            className={"layout-content"}
                            style={{
                                margin: '5px 5px',
                                padding: 10,
                                // background: '#fff',
                                minHeight: 650,
                            }}
                        >
                            {/* {this.props.menuName} */}
                            {this.props.children}
                        </Content>
                        {/* <Footer>iFLYTEK © Copyright</Footer> */}
                    </Layout>
                </Layout>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        menuName:state.menuName
    }
}
export default connect(mapStateToProps)(Layout_);
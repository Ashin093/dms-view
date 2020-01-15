import React, {Component} from 'react';
import {Card, Row, Col, Icon, Typography} from 'antd';
import './index.less'
// import utils from "../../../utils/utils";
// import settings from './../../../config/settings';
// const data = [
//     'Racing car sprays burning fuel into crowd.①',
//     'Japanese princess to wed commoner.',
//     'Australian walks 100km after outback crash.',
//     'Man charged over missing wedding girl.',
//     'Los Angeles battles huge wildfires.',
// ];
const state_ = {
    normal:{
        text:'',
        icon:'smile',
        color:'#00FF7F'
    },
    warning:{
        text:'',
        icon:'meh',
        color:'red'
    },
    error:{
        text:'',
        icon:'frown',
        color:'grey'
    }
}

const data = [
    {
        content:'摄像头1',
        icon:'instagram',
        state:state_.normal
    },
    {
        content:'摄像头2',
        icon:'instagram',
        state:state_.normal
    },
    {
        content:'麦克风1',
        icon:'sound',
        state:state_.normal
    },
    {
        content:'麦克风2',
        icon:'sound',
        state:state_.normal
    },
    {
        content:'网络信号',
        icon:'wifi',
        state:state_.normal
    },
    {
        content:'环控设备',
        icon:'dashboard',
        state:state_.normal
    }

];

export default class LabelDetail extends Component {

    componentDidMount() {

    }

    render() {
        return (

            <div className={"detail_container"}>

                {/*<div>*/}
                {/*    <List*/}
                {/*        header={<div><Icon type={"thunderbolt"} style={{fontSize:'25px'}} theme={"twoTone"} twoToneColor={"#eb2f96"}/><Typography.Text style={{fontSize:'14px',color:'white'}}>设备监控</Typography.Text></div>}*/}
                {/*        bordered={false}*/}
                {/*        dataSource={data}*/}
                {/*        renderItem={(item) => (*/}
                {/*            <List.Item style={{fontSize:'17px',color:'white',border:'none',paddingRight:'60px'}}>*/}
                {/*                <Icon type={item.icon} style={{fontSize:'22px'}}/> {item.content} <span style={{color:item.state.color,fontSize:'15px',float:'right'}}>{item.state.text}  <Icon type={item.state.icon}  theme="twoTone" twoToneColor={item.state.color} style={{fontSize:'30px'}}></Icon></span>*/}
                {/*            </List.Item>*/}
                {/*        )}*/}
                {/*        itemLayout={'vertical'}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<ul>*/}
                {/*    <li><Icon type={"thunderbolt"} style={{fontSize:'18px'}} theme={"twoTone"} twoToneColor={"#eb2f96"}/><Typography.Text style={{fontSize:'18px',color:'white'}}>设备监控</Typography.Text></li>*/}
                {/*    {*/}
                {/*        data.map(item=>{*/}
                {/*            return(*/}
                {/*                <li>{item.content}<span>{item.state.text}<Icon type={item.state.icon} theme="twoTone" twoToneColor={item.state.color}/></span></li>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</ul>*/}
                {/*<Statistic title={<span><Icon type={"apple"}/>1111</span>}/>*/}
                <Icon type={"thunderbolt"} style={{fontSize:'20px'}} theme={"twoTone"} twoToneColor={"#eb2f96"}/><Typography.Text style={{fontSize:'19px',color:'white',fontFamily:'微软雅黑',fontWeight:'bolder'}}>设备监控</Typography.Text>
                <Row>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[0].icon}/>{data[0].content}</span>}>
                            <span style={{color:data[0].state.color ,fontSize:'25px',paddingLeft:'16px'}}>{data[0].state.text}<Icon type={data[0].state.icon} theme={"twoTone"} twoToneColor={data[0].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[1].icon} />{data[1].content}</span>}>
                            <span style={{color:data[1].state.color,fontSize:'25px',paddingLeft:'16px'}}>{data[1].state.text}<Icon type={data[1].state.icon} theme={"twoTone"} twoToneColor={data[1].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[2].icon}/>{data[2].content}</span>}>
                            <span style={{color:data[2].state.color,fontSize:'25px',paddingLeft:'16px'}}>{data[2].state.text}<Icon type={data[2].state.icon} theme={"twoTone"} twoToneColor={data[2].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[3].icon}/>{data[3].content}</span>}>
                            <span style={{color:data[3].state.color,fontSize:'25px',paddingLeft:'16px'}}>{data[3].state.text}<Icon type={data[3].state.icon} theme={"twoTone"} twoToneColor={data[3].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[4].icon}/>{data[4].content}</span>}>
                            <span style={{color:data[4].state.color,fontSize:'25px',paddingLeft:'16px'}}>{data[4].state.text}<Icon type={data[4].state.icon} theme={"twoTone"} twoToneColor={data[4].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{backgroundColor:"transparent"}} bordered={false} headStyle={{border:"none",color:"white"}} title={<span style={{fontFamily:'微软雅黑',fontWeight:'bolder'}}><Icon type={data[5].icon}/>{data[5].content}</span>}>
                            <span style={{color:data[5].state.color,fontSize:'25px',paddingLeft:'16px'}}>{data[5].state.text}<Icon type={data[5].state.icon} theme={"twoTone"} twoToneColor={data[5].state.color} style={{fontSize:'30px',paddingLeft:'10px'}}/></span>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


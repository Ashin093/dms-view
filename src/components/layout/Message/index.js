import React, { Component } from 'react'
import { Tabs, List, Avatar, Badge , Dropdown  , Icon} from 'antd';
import './index.less'


const { TabPane } = Tabs;

const data = [
    {
        title: '你收到了2条管理员信息',
        type:'email',
        AvatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        description:'1小时前'
    },
    {
        title: '系统提醒',
        type: 'OA',
        AvatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        description: '2小时前'
    },
    {
        title: '你有5条设备报警信息',
        type: 'start',
        AvatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        description: '15小时前'
    },
    {
        title: '内容不要超过两行字，超出自动截断',
        type: 'email',
        AvatarSrc: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        description: '2年前'
    },
];
class Message extends Component {

    callback(key) {
        console.log(key);
    }

    render() {
        return (
            // <Tabs defaultActiveKey="1" onChange={this.callback}>
            //     <TabPane tab="Tab 1" key="1">
            //         Content of Tab Pane 1
            //     </TabPane>
            //     <TabPane tab="Tab 2" key="2">
            //         Content of Tab Pane 2
            //     </TabPane>
            //     <TabPane tab="Tab 3" key="3">
            //         Content of Tab Pane 3
            //     </TabPane>
            // </Tabs>
            <Tabs defaultActiveKey="1" onChange={this.callback} className={"tabs"}>
                <TabPane tab="消息" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        // renderItem={(item, index) => (
                            
                        //     <List.Item className={"ListItem"}>
                        //         <List.Item.Meta
                        //             avatar={<Avatar src={item.AvatarSrc} />}
                        //             title={<a href="#">{item.title}</a>}
                        //             description={item.description}
                        //         />
                        //     </List.Item>
                        // )}
                        renderItem={(item, index) => {
                            if ((index + 1) !== data.length) {
                                return (
                                    <List.Item className={"ListItem"}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.AvatarSrc} />}
                                            title={<a href="#">{item.title}</a>}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )
                            } else {
                                return (
                                    <span>
                                        <List.Item className={"ListItem"}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.AvatarSrc} />}
                                                title={<a href="#">{item.title}</a>}
                                                description={item.description}
                                            />

                                        </List.Item>
                                        
                                            {/* <Row style={{width:'100%'}} className={"button-container"}>
                                                <Col span={12} className={"button-left"} >
                                                    <Card bordered={false} >清空 消息</Card>
                                                </Col>
                                                <Col span={12} className={"button-right"}>
                                                    <Card bordered={false} >查看 更多</Card>
                                                </Col>
                                            </Row> */}
                                        <div className={"button-container"}>
                                            <div className={"button-left"}>清空 消息</div>
                                            <div className={"button-right"}>查看 更多</div>

                                        </div>
                                    </span>
                                )
                            }
                        }}
                    />
                </TabPane>
            </Tabs>

        )
    }
}

const withDropDown = (Comp) => {
    const NewComponent = (props) => {
        return (
            
                <Dropdown trigger={['click']} placement={"bottomLeft"} overlay={<Comp/>} className={"dropDown_"}>
                <Badge count={4} offset={[-19, 23]}>
                        <Icon type={"bell"} style={{ padding: '4px', verticalAlign: 'middle', fontSize: '19px' }}></Icon>
                    </Badge>
                </Dropdown>
            
            // <Comp {...props}></Comp>
        )
        
    }
    return NewComponent;
}

export default withDropDown(Message);

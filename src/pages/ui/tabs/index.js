import React, {Component} from 'react';
import {Tabs, Card, message, Icon} from 'antd';
import './../buttons/index.less';

export default class tabs extends Component {

    handleSwitchTab=(key)=>{
        // console.log(e);
        message.info('选中了'+key+'页签');
    }


    componentWillMount() {
        this.newTabIndex = 0;

        const panes = [
            {
                title: 'Tab 1',
                content : 'Content of Tab Pane 1',
                key : '1'
            },{
                title: 'Tab 2',
                content : 'Content of Tab Pane 2',
                key : '2'
            },{
                title: 'Tab 3',
                content : 'Content of Tab Pane 3',
                key : '3'
            },
        ];

        this.setState({
            panes:panes,
            activeKey:panes[0].key
        });
    }

    handleEditableCard=(activeKey)=>{
        this.setState({activeKey:activeKey});
    }

    onEdit=(targetKey, action)=>{
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
            <div>
                <Card title={"Tab页签"} className={"card-wrap"}>
                    <Tabs defaultActiveKey={"1"} onChange={this.handleSwitchTab}>
                        <Tabs.TabPane tab={"Tab 1"} key={"1"}>
                            Content of Tab Pane 1
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Tab 2"} key={"2"}>
                            Content of Tab Pane 2
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Tab 3"} key={"3"}>
                            Content of Tab Pane 3
                        </Tabs.TabPane>
                    </Tabs>
                </Card>

                <Card title={"Tab带图标的页签"} className={"card-wrap"}>
                    <Tabs defaultActiveKey={"1"} onChange={this.handleSwitchTab}>
                        <Tabs.TabPane tab={<span><Icon type={"apple"}/>IOS</span>} key={"1"}>
                            Content of Tab Pane 1
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type={"android"}/>Android</span>} key={"2"}>
                            Content of Tab Pane 2
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type={"windows"}/>Windows</span>} key={"3"}>
                            Content of Tab Pane 3
                        </Tabs.TabPane>
                    </Tabs>
                </Card>

                <Card title={"动态Tab页签"} className={"card-wrap"}>
                    <Tabs type={"editable-card"}
                          defaultActiveKey={"1"}
                          onChange={this.handleEditableCard}
                          activeKey={this.state.activeKey}
                          onEdit={this.onEdit}>
                        {
                            this.state.panes.map((panel)=>{
                                return <Tabs.TabPane tab={panel.title} key={panel.key}>{panel.content}</Tabs.TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}


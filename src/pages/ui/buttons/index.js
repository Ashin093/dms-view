import React, {Component} from 'react';
import {Card,Button,Radio} from 'antd';
import './index.less';
class Buttons extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         loading : true
    //     }
    //
    // }

    state = {
        loading : true,
        size : "default"
    }

    handleCloseLoading=()=>{
        this.setState({
           loading:false
        });
    }

    handleSwitchRadio=(e)=>{
        console.log(e);
        this.setState({
          size:e.target.value
        })
    }

    render() {
        return (
            <div style={{textAlign:'left'}}>
                <Card title="基础按钮" className={"card-wrap"}>
                    <Button type="primary">Button</Button>
                    <Button>Button</Button>
                    <Button type="dashed">Button</Button>
                    <Button type="danger">Button</Button>
                    <Button disabled>Button</Button>
                </Card>
                <Card title="图形按钮" className={"card-wrap"}>
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type={"primary"} icon={"search"}>搜索</Button>
                    <Button type={"primary"} icon={"download"}>下载</Button>
                </Card>
                <Card title="Loading按钮" className={"card-wrap"}>
                    <Button type={"primary"}  loading={this.state.loading}>确定</Button>
                    <Button type={"primary"} loading={this.state.loading} shape={"circle"}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type={"primary"} onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title={"按钮组"} className={"card-wrap"}>
                    <Button.Group>
                        <Button type={"primary"} title={"返回"} icon={"left"} >返回</Button>
                        <Button type={"primary"} title={"前进"} icon={"right"}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title={"按钮尺寸"} className={"card-wrap"}>
                    <Radio.Group onChange={this.handleSwitchRadio}>
                        <Radio value={"small"}>小</Radio>
                        <Radio value={"default"}>中</Radio>
                        <Radio value={"large"}>大</Radio>
                    </Radio.Group>
                    <Button type={"primary"} size={this.state.size}>Button</Button>
                    <Button size={this.state.size}>Button</Button>
                    <Button type={"dashed"} size={this.state.size}>Button</Button>
                    <Button type={"danger"} size={this.state.size}>Button</Button>
                </Card>
            </div>
        );
    }
}

export default Buttons;
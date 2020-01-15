import React, {Component} from 'react';
import {Card,Modal,Button} from "antd";
import './../buttons/index.less';


class Modals extends Component {

    state = {
        showModal1 : false,
        showModal2 : false,
        showModal3 : false,
        showModal4 : false
    }

    handleOpen=(type)=>{
        this.setState({
            [type]:true
        });
    }

    handleConfirm=(type)=>{
        Modal[type]({
           title:'确认?',
           content:'确认提交内容吗?',
           onOk : ()=>{
               console.log("Ok");
           },
           onCancel:()=>{
               console.log("Cancel");
           }
        });
    }

    render() {
        return (
            <div>
                <Card title={"基础模态框"} className={"card-wrap"}>
                    <Button type={"primary"} onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type={"primary"} onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    {/*<Button type={"primary"} onClick={() =>this.handleOpen('showModal4')}>水平垂直居中</Button>*/}
                </Card>
                <Modal title={"React"}
                       visible={this.state.showModal1}
                       onCancel={()=>{this.setState({showModal1:false})}}
                       onOk={()=>{this.setState({showModal1:false})}}>
                    <p>React模态窗</p>
                </Modal>

                <Modal title={"React"}
                       visible={this.state.showModal2}
                       onCancel={()=>{this.setState({showModal2:false})}}
                       okText={"确定"}
                       cancelText={"取消"}
                       onOk={()=>{this.setState({showModal2:false})}}>
                    <p>自定义页脚</p>
                </Modal>

                <Card title={"信息确认框"} className={"card-wrap"}>
                    <Button type={"primary"} onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type={"primary"} onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type={"primary"} onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type={"primary"} onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>

            </div>
        );
    }
}

export default Modals;
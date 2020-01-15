import React, { Component } from 'react'
import { Button, Modal} from 'antd'
import BaseForm from '../BaseForm';
export default class TableToolBar extends Component {

    state = {
        visible: false,
        delVisible: false,
        data: {},
        formList: this.props.formList,
        // submitCallback: function(){}
    }

    showModal = (record, callback) => {
        // console.log(this.props.formList);
        // this.props.formList = [];//遍历formList 为initValue赋值
        this.setState({
            visible: true,
            formList: this.state.formList.map(item => {
                item['initialValue'] = '';
                return item;
            })
        }, () => {
                //用于重置form表单为默认值，修复取消修改后值不变的bug
                if (this.child) {
                    this.child.handleReset()
                }
                if (record) {
                    callback(this);
                } else {//新增
                    //重置form表单
                    this.props.addFunction(this);
                }
            }
        );
        
    }


    delModal = () => {
        this.props.delFunction(this);
    }

    modalStopPropagation = e => {
        e.stopPropagation();
        e.preventDefault();
        this.showModal();
    }

    handleOk = () => {
        this.child.handleSubmit( () => {
            this.setState({
                visible: false,
            });
        });

    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        this.props.onRef(this);    
    }

    onRef = (ref) => {
        this.child = ref;
    }

    render() {
        
        return (
            <div style={{ paddingBottom: 18 }}>
                <Button type={"primary"} icon={"plus"} onClick={this.modalStopPropagation}>新建</Button>
                <Button type={"danger"} icon={"minus"} onClick={this.delModal}>删除</Button>
                {
                    this.props.excelSupport ? (
                        <span>
                            <Button type={"dashed"} onClick={this.props.import}>导入</Button>
                            <Button type={"ghost"} onClick={this.props.export}>导出</Button>
                        </span>
                    ) : ''
                }
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={this.props.width}
                >
                    <BaseForm reload={this.props.reload} submitUrl={this.state.url} submitCallback={this.state.submitCallback} onRef={this.onRef} formList={this.state.formList} lyout={"vertical"} withoutButton={this.props.withoutButton} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} action={this.state.action}/>
                </Modal>

            </div>
        )
    }
}

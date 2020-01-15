import React, { Component } from 'react'
import BaseForm from './../../../CommonComponents/BaseForm'
import { Card, Modal, Table, Divider } from 'antd';
import Utils from './../../../../utils/utils';
import TableToolBar from './../../../CommonComponents/TableToolBar'
import apiAxios from './../../../../utils/axiosUtil/apiAxios';
import moment from 'moment';

export default class index extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        loading: false,
        formList: [
            { type: 'SELECT', field: 'type', label: '猪舍类型', style: { width: 200 }, placeholder: '请选择', List: [{ id: '0', name: '育肥' }, { id: '1', name: '保育' }, { id: '2', name: '母猪' }] },
            { type: 'INPUT', field: 'batch_id', label: '批次编号', style: { width: 200 }, rules: [{ max: 8, message: '批次编号最长不超过8位(例：20190101)' }] },
            { type: 'INPUT', field: 'name', label: '猪舍名称', style: { width: 200 }, rules: [{ max: 12, message: '名称最长不超过12位' }] },
            { type: 'TIMESPAN', field: 'timespan', label: '创建时间', style: { width: 485 }, format: 'YYYY-MM-DD HH:mm:ss', placeholder: ['开始时间', '结束时间'] },
        ],
        formData:{}
    };
    columns = [
        {
            title: '猪舍编号',
            dataIndex: 'objectId'
        }, {
            title: '批次编号',
            dataIndex: 'batch_id'
        }, {
            title: '猪舍名称',
            dataIndex: 'name'
        }, {
            title: '栏位数',
            dataIndex: 'compart'
        }, {
            title: '猪舍类型',
            dataIndex: 'type',
            render: (text, record) => {
                if (text === '0') {
                    return '保育'
                } else if (text === '1') {
                    return '育肥'
                } else if (text === '2') {
                    return '母猪'
                }
            }
        }, {
            title: '猪只数量',
            dataIndex: 'pig_count'
        }, {
            title: '入圈时间',
            dataIndex: 'start_date'
        }, {
            title: '出圈时间',
            dataIndex: 'end_date'
        },{
            title: '创建人',
            dataIndex: 'create_user'
        }, {
            title: '创建时间',
            dataIndex: 'start_date'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <span>
                    <a onClick={() => {
                        this.edit(text, record)
                    }}>编辑</a>
                    {/* <a>编辑</a> */}
                    <Divider type={"vertical"}></Divider>
                    <a href="#" onClick={this.requestList}>更多</a>
                </span>
            )
        },
    ];

    params = {
        page: 1,
        pageCount: 10
    }


    addFormList = [
        { type: 'INPUT', field: 'name', label: '猪舍名称', style: { width: 340 }, placeholder: '', rules: [{ max: 10, message: '猪舍名称最长不超过10位' }, { required: true, message: '该项为必填项' }] },
        // { type: 'INPUT', field: 'address', label: '猪舍地址', style: { width: 340 }, placeholder: '', rules: [{ max: 30, message: '猪舍名称最长不超过30位' }, { required: true, message: '该项为必填项' }] },
        { type: 'INPUT', field: 'compart', label: '栏位数', style: { width: 340 }, placeholder: '', rules: [{ required: true, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入合法的数字' }] },
        { type: 'INPUT', field: 'batch_id', label: '批次编号', style: { width: 340 }, placeholder: '', rules: [{ max: 8, message: '批次编号最长不超过8位(例：20190101)' }] },
        { type: 'DATEPICKER', field: 'start_date', label: '入圈时间', style: { width: 340 }, placeholder: '请选择' },
        { type: 'DATEPICKER', field: 'end_date', label: '出圈时间', style: { width: 340 }, placeholder: '请选择' },
        { type: 'SELECT', field: 'type', label: '猪舍类型', style: { width: 340 }, placeholder: '请选择', List: [{ id: '0', name: '保育' }, { id: '1', name: '育肥' }, { id: '2', name: '母猪' }] },
        { type: 'INPUT', field: 'pig_count', label: '猪只数量', style: { width: 340 }, placeholder: '', rules: [{ required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入合法的数字' }] },
    ];

    componentDidMount() {
        this.requestList();
        // this.setState({
        //     list:this.requestList()
        // })
    }

    requestList = (formData) => {

        let params = {
            page: this.params.page,
            pageCount: this.params.pageCount
        };
        this.setState({ formData });
        if (formData) {
            if (formData.name && formData.name.length > 0) {
                params['name'] = formData.name
            }
            if (formData.batch_id && formData.batch_id.length > 0) {
                params['name'] = formData.batch_id
            }
            if (formData.type && formData.type.length > 0) {
                params['type'] = formData.type
            }
            if (formData.timespan && formData.timespan.length > 0) {
                params['beginDate'] = formData[0].format('YYYY-MM-DD HH:mm:ss');
                params['endDate'] = formData[1].format('YYYY-MM-DD HH:mm:ss');
            }
        }
        apiAxios.ajax({
            url: '/api/pigHouse/list',
            data: {
                params: params
            },
        }).then(res => {
            let data = res.data.data;
            let list = data.map((item, index) => {
                item.key = index;
                return item;
            });
            let _this = this;
            this.setState({
                list,
                pagination: Utils.pagination(res.data, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }


    edit = (text, record) => {
        let { objectId } = record;
        apiAxios.ajax({
            url: '/api/pigHouse/findById',
            data: {
                params: {
                    objectId
                }
            }
        }).then(res => {
            let object = res.data.data;

            this.child.showModal(text, (_this) => {
                _this.setState({
                    formList: this.addFormList.map(item => {
                        switch (item.field) {
                            case 'name':
                                item['initialValue'] = object['name'];
                                break;
                            case 'address':
                                item['initialValue'] = object['address'];
                                break;
                            case 'compart':
                                item['initialValue'] = object['compart'];
                                break;
                            case 'batch_id':
                                item['initialValue'] = object['batch_id'];
                                break;
                            case 'start_date':
                                item['initialValue'] = moment(object['start_date']);
                                break;
                            case 'end_date':
                                item['initialValue'] = moment(object['end_date']);
                                break;
                            case 'type':
                                item['initialValue'] = object['type'];
                                break;
                            case 'pig_count':
                                item['initialValue'] = object['pig_count']+'';
                                break;
                            default:
                                break;
                        }
                        return item;
                    }),
                    url: "/api/pigHouse/update",
                    submitCallback: (values) => {
                        values.id = objectId;
                        return values;
                    }
                })
            });
        })
    }


    add = (_this) => {
        _this.setState({
            formList: this.addFormList.map(item => {
                item['initialValue'] = '';
                return item;
            }),
            url: "/api/pigHouse/add",
        })
    }

    del = (_this) => {
        if (this.state.selectedRows.length > 0) {
            Modal.confirm({
                title: '提醒',
                content: '是否确认删除选中的数据?',
                onOk: () => {
                    apiAxios.ajax({
                        url: '/api/ecDevice/delete',
                        data: {
                            params: {
                                objectId: this.state.selectedRows.join()
                            }
                        }
                    }).then(res => {
                        console.log(res);
                        this.requestList();
                    });
                },
            })
        }
        return;    
    }

    export = () => {
        apiAxios.ajax({
            url: '/api/pigHouse/export',
            data: {
                params:this.state.formData
            },
            responseType: 'blob',
            selfHandle:true
        }).then(res => {
            // console.log(res);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pigHouseList.xls');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href); // 释放掉blob对象
            document.body.removeChild(link); // 下载完成移除元素
        })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRowKeys changed: ', selectedRows);
        let ids = selectedRows.map(item => {
            return item.objectId
        });
        this.setState({
            selectedRowKeys,
            selectedRows:ids
        });
    }
    
    onRef = (ref) => {
        this.child = ref;
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        return (

            <div>
                <Card bordered={false}>
                    <BaseForm layout={"inline"} formList={this.state.formList} reload={this.requestList}/>
                </Card>

                <div className={"content-wrap"}>
                    <Card>
                        <TableToolBar
                            addUrl={"/pigHouse/add"}
                            addFunction={this.add}
                            delIds={this.state.selectedRows}
                            deleteUrl={"/pigHouse/delete"}
                            title={"新建猪舍信息"}
                            formList={this.addFormList}
                            withoutButton={true}
                            width={900}
                            onRef={this.onRef}
                            reload={this.requestList}
                            excelSupport={true}
                            import={() => { alert('导入') }}
                            export={this.export}
                        />
                        <Table
                            rowSelection={rowSelection}
                            bordered
                            columns={this.columns}
                            dataSource={this.state.list}
                            pagination={this.state.pagination}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}
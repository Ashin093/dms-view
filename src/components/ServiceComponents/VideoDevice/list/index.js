import React, { Component } from 'react'
import { Card, Table, Divider, Modal } from 'antd';
import Utils from './../../../../utils/utils';
import BaseForm from './../../../CommonComponents/BaseForm'
import TableToolBar from './../../../CommonComponents/TableToolBar'
import apiAxios from './../../../../utils/axiosUtil/apiAxios'
export default class VideoDeviceList extends Component {

    state = {
        selectedRowKeys: [],
        selectedRows: [],
        loading: false,
        formList: [
            {
                type: 'INPUT',
                field: 'name',
                label: '设备名称',
                style: { width: 200 },
                rules: [
                    { max: 15, message: 'MAC地址最长不超过15位' }
                ]
            },
            // {
            //     type: 'INPUT',
            //     field: 'address',
            //     label: '设备地址',
            //     style: { width: 200 },
            //     rules: [
            //         { max: 30, message: 'MAC地址最长不超过30位' }
            //     ]
            // },
            {
                type: 'INPUT',
                field: 'ip',
                label: 'IP地址',
                style: { width: 200 },
                rules: [
                    { pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', message: '请输入合法的IP地址' }
                ]
            },
            {
                type: 'INPUT',
                field: 'sim',
                label: 'SIM卡号',
                style: { width: 200 },
                rules: [
                    { pattern: '^[0-9]*$', message: '请输入合法的数字卡号' }
                ]
            },
            {
                type: 'INPUT',
                field: 'device_code',
                label: '设备编号',
                style: { width: 200 },
                rules: [
                    { max: 10, message: '设备编号最长不超过10位' }
                ]
            },
            {
                type: 'TIMESPAN',
                field: 'timespan',
                label: '创建时间',
                style: { width: 485 },
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: ['开始时间', '结束时间']
            },
        ],
        formData:{}
    };
    params = {
        page: 1,
        pageCount: 10
    }
    columns = [
        {
            title: '设备编号',
            dataIndex: 'device_code'
        } , {
            title: '设备名称',
            dataIndex: 'name'
        },
        // {
        //     title: '设备地址',
        //     dataIndex: 'address'
        // },
        {
            title: 'IP地址',
            dataIndex: 'ip'
        },
        // {
        //     title: 'SIM卡号',
        //     dataIndex: 'sim',
        // },
        {
            title: '登录账号',
            dataIndex: 'login_name',
        }, {
            title: '登录密码',
            dataIndex: 'login_pin',
        },{
            title: '添加时间',
            dataIndex: 'createAt'
        }, {
            title: '所属猪舍',
            dataIndex: 'pigHouse'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <span>
                    <a onClick={() => {
                        this.edit(text, record)
                    }}>编辑</a>
                    <Divider type={"vertical"}></Divider>
                    <a href="#" onClick={this.requestList}>更多</a>
                </span>
            )
        },
    ];

    addFormList = [];

    componentWillMount() {
        apiAxios.ajax({
            url: '/api/pigHouse/all',
        }).then(res => {
            this.setState({ pigHouse: res.data.data }, () => {
                this.addFormList = [
                    { type: 'INPUT', field: 'name', label: '设备名称', style: { width: 340 }, placeholder: '', rules: [{ max: 10, message: '设备名称最长不超过10位' }, { required: true, message: '请输入设备名称' }] },
                    // { type: 'INPUT', field: 'address', label: '设备地址', style: { width: 340 }, placeholder: '', rules: [{ max: 30, message: '设备名称最长不超过30位' }, { required: true, message: '请输入设备安装地址' }] },
                    { type: 'INPUT', field: 'ip', label: 'IP地址', style: { width: 340 }, placeholder: '', rules: [{ pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', message: '请输入合法的IP地址' }, { required: true, message: '请输入IP地址' }] },
                    // { type: 'INPUT', field: 'sim', label: 'SIM卡号', style: { width: 340 }, rules: [{ pattern: '^[0-9]*$', message: '请输入合法的数字卡号' }, { required: true, message: '请输入SIM卡号' }] },
                    { type: 'INPUT', field: 'device_code', label: '设备编号', style: { width: 340 }, rules: [{ max: 10, message: '设备编号最长不超过10位' }, { required: true, message: '请输入设备编号' }] },
                    { type: 'INPUT', field: 'login_name', label: '登录账号', style: { width: 340 }, rules: [{ max: 15, message: '登录账号最长不超过15位' }, { required: true, message: '请输入登录账号' }] },
                    { type: 'INPUT', field: 'login_pin', label: '登录密码', style: { width: 340 }, rules: [{ max: 15, message: '登录密码最长不超过15位' }, { required: true, message: '请输入登录密码' }] },
                    {
                        type: 'SELECT', field: 'pigHouse', label: '所属猪舍', style: { width: 340 }, placeholder: '请选择',
                        List: this.state.pigHouse.map(item => {
                            return { id: item.objectId, name: item.name }
                        })
                    },
                ];
            })
        })
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
            
            if (formData.ip && formData.ip.length > 0) {
                params['ip'] = formData.ip
            }
            if (formData.address && formData.address.length > 0) {
                params['address'] = formData.address
            }
            if (formData.timespan && formData.timespan.length > 0) {
                params['beginDate'] = formData[0].format('YYYY-MM-DD HH:mm:ss');
                params['endDate'] = formData[1].format('YYYY-MM-DD HH:mm:ss');
            }
            if (formData.name && formData.name.length > 0) {
                params['name'] = formData.name;
            }
            if (formData.sim && formData.sim.length > 0) {
                params['sim'] = formData.sim;
            }
            if (formData.device_code && formData.device_code.length > 0) {
                params['device_code'] = formData.device_code;
            }

        }

        apiAxios.ajax({
            url: '/api/videoDevice/list',
            data: {
                params: params
            },
        }).then(res => {
            let data = res.data;
            let list = data.data.map((item, index) => {
                // item = JSON.parse(item);
                item['key'] = index;
                return item;
            });
            let _this = this;
            this.setState({
                list,
                pagination: Utils.pagination(data, (current) => {
                    _this.params.page = current;
                    _this.requestList(this.state.formData);
                }),
                selectedRowKeys: [],
                selectedRows: [],
            })
        })
    }

    edit = (text, record) => {
        let { objectId } = record;
        apiAxios.ajax({
            url: '/api/videoDevice/findById',
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
                            case 'ip':
                                item['initialValue'] = object['ip'];
                                break;
                            case 'name':
                                item['initialValue'] = object['name'];
                                break;
                            // case 'address':
                            //     item['initialValue'] = object['address'];
                            //     break;
                            // case 'sim':
                            //     item['initialValue'] = object['sim'];
                            //     break;
                            case 'device_code':
                                item['initialValue'] = object['device_code'];
                                break;
                            case 'login_name':
                                item['initialValue'] = object['login_name'];
                                break;
                            case 'login_pin':
                                item['initialValue'] = object['login_pin'];
                                break;
                            case 'pigHouse':
                                item['initialValue'] = object['pigHouse'];
                                break;
                            default:
                                break;
                        }
                        return item;
                    }),
                    url: "/api/videoDevice/update",
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
            url: "/api/videoDevice/add",

        })

    }

    del = (_this) => {
        if (this.state.selectedRows.length > 0) {
            Modal.confirm({
                title: '提醒',
                content: '是否确认删除选中的数据?',
                onOk: () => {
                    apiAxios.ajax({
                        url: '/api/videoDevice/delete',
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

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        console.log('selectedRowKeys changed: ', selectedRows);
        let ids = selectedRows.map(item => {
            return item.objectId
        });
        this.setState({
            selectedRowKeys,
            selectedRows: ids
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
                    <BaseForm layout={"inline"} formList={this.state.formList} reload={this.requestList} />
                </Card>

                <div className={"content-wrap"}>
                    <Card>
                        <TableToolBar
                            deleteUrl={"/soundDevice/delete"}
                            addFunction={this.add}
                            delFunction={this.del}
                            title={"新建设备信息"}
                            formList={this.addFormList}
                            onRef={this.onRef}
                            withoutButton={true}
                            width={900}
                            reload={this.requestList}
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

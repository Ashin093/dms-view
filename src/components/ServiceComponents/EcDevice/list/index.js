import React, { Component } from 'react'
import { Card, Table, Divider, Modal, Tag } from 'antd';
import Utils from './../../../../utils/utils';
import BaseForm from './../../../CommonComponents/BaseForm'
import TableToolBar from './../../../CommonComponents/TableToolBar'
import apiAxios from './../../../../utils/axiosUtil/apiAxios'
export default class EcDeviceList extends Component {


    componentWillMount() {
        apiAxios.ajax({
            url: '/api/pigHouse/all',
        }).then(res => {
            this.setState({ pigHouse: res.data.data }, () => {
                this.addFormList = [
                    { type: 'INPUT', field: 'name', label: '设备名称', style: { width: 340 }, placeholder: '', rules: [{ required: true, message: '请输入设备名称' }, { max: 12, message: '设备名称请不要超过12个字符' }] },
                    { type: 'INPUT', field: 'baud_rate', label: '波特率', style: { width: 340 }, placeholder: '', rules: [{ required: true, message: '请输入设备波特率' }, { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入合法的数字' }] },
                    { type: 'INPUT', field: 'ip', label: 'IP地址', style: { width: 340 }, placeholder: '', rules: [{ required: true, message: '请输入IP地址' }, { pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', message: '请输入合法的IP地址' }] },
                    { type: 'INPUT', field: 'com_name', label: '串口名称', style: { width: 340 }, rules: [{ required: true, message: '请输入串口名称' }, { max: 10, message: 'MAC地址最长不超过10位' }] },
                    { type: 'INPUT', field: 'address', label: '设备地址', style: { width: 340 }, rules: [{ max: 30, message: '设备地址最长不超过30位' }] },
                    { type: 'SELECT', field: 'type', label: '设备类型', style: { width: 340 }, placeholder: '请选择', List: [{ id: '0', name: '二氧化碳' }, { id: '1', name: '氨气' }, { id: '2', name: '温湿度' }], rules: [{ required: true, message: '请选择设备类型' }] },
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
    }

    state = {
        selectedRowKeys: [],
        selectedRows: [],
        loading: false,
        formList: [
            {
                type: 'SELECT', field: 'type', label: '设备类型',
                style: { width: 200 },
                placeholder: '请选择',
                List: [
                    { id: '0', name: '二氧化碳' },
                    { id: '1', name: '氨气' },
                    { id: '2', name: '温湿度' },
                ]
            },
            {
                type: 'SELECT',
                field: 'state',
                label: '设备状态',
                style: { width: 200 },
                placeholder: '请选择',
                List: [
                    { id: 0, name: '正常' },
                    { id: 1, name: '异常' },
                    { id: 2, name: '停止' }
                ]
            },
            {
                type: 'INPUT',
                field: 'name',
                label: '设备名称',
                style: { width: 200 },
                rules: [
                    { max :12, message: '设备名称请不要超过12个字符' }
                ]
            },
            {
                type: 'INPUT',
                field: 'baud_rate',
                label: '波特率',
                style: { width: 200 },
                rules: [
                    { pattern: new RegExp(/^[1-9]\d*$/, "g"), message: '请输入合法的数字' }
                ]
            },
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
                field: 'address',
                label: '设备地址',
                style: { width: 200 },
                rules: [
                    { max: 30, message: '设备地址请不要超过30个字符' }
                ]
            },
            {
                type: 'INPUT',
                field: 'com_name',
                label: '串口名称',
                style: { width: 200 },
                rules: [
                    { max: 10, message: '串口名称请不要超过10个字符' }
                ]
            },
            {
                type: 'TIMESPAN',
                field: 'timespan',
                label: '时间检索',
                style: { width: 485 },
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: ['开始时间', '结束时间']
            },
        ]
    }

    params = {
        page: 1,
        pageCount: 10
    }

    columns = [
        {
            title: '设备编号',
            dataIndex: 'objectId'
        }, {
            title: '设备名称',
            dataIndex: 'name'
        }, {
            title: 'IP地址',
            dataIndex: 'ip'
        }, {
            title: '设备地址',
            dataIndex: 'address',
        }, {
            title: '设备类型',
            dataIndex: 'type',
            render: (text, record) => {
                if (text === '0') {
                    return <Tag color={"geekblue"} key={text}>
                        二氧化碳
                    </Tag>
                } else if (text === '1') {
                    return <Tag color={"green"} key={text}>
                        氨气
                    </Tag>
                } else if (text === '2') {
                    return (
                        <span>
                            <Tag color={"volcano"} key={text+"_temp"}>温度</Tag>
                            <Tag color={"purple"} key={text+"_wet"}>湿度</Tag>
                        </span>
                    )
                }
            }
        }, {
            title: '波特率',
            dataIndex: 'baud_rate'
        }, {
            title: '串口',
            dataIndex: 'com_name'
        },
        {
            title: '添加时间',
            dataIndex: 'createdAt'
        },
        {
            title: '所属猪舍',
            dataIndex: 'PigHouse'
        },
        {
            title: '创建者',
            dataIndex: 'create_user',
            render: (text,record) => {
                if (text === '1') {
                    return 'admin'
                } else {
                    return text;
                }
            }
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => (
                <span>
                    <a onClick={() => {
                        this.edit(text, record)
                    }}>查看</a>
                    <Divider type={"vertical"}></Divider>
                    <a href="#" onClick={this.requestList}>更多</a>
                </span>
            )
        },
    ];

    addFormList = [
       
    ];

    requestList = (formData) => {
        let params = {
            page: this.params.page,
            pageCount: this.params.pageCount
        };

        if (formData) {

            if (formData.ip && formData.ip.length > 0) {
                params['ip'] = formData.ip
            }
            if (formData.type && formData.type.length > 0) {
                params['type'] = formData.type
            }
            if (formData.timespan && formData.timespan.length > 0) {
                params['beginDate'] = formData[0].format('YYYY-MM-DD HH:mm:ss');
                params['endDate'] = formData[1].format('YYYY-MM-DD HH:mm:ss');
            }
            if (formData.name && formData.name.length > 0) {
                params['name'] = formData.name;
            }
            if (formData.baud_rate && formData.baud_rate.length > 0) {
                params['baud_rate'] = formData.baud_rate;
            }
            if (formData.address && formData.address.length > 0) {
                params['address'] = formData.address;
            }
            if (formData.com_name && formData.com_name.length > 0) {
                params['com_name'] = formData.com_name;
            }
            params['state'] = formData.state;

        }

        apiAxios.ajax({
            url: '/api/ecDevice/list',
            data: {
                params: params
            },
        }).then(res => {
            let data = res.data;
            let list = data.data.map((item, index) => {
                // item = JSON.parse(item);
                item['key'] = item.objectId;
                return item;
            });
            let _this = this;
            this.setState({
                list,
                pagination: Utils.pagination(data, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                }),
                selectedRowKeys: [],
                selectedRows: [],
            })
        })
    }

    edit = (text, record) => {
        let { objectId } = record;
        apiAxios.ajax({
            url: '/api/ecDevice/findById',
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
                            case 'type':
                                item['initialValue'] = object['type'];
                                break;
                            case 'name':
                                item['initialValue'] = object['name'];
                                break;
                            case 'baud_rate':
                                item['initialValue'] = object['baud_rate'];
                                break;
                            case 'com_name':
                                item['initialValue'] = object['com_name'];
                                break;
                            case 'address':
                                item['initialValue'] = object['address'];
                                break;
                            case 'pigHouse':
                                item['initialValue'] = object['pigHouse'];
                                break;
                            default:
                                break;
                        }
                        return item;
                    }),
                    url: "/ecDevice/update",
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
            url: '/ecDevice/add',
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
                    <BaseForm layout={"inline"} formList={this.state.formList} reload={this.requestList}/>
                </Card>

                <div className={"content-wrap"}>
                    <Card>
                        <TableToolBar
                            deleteUrl={"/ecDevice/delete"}
                            addFunction={this.add}
                            delFunction={this.del}
                            title={"新建环控设备信息"}
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

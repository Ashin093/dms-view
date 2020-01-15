import React, { Component } from 'react'
import { Card, Table , Divider , Modal} from 'antd';
import Utils from './../../../../utils/utils';
import BaseForm from './../../../CommonComponents/BaseForm'
import TableToolBar from './../../../CommonComponents/TableToolBar'
import apiAxios from './../../../../utils/axiosUtil/apiAxios'
import './index.less';
export default class SoundDeviceList extends Component {

    state = {
        selectedRowKeys: [],
        selectedRows:[],
        loading: false,
        formList: [
            {
                type: 'SELECT', field: 'devicetype', label: '设备类型',
                style: { width: 200 },
                placeholder: '请选择',
                List: [
                    { id: 'rk3308', name: 'rk3308' },
                    { id: 'xmos', name: 'xmos' }
                ]
            },
            {
                type: 'SELECT',
                field: 'channelCount',
                label: '声道类型',
                style: { width: 200 },
                placeholder: '请选择',
                List: [
                    { id: '8', name: 8 },
                    { id: '16', name: 16 },
                    { id: '32', name: 32 }
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
                field: 'macAddress',
                label: 'MAC地址',
                style: { width: 200 },
                rules: [
                    { max: 12, message: 'MAC地址最长不超过12位' }
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
                type: 'TIMESPAN',
                field: 'timespan',
                label: '时间检索',
                style: { width: 485 },
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: ['开始时间', '结束时间']
            },
        ],
        formData:{}
    };
    params = {
        page: 1,
        pageCount:10
    }
    columns = [
        {
            title: '设备编号',
            dataIndex:'objectId'
        }, {
            title: 'MAC地址',
            dataIndex: 'macAddress'
        }, {
            title: 'IP地址',
            dataIndex: 'ip'
        }, {
            title: '设备声道数',
            dataIndex: 'channelCount',
        }, {
            title: '有效声道',
            dataIndex: 'exportChannel',
            render: (text, record) => {
                if (text) {
                    return text.join();
                } else {
                    return '';
                }
                
            }
        }, {
            title: '添加时间',
            dataIndex: 'createdAt'
        }, {
            title: '设备类型',
            dataIndex: 'devicetype'
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
                        this.edit(text,record)
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
                    { type: 'INPUT', field: 'ip', label: 'IP地址', style: { width: 340 }, placeholder: '', rules: [{ pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', message: '请输入合法的IP地址' }] },
                    { type: 'INPUT', field: 'macAddress', label: 'MAC地址', style: { width: 340 }, rules: [{ max: 12, message: 'MAC地址最长不超过12位' }] },
                    { type: 'SELECT', field: 'devicetype', label: '设备类型', style: { width: 340 }, placeholder: '请选择', List: [{ id: 'rk3308', name: 'rk3308' }, { id: 'xmos', name: 'xmos' }] },
                    {
                        type: 'SELECT', field: 'channelCount', label: '声道类型', style: { width: 340 }, placeholder: '请选择', List: [{ id: '8', name: 8 }, { id: '16', name: 16 }, { id: '32', name: 32 }],
                        onChange: (value) => {
                            let count = Number(value);
                        }
                    },
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
            pageCount:this.params.pageCount
        };
        
        this.setState({ formData });
        
        if (formData) {

            if (formData.ip && formData.ip.length > 0) {
                params['ip'] = formData.ip
            }
            if (formData.macAddress && formData.macAddress.length > 0) {
                params['macAddress'] = formData.macAddress
            }
            if (formData.timespan && formData.timespan.length > 0) {
                params['beginDate'] = formData[0].format('YYYY-MM-DD HH:mm:ss');
                params['endDate'] = formData[1].format('YYYY-MM-DD HH:mm:ss');
            }
            if (formData.channelCount && formData.channelCount.length > 0) {
                params['channelCount'] = formData.channelCount;
            }
            if (formData.devicetype && formData.devicetype.length > 0) {
                params['devicetype'] = formData.devicetype;
            }
            params['state'] = formData.state;

        }

        apiAxios.ajax({
            url: '/api/soundDevice/list',
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
            url: '/api/soundDevice/findById',
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
                            case 'macAddress':
                                item['initialValue'] = object['macAddress'];
                                break;
                            case 'devicetype':
                                item['initialValue'] = object['devicetype'];
                                break;
                            case 'channelCount':
                                item['initialValue'] = object['channelCount'];
                                break;
                            case 'pigHouse':
                                item['initialValue'] = object['pigHouse'];
                                break;

                            default:
                                break;
                        }
                        return item;
                    }),
                    url: "/api/soundDevice/update",
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
            url: "/api/soundDevice/add",
            submitCallback: (values) => {
                if (values.channelCount && values.channelCount.length > 0) {
                    let channelCount = Number(values.channelCount);
                    let exportChannel = [];
                    for (let i = 1; i < channelCount + 1; i++){
                        exportChannel.push(i);
                    }
                    values['exportChannel'] = exportChannel.join();
                }
                return values;
            }
        })

    }

    del = (_this) => {
        if (this.state.selectedRows.length > 0) {
            Modal.confirm({
                title: '提醒',
                content: '是否确认删除选中的数据?',
                onOk: () => {
                    apiAxios.ajax({
                        url: '/api/soundDevice/delete',
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

    onSelectChange = (selectedRowKeys, selectedRows)  => {
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

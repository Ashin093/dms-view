import React, { Component } from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker, message} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';
import apiAxios from './../../../utils/axiosUtil/apiAxios'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;


class FilterForm extends Component {
    state = {}
    componentWillMount() {
        if (this.props.onRef) {
            this.props.onRef(this);    
        } 
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        // this.props.form.resetFields();
        const formList = this.props.formList;
        const FormItemList = [];
        if (formList && formList.length > 0) {
            //遍历配置项
            formList.forEach((item, i) => {
                
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder || '';
                let style = item.style || {};
                let rules = item.rules || [];
                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue,
                                rules:rules
                            })(
                                <Input type={"text"} placeholder={item.placeholder} style={style}/>
                            )
                        }
                    </FormItem>;
                    FormItemList.push(INPUT);
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue,
                                rules:rules
                            })(
                                <Select
                                    onChange={item.onChange}
                                    showSearch
                                    style={style}
                                    placeholder={placeholder}
                                >
                                    {this.getOptionList(item.List)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    FormItemList.push(SELECT);
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue,  //true | false
                            })(
                                <Checkbox style={style}>
                                    {label}
                                </Checkbox>            
                            )
                        }
                    </FormItem>;
                    FormItemList.push(CHECKBOX);
                } else if (item.type === 'TIMESPAN') {
                    
                    const TIMESPAN = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator([field])(
                                <RangePicker
                                    locale={locale}
                                    allowClear
                                    showTime
                                    format={item.format}
                                    placeholder={item.placeholder} //array
                                    style={item.style}
                                />
                            )
                        }
                    </FormItem>;
                    FormItemList.push(TIMESPAN);
                } else if (item.type === 'DATEPICKER') {
                    const DATEPICKER = <FormItem label={label} key={field} >
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue //moment object
                            })(
                                <DatePicker
                                    locale={locale}
                                    showTime
                                    placeholder={item.placeholder} 
                                    style={item.style}
                                />
                            )
                        }
                    </FormItem>;
                    FormItemList.push(DATEPICKER);
                }
            });
            if (!this.props.withoutButton) {
                const TableToolBar = <FormItem style={{ float: 'right' }} key={new Date().getTime()}>
                    <Button type={"primary"} htmlType={"submit"}>查询</Button>
                    <Button type={"primary"} onClick={this.handleReset}>重置</Button>
                </FormItem>
                FormItemList.push(TableToolBar);
            }
        }
        return FormItemList;
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    getOptionList = (data) => {
        if (!data) {
            return [];
        }
        let options = [];
        data.forEach((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }



    handleSubmit = callback => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (this.props.submitUrl) {//编辑添加
                    apiAxios.ajax({
                        url: this.props.submitUrl,
                        data: {
                            params:this.props.submitCallback?this.props.submitCallback(values):values
                        }
                    }).then(res => {
                        if (res.data.code === 5000) {
                            message.success('操作执行成功！',5);
                        } else {

                            message.error('发生异常：' + res.data.errMsg, 5);
                        }
                        this.props.reload();
                    })
                } else {//查询
                    this.props.reload(values);
                } 
                if (callback && typeof callback == 'function') callback();//关闭modal
            }
        });
    }

    render() {
        return (
            <div>
                <Form layout={this.props.layout} onSubmit={this.handleSubmit} labelCol={this.props.labelCol} wrapperCol={this.props.wrapperCol}>
                    {this.initFormList()}
                </Form>
            </div>
        )
    }
}

export default Form.create({})(FilterForm);
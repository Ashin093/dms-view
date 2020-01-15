import React, { Component } from 'react'
import { Form, Card, Select } from 'antd'
import ChannelBind from './child'
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
class ChangeForm extends Component {
    state = {
        option: 0
    }
    onChange = (key) => {
        this.setState({
            option: key
        })
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Card bordered title={"新建声音设备"}>
                    <Form {...formItemLayout}>
                        <FormItem label={"声道类型"} key={"exportChannel"}>
                            {
                                getFieldDecorator('exportChannel')(
                                    <Select onChange={this.onChange}>
                                        <Option value={8}>8</Option>
                                        <Option value={16}>16</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        {
                            this.state.option > 0 ? <ChannelBind getFieldDecorator={getFieldDecorator} option={this.state.option}/>:''
                        }
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({})(ChangeForm);
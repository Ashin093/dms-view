import { Select, Form } from 'antd'
import React, { Component } from 'react'
const FormItem = Form.Item;
const { Option } = Select;
export default class ChannelBind extends Component {
    state = { option: this.props.option }
    initCompart = () => {
        let optionArr = [];
        for (let i = 1; i < 24 + 1; i++) {
            optionArr.push(
                <Option key={i}>{'栏位' + i}</Option>
            )
        }
        return optionArr;
    }
    init = () => {
        let count = this.props.option;
        let formList = [];
        if (count > 0) {
            for (let i = 1; i < count + 1; i++) {
                    formList.push(<FormItem label={"声道" + i} key={"channel" + i}>
                        {
                            this.props.getFieldDecorator('exportChannel' + i)(
                                <Select>
                                    {this.initCompart()}
                                </Select>
                            )
                        }
                    </FormItem>);
            }
        }
        return formList;
    }
    render() {
        return (
            <div>
                {this.init()}
            </div>
        )
    }
}




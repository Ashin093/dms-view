import React, { Component } from 'react'
import { Icon } from 'antd';
import './index.less';
export default class Help extends Component {
    render() {
        return (
            <div className={"help-container"} alt={"帮助"}>
                <Icon type="question-circle" className={"help-header"} />
            </div>
        )
    }
}

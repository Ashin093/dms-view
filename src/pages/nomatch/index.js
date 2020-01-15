import React, { Component } from 'react';
import Exception from 'ant-design-pro/lib/Exception';
import './index.less';
export default class NoMatch extends Component {
    render() {
        return (
            <div className="content404">
                <Exception type="404"/>
            </div>
        );
    }
}


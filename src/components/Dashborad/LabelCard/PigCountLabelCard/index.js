/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
const defaultProps = {
    title : "猪只总数/猪舍数",
    total : "2320/30",
    
}

export default class PigCountLabelCard extends Component {
    render() {
        return (
            <ChartCard
                title={this.props.title} //"猪只总数/猪舍数"
                action={
                    <Tooltip title={"指标说明"}>
                        <Icon type={"info-circle-o"} />
                    </Tooltip>
                }
                total={() => (
                    <span dangerouslySetInnerHTML={{ __html: this.props.total }} /> //"2320/30"
                )}
                footer={
                    <Field label={"日均增长额"} value={numeral(0).format("0,0")} />
                }
                contentHeight={46}
            >
                <span>
                    周同比
                    <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                        5%
                    </Trend>
                </span>
                {/* <span style={{ marginLeft: 16 }}>
                    日环比
                    <Trend
                        flag="down"
                        style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                    >
                        7%
                    </Trend>
                </span> */}
            </ChartCard>
        )
    }
}

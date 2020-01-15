import React, { Component } from 'react'
import { ChartCard,  MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Icon, Tooltip } from 'antd';


export default class DeviceHealthyCard extends Component {
    render() {
        return (
            <ChartCard
                title="设备健康率"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total="78%"
                footer={
                    <div>
                        <span>
                            异常或停用
                            <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>22%</Trend>
                        </span>
                    </div>
                }
                contentHeight={46}
            >
                <MiniProgress percent={78} strokeWidth={8} target={100} />
            </ChartCard>
        )
    }
}

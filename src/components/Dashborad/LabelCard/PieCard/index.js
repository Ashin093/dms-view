import React, { Component } from 'react'
import { Pie } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd';

const devicePieData = [
    {
        x: '图像设备',
        y: 4544,
    },
    {
        x: '声音设备',
        y: 3321,
    },
    {
        x: '环控设备',
        y: 3113,
    },
    {
        x: '网络设备',
        y: 2341,
    },
    {
        x: '其他',
        y: 1231,
    }
];

export default class PieCard extends Component {
    render() {
        return (
            <Card title={"设备统计"} headStyle={{height:'64px',lineHeight:'34px'}}>
                <Pie
                    hasLegend
                    title="设备统计"
                    subTitle="设备统计"
                    total={() => (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: devicePieData.reduce((pre, now) => now.y + pre, 0)
                            }}
                        />
                    )}
                    data={devicePieData}
                    height={300}
                />
            </Card>
        )
    }
}

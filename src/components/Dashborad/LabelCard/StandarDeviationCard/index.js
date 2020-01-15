import React, { Component } from 'react'
import { ChartCard } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: (Math.floor(Math.random() * 100) + 10) / 100,
    });
}

export default class StandarDeviationCard extends Component {
    render() {
        return (
            <ChartCard
                title="标准差"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={numeral(1).format('%')}
                footer={<span>日均增长0%</span>}
                contentHeight={46}
            >
                <span>
                    周同比
                    <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                        1%
                    </Trend>
                </span>
            </ChartCard>
        )
    }
}

import React, { Component } from 'react'
import { ChartCard, Trend, MiniBar, MiniArea, Field, MiniProgress} from 'ant-design-pro/lib/Charts';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: (Math.floor(Math.random() * 100) + 10)/100,
    });
}

export default class FeedConversionCard extends Component {
    render() {
        return (
            <ChartCard
                title="猪只健康指数"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total={numeral(0.85).format('%')}
                footer={<span>日均增长0.5%</span>}
                contentHeight={46}
            >
                <MiniBar
                    height={46}
                    data={visitData}
                />
            </ChartCard>
        )
    }
}

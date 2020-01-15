import React, { Component } from 'react'
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import './../../../../style/common.less';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
    });
}

export default class PigWeightCard extends Component {
    render() {
        return (
            <ChartCard
                title="整体估重/均重(KG)"
                total={numeral(this.props.weight).format('0,0') + '/' + numeral(this.props.weight/this.props.count).format('0,0.0')}
                contentHeight={46}
                footer={
                    <span>
                        周同比
                        <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                            {this.props.up || 0}
                        </Trend>
                    </span>
                }
            >
                <MiniArea line height={46} data={visitData} />

            </ChartCard>
        )
    }
}

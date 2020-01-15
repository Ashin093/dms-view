import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import PigCountLabelCard from '../../components/Dashborad/LabelCard/PigCountLabelCard';
import PigWeightCard from '../../components/Dashborad/LabelCard/PigWeightCard';
import FeedConversionCard from '../../components/Dashborad/LabelCard/FeedConversionCard';
import DeviceHealthyCard from '../../components/Dashborad/LabelCard/DeviceHealthyCard';
import DashboradLineChart from '../../components/Dashborad/LineChart'
import './index.less';
import GaugeCard from '../../components/Dashborad/LabelCard/GaugeCard';
import PieCard from '../../components/Dashborad/LabelCard/PieCard';

export default class Dashborad extends Component {
    render() {
        return (
            <div>
                <Row style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                    <Col className={"chartCard"} span={6}>
                        <PigCountLabelCard title={"猪只总数/猪舍数"} total={"2320/30"} />
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <PigWeightCard count={2320} weight={29200} up={"17.1%"}/>
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <FeedConversionCard/>
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <DeviceHealthyCard/>
                    </Col>
                </Row>
                <Row style={{marginBottom:'24px'}}>
                    <DashboradLineChart />
                </Row>
                <Row style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                    <Col className={"chartCard"} span={12}>
                        <GaugeCard/>
                    </Col>
                    <Col className={"chartCard"} span={12}>
                        <PieCard/>
                    </Col>
                </Row>
                <Row>Footer</Row>
            </div>
        )
    }
}

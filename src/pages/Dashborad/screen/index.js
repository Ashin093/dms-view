import React, { Component } from 'react'
import { Card, Row, Col, Icon } from 'antd'
import PigCountLabelCard from './../../../components/Dashborad/LabelCard/PigCountLabelCard'
import PigWeightCard from './../../../components/Dashborad/LabelCard/PigWeightCard';
import FeedConversionCard from './../../../components/Dashborad/LabelCard/FeedConversionCard';
import DeviceHealthyCard from './../../../components/Dashborad/LabelCard/DeviceHealthyCard';
import { Pie } from 'ant-design-pro/lib/Charts';
import './index.less';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import DashboradLineChart from '../../../components/Dashborad/LineChart';

export default class SinglePigHouse extends Component {

    redirect = (id) => {
        document.location = '#/admin/charts/single';
    }

    render() {
        return (
            <div>
                <Row style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                    <Col className={"chartCard"} span={6}>
                        <PigCountLabelCard title={"猪只总数/猪舍数"} total={"2320/30"}/>
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <PigWeightCard count={2320} weight={29200} up={"17.1%"} />
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <FeedConversionCard />
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <DeviceHealthyCard />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Col span={6}>
                        <Card title={"猪舍1"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍2"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'yellow' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={60} subTitle={"健康评分"} total={"60"} height={150} color={'yellow'} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍3"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'red' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={45} subTitle={"健康评分"} total={"45"} height={150} color={"red"} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍4"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Col span={6}>
                        <Card title={"猪舍1"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍2"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'yellow' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={60} subTitle={"健康评分"} total={"60"} height={150} color={'yellow'} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍3"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'red' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={45} subTitle={"健康评分"} total={"45"} height={150} color={"red"} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍4"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Col span={6}>
                        <Card title={"猪舍1"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍2"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'yellow' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={60} subTitle={"健康评分"} total={"60"} height={150} color={'yellow'} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍3"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'red' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={45} subTitle={"健康评分"} total={"45"} height={150} color={"red"} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍4"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Col span={6}>
                        <Card title={"猪舍1"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍2"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'yellow' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={60} subTitle={"健康评分"} total={"60"} height={150} color={'yellow'} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍3"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: 'red' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={45} subTitle={"健康评分"} total={"45"} height={150} color={"red"} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title={"猪舍4"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
                            <Icon type="alert" theme="filled" style={{ fontSize: '22px', color: '#75BDFF' }} />
                        }>
                            <Row>
                                <Col span={6}>
                                    <NumberInfo
                                        subTitle={<span>猪只数量</span>}
                                        total={numeral(200).format('0,0')}
                                    />
                                    <NumberInfo
                                        subTitle={<span>整体估重</span>}
                                        total={numeral(660).format('0,0') + 'KG'}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Pie percent={87} subTitle={"健康评分"} total={"87"} height={150} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginLeft: '-12px', marginRight: '-12px' }}>

                </Row>

            </div>
        )
    }
}

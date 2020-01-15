import React, { Component } from 'react'
import { Card, Row, Col, Icon, Drawer } from 'antd'
import PigCountLabelCard from './../../../../components/Dashborad/LabelCard/PigCountLabelCard'
import PigWeightCard from './../../../../components/Dashborad/LabelCard/PigWeightCard';
import UniformityRatioCard from './../../../../components/Dashborad/LabelCard/UniformityRatioCard';
import StandarDeviationCard from './../../../../components/Dashborad/LabelCard/StandarDeviationCard';
import { Pie } from 'ant-design-pro/lib/Charts';
import './index.less';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import Video from './../../../../components/Video';
import CoughChart from '../../../../components/Dashborad/LineChart/CoughChart';
import SportChart from '../../../../components/Dashborad/LineChart/SportChart';
import DashboradLineChart from '../../../../components/Dashborad/LineChart';
import WeightChat from '../../../../components/Dashborad/LineChart/WeightChat';

export default class SinglePigHouse extends Component {
    state = {
        visible: false,
        hls:''
    }
    redirect = (id) => {
        // document.location = '/admin/charts/single';
        this.setState({
            visible:true,
            hls:id
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Row style={{ marginLeft: '-12px', marginRight: '-12px' }}>
                    <Col className={"chartCard"} span={6}>
                        <PigCountLabelCard title={"猪只总数"} total={"30"} />
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <PigWeightCard count={30} weight={30*42.5} up={"17.1%"} />
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <UniformityRatioCard/>
                    </Col>
                    <Col className={"chartCard"} span={6}>
                        <StandarDeviationCard />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <DashboradLineChart/>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Col span={6}>
                        <Card title={"栏位1"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位2"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位3"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位4"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位5"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位6"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位7"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位8"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位9"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位10"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位11"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位12"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位13"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位14"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位15"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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
                        <Card title={"栏位16"} hoverable={true} onClick={() => { this.redirect('1') }} extra={
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

                <Drawer
                    title={"实时监控录像"}
                    placement={"right"}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={800}
                >
                    <Video hls={this.state.hls}></Video>
                    <Card title={"栏位估重"} bordered={false}>
                        <WeightChat />
                    </Card>
                </Drawer>
            </div>
            
        )
    }
}

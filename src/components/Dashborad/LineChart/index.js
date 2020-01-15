import React, { Component } from 'react'
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Tabs, DatePicker } from 'antd';
import utils from './../../../utils/utils'
import './index.less';
import SportChart from './SportChart';
import CoughChart from './CoughChart';
import WeightChat from './WeightChat';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
export default class DashboradLineChart extends Component {
    state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: utils.getTimeDistance('year')
    }

    isActive = type => {
        const { rangePickerValue } = this.state;
        const value = utils.getTimeDistance(type);

        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }

        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return 'currentDate';
        }

        return '';
    };

    selectDate = type => {

        this.setState({
            rangePickerValue: utils.getTimeDistance(type),
        });

    };

    

    tabOnChange = (key) => {
        this.setState({
            currentTabKey:key
        })
    }

    render() {
        return (
            <div className={"salesCard"}>
                <Card bordered={true} bodyStyle={{padding:10}}>
                    <Tabs
                        defaultActiveKey={"1"}
                        onChange={this.tabOnChange}
                        tabBarExtraContent={
                            this.state.currentTabKey === '1'?'':
                            (<div>
                                <div className={"salesExtra"}>
                                    <a className={this.isActive('today')} onClick={()=>this.selectDate('today')}>
                                        <FormattedMessage
                                            id="dashboard-analysis.analysis.all-day"
                                            defaultMessage="今日"
                                        />
                                    </a>
                                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                                        <FormattedMessage
                                            id="dashboard-analysis.analysis.all-week"
                                            defaultMessage="本周"
                                        />
                                    </a>
                                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                                        <FormattedMessage
                                            id="dashboard-analysis.analysis.all-month"
                                            defaultMessage="本月"
                                        />
                                    </a>
                                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                                        <FormattedMessage
                                            id="dashboard-analysis.analysis.all-year"
                                            defaultMessage="全年"
                                        />
                                    </a> 
                                </div>
                                <RangePicker
                                    value={this.state.rangePickerValue}
                                    // defaultValue={this.state.rangePickerValue}
                                    // onChange={handleRangePickerChange}
                                    style={{
                                        width: 256,
                                    }}
                                />
                            </div>)
                        }
                        size="large"
                        tabBarStyle={{
                            marginBottom: 24,
                        }}
                    >
                            <TabPane tab={<TabPaneFormat title={"运动量"}/>} key={"1"}>
                                    <SportChart/>
                            </TabPane>
                            <TabPane tab={<TabPaneFormat title={"咳喘指数"} />} key={"2"}>
                                    <CoughChart/>
                            </TabPane>
                            <TabPane tab={<TabPaneFormat title={"整体估重"} />} key={"3"}>
                                    <WeightChat/>
                            </TabPane>
                        </Tabs>
                </Card>
            </div>
        )
    }
}

class TabPaneFormat extends Component{
    render() {
        return (
            <span style={{ fontSize: 'larger' }}>{this.props.title}</span>
        )
    }
}
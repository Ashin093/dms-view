import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App.js'
// import Admin from './admin'
import Layout from './layout'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loading from "./pages/ui/Loading"
import Notification from "./pages/ui/Notification"
import Message from './components/layout/Message'
import Tabs from "./pages/ui/tabs"
import Gallery from "./pages/ui/Gallery"
import Bar from "./pages/echarts/bar"
import Gauge from "./components/Charts/Gauge"
import LineChart from "./components/Charts/LineChart"
import LabelChart from "./components/Charts/LabelChart"
import Video from "./components/Video"
import LabelDetail from "./components/Charts/LabelDetail"
import CoughLineChart from "./components/Charts/CoughLineChart"
import WeightRiseLineChart from "./components/Charts/WeightRiseLineChart"
import Carousels from "./pages/ui/Carousel"
import LoginDemo from './pages/login'
import SoundDeviceList from './components/ServiceComponents/SoundDevice/list/index.js';
import PigHouse from './components/ServiceComponents/PigHouseService/list';
import EcDevice from './components/ServiceComponents/EcDevice/list/index.js';
import Dashborad from './pages/Dashborad/index.js';
import ResetPwd from './pages/resetpwd';
import VideoDeviceList from './components/ServiceComponents/VideoDevice/list/index.js';
import PigCountLabelCard from './components/Dashborad/LabelCard/PigCountLabelCard/index.js';
import PigWeightCard from './components/Dashborad/LabelCard/PigWeightCard/index.js';
import FeedConversionCard from './components/Dashborad/LabelCard/FeedConversionCard/index.js';
import DeviceHealthyCard from './components/Dashborad/LabelCard/DeviceHealthyCard/index.js';
import DashboradLineChart from './components/Dashborad/LineChart/index.js';
import UserProfile from './components/ServiceComponents/UserService/UserProfile/index.js'
import Screen from './pages/Dashborad/screen/index.js'
import SinglePigHouse from './pages/Dashborad/screen/singlePigHouse/index.js'
import changeForm from './pages/demo/changeForm/index.js'
// import ResetPwd from './pages/resetpwd/index.js';

export default class IRouter extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path="/login" component={LoginDemo} />
                            {/* <Route path={"/password_reset"} component={ResetPwd} /> */}
                            {/* <Route path="/admin" render={() =>
                                <Admin>
                                    <Switch>
                                        <Route path="/admin/ui/buttons" component={Buttons} />
                                        <Route path={"/admin/ui/modals"} component={Modals} />
                                        <Route path={"/admin/ui/loadings"} component={Loading} />
                                        <Route path={"/admin/ui/notification"} component={Notification} />
                                        <Route path={"/admin/ui/messages"} component={Message} />
                                        <Route path={"/admin/ui/tabs"} component={Tabs}></Route>
                                        <Route path={"/admin/ui/gallery"} component={Gallery}></Route>
                                        <Route path={"/admin/ui/carousel"} component={Carousels}></Route>
                                    </Switch>
                                </Admin>
                            } /> */}
                            <Route path="/admin" render={() =>
                                <Layout>
                                    <Switch>
                                        <Route path={"/admin/ui/buttons"} component={Buttons} />
                                        <Route path={"/admin/ui/modals"} component={Modals} />
                                        <Route path={"/admin/ui/loadings"} component={Loading} />
                                        <Route path={"/admin/ui/notification"} component={Notification} />
                                        <Route path={"/admin/ui/messages"} component={Message} />
                                        <Route path={"/admin/ui/tabs"} component={Tabs}></Route>
                                        <Route path={"/admin/ui/gallery"} component={Gallery}></Route>
                                        <Route path={"/admin/ui/carousel"} component={Carousels}></Route>
                                        <Route path={"/admin/dev/soundDev"} component={SoundDeviceList}></Route>
                                        <Route path={"/admin/pigHouse/list"} component={PigHouse}></Route>
                                        <Route path={"/admin/dev/environmentalDev"} component={EcDevice}></Route>
                                        <Route path={"/admin/dev/videoDev"} component={VideoDeviceList}></Route>
                                        <Route path={"/admin/charts/dashboard"} component={Dashborad}></Route>
                                        <Route path={"/admin/charts/screen"} component={Screen}></Route>
                                        <Route path={"/admin/user/profile"} component={UserProfile}></Route>
                                        <Route path={"/admin/charts/single"} component={SinglePigHouse}></Route>
                                    </Switch>
                                </Layout>
                            } />
                            <Route path={"/password_reset"} component={ResetPwd}></Route>
                            <Route path={"/charts/bar"} component={Bar} />
                            <Route path={"/charts/gauge"} component={Gauge} />
                            <Route path={"/charts/line"} component={LineChart} />
                            <Route path={"/order/detail"} component={LineChart} />
                            <Route path={"/charts/labelChart"} component={LabelChart} />
                            <Route path={"/charts/video"} component={Video} />
                            <Route path={"/charts/labelDetail"} component={LabelDetail} />
                            <Route path={"/charts/cough"} component={CoughLineChart} />
                            <Route path={"/charts/weightRise"} component={WeightRiseLineChart} />
                            <Route path={"/dashborad/pigCount"} component={PigCountLabelCard} />
                            <Route path={"/dashborad/pigWeight"} component={PigWeightCard} />
                            <Route path={"/dashborad/fcr"} component={FeedConversionCard} />
                            <Route path={"/dashborad/deviceHealthy"} component={DeviceHealthyCard} />
                            <Route path={"/dashborad/line"} component={DashboradLineChart} />
                            <Route path={"/demo"} component={changeForm}/>
                            <Route path="/" render={() => (
                                localStorage.getItem('user')?<Redirect to={"/admin/dev/soundDev"} />: <Redirect to={"/login"} />
                            )} />
                            {/*<配置404页面路由>*/}
                            <Route component={NoMatch} />
                        </Switch>
                    </App>
                </HashRouter>
            </div>
        );
    }
}


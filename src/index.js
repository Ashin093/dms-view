import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store/configureStore';

const store = configureStore();
moment.locale('cn');

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <Router />
        </LocaleProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import axios from "./utils/axiosUtil";
// import settings from './config/settings';
// // let SWF_PATH = require('./../public/ckplayer/ckplayer.swf');

// async function initSystem() {

//     await axios.get('http://' + settings.dataSource.ip + ':' + settings.dataSource.port + '/parse/classes/Device', {
//         where: '{"pigHouse":{"__type":"Pointer","className":"PigHouse","objectId":"' + settings.pigHouseKey + '"}}'
//     }).then(res => {
//         settings.deviceKey = res.data.results[0].objectId;
//         settings.networkState = true;
//         console.log('设备数id查询成功：', res.data.results[0].objectId);
//     });
//     // console.log('SWF_PATH====',SWF_PATH);
//     ReactDOM.render(<Router />, document.getElementById('root'));




//     // If you want your app to work offline and load faster, you can change
//     // unregister() to register() below. Note this comes with some pitfalls.
//     // Learn more about service workers: https://bit.ly/CRA-PWA
//     serviceWorker.unregister();
// }

// initSystem().catch(reason => {
//     console.log('系统初始化失败:', reason);
//     // process.exit(0);
//     settings.networkState = false;
//     ReactDOM.render(<Router />, document.getElementById('root'));
// });
// import React, {Component} from 'react';
// import './index.less';
// require('./.././../../node_modules/p2p-ckplayer/ckplayer/ckplayer.js');
//
//
// export default class Video extends Component {
//     constructor(props){
//         super(props);
//     }
//
//     componentWillMount() {
//
//     }
//
//     componentDidMount() {
//
//         let videoObject = {
//             container: '#video', //容器的ID或className
//             variable: 'player',//播放函数名称
//             autoplay:true,
//             live:true,
//             loop:true,
//             video: 'rtmp://58.200.131.2:1935/livetv/hunantv'
//             // video: 'rtmp://10.4.23.13:1935/live/test1'
//         };
//         new window.ckplayer(videoObject);
//     }
//
//     render() {
//         return (
//             <div className={'video-container'} >
//                 <div id={"video"} style={{width: '600px', height: '452px'}}></div>
//             </div>
//         );
//     }
// }

// import React from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import video from 'videojs-contrib-hls';
//
// export default class VideoPlayer extends React.Component {
//     componentDidMount() {
//         // instantiate Video.js
//         // this.props.html5 = {
//         //     hls:{
//         //         withCredentials:true
//         //     }
//         // }
//         // this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//         //     console.log('onPlayerReady', this);
//         //     this.html5 = {
//         //         hls:{
//         //             withCredentials: true
//         //         }
//         //     }
//         // });
//         this.player = videojs(this.videoNode,{
//             sources:[
//                 {
//                     src:'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
//                     type:'application/x-mpegURL',
//                     withCredentials:true
//                 }
//             ]
//         },function onPlayerReady() {
//             console.log('onPlayerReady', this);
//             this.play();
//         });
//         // this.player.src({
//         //     src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
//         //     type:'application/x-mpegURL',
//         //     withCredentials:true
//         // })
//     }
//
//     // destroy player on unmount
//     componentWillUnmount() {
//         if (this.player) {
//             this.player.dispose()
//         }
//     }
//
//     // wrap the player in a div with a `data-vjs-player` attribute
//     // so videojs won't create additional wrapper in the DOM
//     // see https://github.com/videojs/video.js/pull/3856
//     render() {
//         return (
//             <div>
//                 <div data-vjs-player>
//                     <video ref={ node => this.videoNode = node } className="video-js"></video>
//                 </div>
//             </div>
//         )
//     }
// }
import React, { Component } from 'react';
import VideoJsForReact from 'videojs-for-react';
import settings from './../../config/settings';
class App extends Component {
    constructor() {
        super();
        this.state = {
            videoJsOptions: {
                preload: 'auto',  // 预加载
                bigPlayButton: {},  // 大按钮
                autoplay: true,   // 自动播放
                controls: false,  // 是否开启控制栏
                width:730,//623
                height:490,
                playbackRates: [1, 1.5, 2], // 播放倍速
                sources: [  // 视频源
                    {
                        // src: 'http://10.4.22.53:3000/video/pig2.mp4',
                        // type: 'video/mp4'
                        src: settings.hls_address,
                        type: 'application/x-mpegURL',
                        label: 'HLS1',
                        withCredentials: false,
                        res: 960
                    },{
                        src: 'http://106.46.168.17:33000/video/pig2.mp4',
                        type: 'video/mp4'
                    }
                ]
            }
        }
    }

    render() {
        return (
            <div className="player">
                <VideoJsForReact

                    sourceChanged={(player) => console.log(player)}
                    onReady={(player) => console.log('准备完毕', player)}
                    {...this.state.videoJsOptions}

                />

            </div>
        )
    }
}

export default App;

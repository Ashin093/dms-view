import React, {Component} from 'react';
import {Card,Carousel} from 'antd';
import './../../../resource/ui.less';
export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title={"图片背景轮播"} className={"card-wrap"}>
                    <Carousel>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>

                <Card title={"图片背景轮播(自动切换)"} className={"card-wrap"}>
                    <Carousel autoplay effect={"fade"}>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}


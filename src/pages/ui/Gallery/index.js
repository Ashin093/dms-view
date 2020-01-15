import React, {Component} from 'react';
import {Card, Row, Col, Modal} from 'antd';


export default class Gallery extends Component {


    state = {visible:false};

    openGallery = (imgSrc) =>{
        let img = require('./../../../resource/gallery/'+imgSrc);
        this.setState({
            currentImg:imgSrc,
            visible : true,
            imgs :img
        })
    }

    render() {
        const imgs = [];
        let count = 1;
        for(let i = 0 ; i < 5; i++){
            let tmpArr = [];
            for(let j = 0; j < 5; j++,count++){
                tmpArr.push(count +'.png');
            }
            imgs.push(tmpArr);
        }
        console.log(imgs);
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                style={{marginBottom:10}}
                cover={<img alt={''} src={require('./../../../resource/gallery/'+item)} onClick={()=>this.openGallery(item)}/>}>
                <Card.Meta title={"图片"+item.split('.')[0]} description={"iflytek.com"}></Card.Meta>
            </Card>
        ));
        return (
            <div>
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal visible={this.state.visible} onCancel={()=>{
                    this.setState({visible:false})}}
                    footer={null}
                >
                    <img alt={''} src={this.state.imgs}/>
                </Modal>
            </div>
        );
    }
}

import React, {Component} from 'react';
import './../buttons/index.less';
import {message, Card, Button} from 'antd';

export default class Message extends Component {

    showMessage=(type)=>{
        message[type]('Message content');
    }

    render() {
        return (
            <div>
                <Card title={"Message提示框"} className={"card-wrap"}>
                    <Button type={"primary"} onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type={"primary"} onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type={"primary"} onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type={"primary"} onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type={"primary"} onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}


import React, {Component} from 'react';
import {notification , Card, Button} from 'antd';
import './../buttons/index.less'
export default class Notification extends Component {

    openNotification=(type,placement)=>{
        notification[type]({
            message:'通知提醒',
            description:'这里是通知内容',
            onClick:()=>{
                console.log('notification clicked');
            },
            placement:placement?placement:'topRight'
        })
    }

    render() {
        return (
            <div>
                <Card title={"通知提醒"} className={"card-wrap"}>
                    <Button type={"primary"} onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
                    <Button type={"primary"} onClick={()=>this.openNotification('info','topRight')}>Info</Button>
                    <Button type={"primary"} onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type={"primary"} onClick={()=>this.openNotification('error','bottomRight')}>Error</Button>
                    <Button type={"primary"} onClick={()=>this.openNotification('info')}>DefaultPlacement</Button>
                </Card>
            </div>
        );
    }
}


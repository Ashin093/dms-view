import React, {Component} from 'react';
import { Card, Icon, Alert, Spin} from 'antd';
import './../buttons/index.less';

export default class Loading extends Component {
    render() {
        const icon = <Icon type={"loading"} style={{fontSize:24}}/>
        return (
            <div>
                <Card title={"Spin实例"} className={"card-wrap"}>
                    <Spin size={"small"}/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size={"large"}/>

                    <Spin indicator={icon} style={{margin:10}}/>
                </Card>

                <Card title={"内容遮罩"} className={"card-wrap"}>
                    <Alert message={"React Alert"} description={"这里是Alert内容！"} type={"info"}/>
                    <Spin>
                        <Alert message={"React Alert"} description={"这里是Alert内容！"} type={"warning"}/>
                    </Spin>
                    <Spin tip={"Loading..."}>
                        <Alert message={"React Alert"} description={"这里是Alert内容！"} type={"warning"}/>
                    </Spin>
                    <Spin tip={"Loading..."} indicator={icon}>
                        <Alert message={"React Alert"} description={"这里是Alert内容！"} type={"warning"}/>
                    </Spin>
                </Card>
            </div>
        );
    }
}


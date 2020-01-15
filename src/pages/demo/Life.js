import React from 'react';
import Child from './Child';
import './index.less';
import {Button} from 'antd';
import {Input} from "antd";
// import 'antd/dist/antd.css';


export default class Life extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
    }

    handelAdd=()=>{
        this.setState({
            count : this.state.count+1
        })
    }

    render() {
        return <div className="content">
            <p>React生命周期介绍</p>
            <Input />
            <Button onClick={this.handelAdd}>AntD点击一下</Button>
            <button onClick={this.handelAdd}>点击一下</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}/>
        </div>
    }
}
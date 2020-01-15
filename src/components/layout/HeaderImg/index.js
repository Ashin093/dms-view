import React, { Component } from 'react'
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import jwtUtil from './../../../utils/jwtUtil';
import apiAxios from './../../../utils/axiosUtil/apiAxios'
// import { NavLink } from 'react-router-dom';
import './index.less';
const personal_profile_menu = [
    {
        key: 0,
        url: '',
        title: '个人中心',
        icon: 'user',
        onClick: () => {
            document.location='/#/admin/user/profile'
        }
    }, {
        key: 1,
        url: '',
        title: '个人设置',
        icon: 'setting'
    }, {
        key: 2,
        isDivider:true
    },
    {
        key: 3,
        url: '',
        title: '退出登录',
        icon: 'poweroff',
        onClick: () => {
            apiAxios.ajax({
                url:'/logout'
            }).then(res => {
                if (res.data.code === 5000) {
                    localStorage.removeItem('user');
                    document.location = "/";
                }
            })
        }
    }
];

export default class index extends Component {
    state = {
        user:{}
    }
    componentWillMount() {
        let usertoken = localStorage.getItem('user');
        let user = jwtUtil.decode(usertoken);
        this.setState({ user });
        console.log("=======***",user);
    }
    render() {
        return (
            <div>
                <Dropdown className={"dropContainer"} overlay={
                    <Menu className={"dropDown"}>
                        {
                            personal_profile_menu.map(item => {
                                if (item.isDivider) {
                                    return <Menu.Divider key={'iflytek'}></Menu.Divider>
                                } else {
                                    return <Menu.Item key={item.key} title={item.title} onClick={item.onClick}><Icon type={item.icon}/>{item.title}</Menu.Item>
                                }
                            })
                        }
                    </Menu>
                }>
                    <div>
                        <Avatar
                        className={"header"}
                            size={""}
                            icon={"user"}
                            // style={{backgroundColor:'#87d068'}}
                            src={"http://img4.cache.netease.com/photo/0026/2014-10-24/A9ASN7VU43AJ0026.jpg"}
                        >
                        </Avatar>
                        {
                            <span className={"name"}>
                                {
                                    this.state.user?(this.state.user.nikename || this.state.user.username):''
                                }
                            </span>
                        }
                    </div>
                </Dropdown>
            </div>
        )
    }
}



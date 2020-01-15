import React, { Component } from 'react'
import 'ant-design-pro/dist/ant-design-pro.css'; 
import Login from 'ant-design-pro/lib/Login';
import apiAxios from './../../utils/axiosUtil/apiAxios';
import JWT from './../../utils/jwtUtil';
import './index.less'
import { Alert, Checkbox, notification, message } from 'antd';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const { Tab, UserName, Password,  Submit } = Login;
// const videoFile = require('./../../../public/video/Plexus_Space_Background.mp4')
class LoginDemo extends Component {

    componentDidMount() {
        // 屏蔽右键菜单
        document.oncontextmenu = () => {
            return false;
        }

        document.onkeydown = e => {
            if (e.keyCode === 13 && document.location.hash === '#/login') {
                document.getElementById('submit').click();
            }
        }
    }
    
    state = {
        notice: '',
        type: 'tab1',
        autoLogin: true,
        alertVisible: false
    };
    onSubmit = (err, values) => {
        console.log('value collected ->', {
            ...values,
            autoLogin: this.state.autoLogin,
        });
        if (this.state.type === 'tab1') {
            this.setState(
                {
                    notice: '',
                },
                () => {
                    //这里获取输入的用户名密码进行身份校验
                    if (!err) {
                        let token = JWT.encode(values);
                        apiAxios.ajax({
                            url: '/login',
                            data: {
                                params: {
                                    token,
                                }
                            },
                            selfHandle: true
                        }).then(res => {
                            console.log(res);
                            document.oncontextmenu = () => {
                                return true;
                            };
                            if (res.data.code === 5000) {
                                //登录成功后的逻辑
                                if (this.state.autoLogin) {
                                    let token = res.data.data;
                                    // let user = JSON.stringify(JWT.decode(token));
                                    localStorage.setItem('user', token);
                                }
                                document.location = '/#/admin/dev/soundDev'
                            } else {
                                this.setState({
                                    notice:'用户名或密码错误！'
                                })
                            }
                        })
                    }
                }
            );
        }
    };
    onTabChange = key => {
        this.setState({
            type: key,
        });
    };
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };
    handleIconClick = () => {
        notification['info']({
            message: '通知：',
            description: '当前版本暂不支持，将在后续版本中推出.',
            duration:2.5
        })
    }
    render() {
        return (
            <div className={'bak'}>
                <video muted autoPlay={'autoplay'} loop={'loop'}>
                    <source src={'./video/Plexus_Space_Background.mp4'}>
                    </source>
                </video>
                <div className="login-warp">
                    <Login defaultActiveKey={this.state.type} onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}>
                        <Tab key="tab1" tab="用户名密码登录">
                            {this.state.notice && (
                                <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error"
                                    showIcon closable />
                            )}
                            <UserName
                                name="username"
                                placeholder="请输入用户名"
                                rules={[{required:true,message:'请输入用户名'}]}
                            />
                            <Password
                                name="pin"
                                placeholder="密码"
                                rules={[{required:true,message:'请输入密码'}]}
                            />
                        </Tab>
                        {/*
                            <Tab key="tab2" tab="Mobile">
                                <Mobile name="mobile" />
                                <Captcha onGetCaptcha={()=>console.log('Get captcha!')} name="captcha" />
                            </Tab>
                        */}
                        <div>
                            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin} className={'toolbar'}>
                                记住我
				            </Checkbox>
                            <a style={{ float: 'right' }} href="/#/password_reset">
                                忘记密码
				            </a>
                        </div>
                        <Submit id={"submit"}>
                            登录
			            </Submit>
                        <div className={'toolbar'}>
                            社交帐号登录
				            <span className="icon icon-alipay" onClick={this.handleIconClick}/>
                            <span className="icon icon-taobao" onClick={this.handleIconClick}/>
                            <span className="icon icon-weibo" onClick={this.handleIconClick}/>
                            <a style={{ float: 'right' }}  onClick={this.handleIconClick}>
                                注册
				            </a>
                        </div>
                    </Login>
                </div>
            </div>
        );
    }
}

export default LoginDemo;
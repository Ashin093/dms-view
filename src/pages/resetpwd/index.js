import React, { Component } from 'react'
import { Form, Input, Button,notification } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import Login from 'ant-design-pro/lib/Login';
import md5 from 'md5';
import apiAxios from './../../utils/axiosUtil/apiAxios';
import './index.less'

const FormItem = Form.Item;
const { Tab, UserName, Password, Submit, Mobile, Captcha } = Login;

class ResetPwd extends Component {

    state = {
        notice: '',
        type: 'tab2',
        autoLogin: true,
        step: 1,
        alertVisible: false
    };

    componentDidMount() {
        //屏蔽右键菜单
        // document.oncontextmenu = () => {
        //     return false;
        // }
    }


    onSubmit = (err, values) => {
        console.log('value collected ->', {
            ...values,
            autoLogin: this.state.autoLogin,
        });
        // if (this.state.type === 'tab1') {
        //     this.setState(
        //         {
        //             notice: '',
        //         },
        //         () => {
        //             //这里获取输入的用户名密码进行身份校验
        //             if (!err && (values.username !== 'admin' || values.password !== 'admin')) {
        //                 setTimeout(() => {
        //                     this.setState({
        //                         // notice: 'The combination of username and password is incorrect!',
        //                         notice: '您输入的账号或密码不正确！',
        //                     });
        //                 }, 500);
        //             } else {
        //                 //登录成功后的逻辑
        //                 document.location = '/#/admin'
        //             }
        //         }
        //     );
        // }
        let phoneNumber = values.mobile;
        let captcha = values.captcha; 
        apiAxios.ajax({
            url: '/resetPwd',
            data: {
                params: {
                    number: phoneNumber,
                    code:captcha
                }
            }
        }).then(res => {
            if (res.data.code === 5000) {
                this.onTabChange('tab3');
            } else {
                notification['info']({
                    message: '通知：',
                    description: '请输入正确的验证码',
                    duration: 2.5
                })
            }
        })
        
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
            duration: 2.5
        })
    }
    handleCheckCaptcha = () => {
        //调用发送验证码接口
        let number = document.getElementById('mobile').value;
        console.log(number)
        apiAxios.ajax({
            url: '/sendSms',
            data: {
                params: {
                    number
                }
            }
        }).then(res => {
            if (res.data.code !== 5000) {
                notification['error']({
                    message: '异常：',
                    description: '验证码服务异常，请联系管理员',
                    duration: 2.5
                })
            }
        })
    }

    handleSubmitReset = (err,values) => {
        this.props.form.validateFields((err, values) => {
            console.log(err);
            if (err) {
                return;
            }
            let newPwd = values.newPwd;
            let rePwd = values.rePwd;
            if (newPwd === rePwd) {
                apiAxios.ajax({
                    url: '/updatePwd',
                    data: {
                        params: {
                            pin:rePwd,
                            md5Pin:md5(rePwd)
                        }
                    }
                }).then(res => {
                    if (res.data.code === 5000) {
                        notification['success']({
                            message: '成功：',
                            description: '密码修改成功，请转到登录页面重新登录。',
                            duration: 2.5
                        })
                        setTimeout(() => {
                            document.location='/login'
                        },3000)
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={'bak'}>
                <div className="login-warp">
                   
                    {
                        this.state.type === 'tab2' ?
                            <Login defaultActiveKey={this.state.type} onTabChange={this.onTabChange}
                                onSubmit={this.onSubmit}>
                                <Tab key="tab2" tab="手机找回">
                                    <Mobile name="mobile" />
                                    <Captcha onGetCaptcha={this.handleCheckCaptcha} name="captcha" />
                                </Tab>
                                <Submit>
                                    提交
                                </Submit>
                            </Login>
                            :
                            <Login>
                                <Form layout={"inline"} onSubmit={this.handleSubmitReset} >
                                    <FormItem label={"新密码"} key={"newPassword"}>
                                        {
                                            // eslint-disable-next-line no-undef
                                            getFieldDecorator('newPwd', {
                                                rules: [{ required: true, message: '请输入新密码' }, { max: 15, message: '密码长度请不要超过15位' }]
                                            })(
                                                <Input type={"text"} placeholder={""} style={{ width: 300 }} />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label={"确认新密码"} key={"rePassword"}>
                                        {
                                            // eslint-disable-next-line no-undef
                                            getFieldDecorator('rePwd', {
                                                rules: [{ required: true, message: '请再次输入新密码' }, { max: 15, message: '密码长度请不要超过15位' }]
                                            })(
                                                <Input type={"text"} placeholder={""} style={{ width: 300 }} />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {/* <Button type={"primary"} htmlType={"submit"}>提交</Button> */}
                                        <Submit style={{ width: 300 }}>
                                            提交
                                        </Submit>
                                    </FormItem>
                                </Form>
                            </Login>
                    }
                </div>
            </div>
        );
    }
}

export default Form.create({})(ResetPwd);
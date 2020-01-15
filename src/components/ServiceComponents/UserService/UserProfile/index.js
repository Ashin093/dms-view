import React, { Component } from 'react'
import { Input, Form, Select, Upload, Icon, message, Button, Row, Col, Card, Tooltip, Modal} from 'antd';
import jwtUtil from './../../../../utils/jwtUtil';
import settings from './../../../../config/settings';
import apiAxios from './../../../../utils/axiosUtil/apiAxios'
const Option = Select.Option
const FormItem = Form.Item;
let user = {};

class UserProfile extends Component {
    state = {
        loading:false
    }

    componentWillMount() {
        let userToken = localStorage.getItem('user');
        user = jwtUtil.decode(userToken);
        if (!user) {
            document.location = "/";
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;
            values.avatar = this.state.imageUrl
            apiAxios.ajax({
                url: '/updateUser',
                data: {
                    params: values
                },
                method:'post'
            }).then(res => {
                if (res.data.code === 5000) {
                    Modal.success({
                        title: '提示：',
                        content: '操作成功，请重新登录。',
                        onOk: () => {
                            document.location = '/login'
                        },
                        afterClose: () => {
                            document.location = '/login'
                        }
                    })
                }
            })
        })
    }

    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadUrl = 'http://' + settings.api.ip + ':' + settings.api.port + '/uploadimg';
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="1">+1</Option>
            </Select>,
        );
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Card title={"个人中心"} style={{height:"100%"}}>
                <Row>
                <Col span={8}></Col>
                <Col span={8}>
                        <Form {...formItemLayout} labelAlign={"left"} onSubmit={this.handleSubmit} style={{ marginTop: '80px' }} enctype="multipart/form-data">
                            <FormItem label={"用户名"} key={"username"}>
                                {
                                    getFieldDecorator("username", {
                                        initialValue: user.username,
                                        rules: [{ max: 10, message: '用户名最长不超过10位' }, { required: true, message: '该项为必填项' }]
                                    })(
                                        <Input type={"text"} placeholder={"用户名"} disabled={"disabled"} />
                                    )
                                }
                            </FormItem>
                            <FormItem label={
                                <span>
                                    昵称/姓名&nbsp;
                                    <Tooltip title="您的姓名,代号或职称">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }
                                key={"nickname"}
                            >
                                {
                                    getFieldDecorator("nickname", {
                                        initialValue: user.nickname,
                                        rules: [{ max: 10, message: '昵称最长不超过10位' }]
                                    })(
                                        <Input type={"text"} placeholder={"昵称/姓名"} />
                                    )
                                }
                            </FormItem>
                            <FormItem label={"邮箱地址"} key={"email"}>
                                {
                                    getFieldDecorator("email", {
                                        initialValue: user.email,
                                        rules: [{ type: 'email', message: '请输入正确的邮箱地址' }]
                                    })(
                                        <Input type={"text"} placeholder={"邮箱地址"} />
                                    )
                                }
                            </FormItem>
                            <FormItem label={"手机号码"} key={"telephone"}>
                                {
                                    getFieldDecorator("telephone", {
                                        initialValue: user.telephone,
                                        rules: [{ required: true, message: '请输入您的手机号码' }]
                                    })(
                                        <Input addonBefore={prefixSelector} type={"text"} style={{ width: '100%' }} />
                                    )
                                }
                            </FormItem>
                            <FormItem label={"头像"} key={"avatar"}>
                                {
                                    getFieldDecorator("avatar", {

                                    })(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            style={{ width: '128px', height: '100px' }}
                                            showUploadList={false}
                                            action={uploadUrl}
                                            beforeUpload={this.beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    )
                            }
                            </FormItem>
                            <FormItem key={new Date().getTime()}>
                                <Button type={"primary"} htmlType={"submit"} style={{width:'106px'}}>提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </Card>
        )
    }
}

export default Form.create({})(UserProfile);
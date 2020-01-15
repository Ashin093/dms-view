import React, {Component} from 'react';
import MenuConfig from './../../../config/menuConfig';
import {Menu,Icon} from 'antd';
import './index.less';
import { NavLink } from 'react-router-dom';
import settings from './../../../config/settings'
import { connect } from 'react-redux';
import { switchMenu } from './../../../redux/action';
import { withRouter } from 'react-router-dom'

const SubMenu = Menu.SubMenu;

// const MenuItemGroup = Menu.ItemGroup;
@withRouter
class NavLeft extends Component {

    state = {
        title: '',
        currentKey:''
    }

    componentWillMount() {
        //加载menu数据
        const menuTreeNode = this.renderMenu(MenuConfig);
        
        console.log(this.props.location);
        this.setState({
            menuTreeNode: menuTreeNode,
            currentKey: this.props.location.pathname,
            defaultOpenKeys:[this.getDefaulOpenKey()]
        })
    }

    getDefaulOpenKey = () => {
        
        let length = this.props.location.pathname.split('/').length;
        return '/' + this.props.location.pathname.split('/')[length - 2];
    }
    //利用递归的思想渲染菜单
    renderMenu=(data)=>{
        return data.map((item)=>{
            console.log(item.key);
            if(item.children){
               return (
                   <SubMenu
                       title={
                           <span>
                               <Icon type={item.icon} />
                               <span>{item.title}</span>
                           </span>
                       }
                       key={item.key}
                    > 
                        {this.renderMenu(item.children)}
                   </SubMenu>
               )
            }
            return (
                <Menu.Item key={item.key}
                title={item.title}
                onClick={this.handleClick}>
                    <NavLink to={item.key}>
                        <span>
                            {item.title}
                        </span>
                    </NavLink>
                </Menu.Item>
            )
        })
    }

    handleClick = ({ item, key }) => {
        if (key === this.state.currentKey) {
            return false;
        }
        console.log(switchMenu)
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));
        this.setState({
            title: item.title,
            currentKey:key
        })
    }

    render() {

        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <span><h1>{settings.default_title}</h1></span>
                </div>
                <Menu theme="dark" mode={"inline"} defaultSelectedKeys={[this.state.currentKey]} defaultOpenKeys={this.state.defaultOpenKeys}>
                    {/*<SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>*/}
                    {/*    <Menu.Item key="1">Option 1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">Option 2</Menu.Item>*/}
                    {/*    <Menu.Item key="3">Option 1</Menu.Item>*/}
                    {/*    <Menu.Item key="4">Option 2</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}

export default connect()(NavLeft);
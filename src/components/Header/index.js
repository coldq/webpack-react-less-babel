// import Menu from 'antd/lib/menu';
// import Icon from 'antd/lib/icon';
import {Menu,Icon,Row,Col,Popover} from 'antd';
import React, { PureComponent } from 'react';
import logo from '../../image/sunflower.svg';
import './style.scss';
import { Link, IndexLink } from 'react-router';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const content = (
  <div className="pop-content">
    <p>首页</p>
    <p>分类</p>
    <p>标签</p>
  </div>
);

class Header extends PureComponent {
   constructor(props) {
        super(props);
        this.state = {
          current: 'index',
        };
       
   }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
          <Row>
              <Col xs={0} sm={24} md={24} lg={24} xl={24} className="wapper" style={{padding:'0 50px'}}> 
                <img src={logo} className="Logo"  alt="logo"/>
                <span className="title">ColdQ的博客</span>
              <Menu 
                theme="dark"
                onClick={(e)=>this.handleClick(e)}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                style = {{lineHeight:"64px",width:'450px',float:'right',fontSize:'15px'}}
              >
                <Menu.Item key="github" style = {{float:'right'}} >
                   <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Icon type="github" />ColdQ</a>
                </Menu.Item>
                <Menu.Item key="tag"  style = {{float:'right'}}>
                  <Icon type="edit" />写文章
                </Menu.Item>
                <Menu.Item key="categories"  style = {{float:'right'}}>
                  <Icon type="appstore-o" />分类
                </Menu.Item>
                <Menu.Item key="index" style = {{float:'right'}}>
                  <IndexLink to="/"><Icon type="coffee" />首页</IndexLink>
                </Menu.Item>
              </Menu>            
            </Col>
            {/* 适应移动端 */}
            <Col xs={24} sm={0} md={0} lg={0} xl={0} className="wapper" style={{padding:'0 20px'}}>
                <img src={logo} className="Logo"  alt="logo"/>
                <div className="title">ColdQ的博客</div>
                
                  <Popover content={content} trigger="click">
                    <div  style={{float:'right',lineHeight:'64px',height:'64px'}}> 
                        <Icon type="menu-fold" style={{ fontSize: 16, color: '#fff',margin:'0 auto'}} />
                     </div>               
                  </Popover>
               
            </Col>
          </Row>
    );
  }
}

export default Header;
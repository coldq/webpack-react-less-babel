import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {Link} from 'react-router';
import '../font/material-icons.css'

const styles = {
  appBar:{
    position:"fixed",
  }
};
/*
* 侧边栏+头栏组件
 */
export default class MyDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);//!!!!监听
        this.handle2Toggle = this.handle2Toggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            bigWidth: true,
        };
    }


    handle2Toggle() {
        this.setState({open: !this.state.open});
        this.props.onChange(!this.state.open); //调用父组件onchange函数，改变父组件flag
        // console.log(this.props)
    }

    handleToggle() {
        this.setState({open: !this.state.open});
        this.props.onChange(false);
    }

    handleClose() {
        this.setState({open: false});
        this.props.onChange(false);
    }

    noAction() {
        console.log("no act")
    }

    github() {
        window.open("https://github.com/coldq/hemems");
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (document.body.clientWidth < 990) {
            this.setState({
                bigWidth: false,
            });
        } else {
            this.setState({
                bigWidth: true,
            });
        }
    }





    render() {

        if(this.state.bigWidth ){
            return (
                <div>
                    <AppBar zDepth={0}
                            style={styles.appBar}
                            onLeftIconButtonTouchTap={this.handle2Toggle }
                            onRightIconButtonTouchTap={this.github}
                            iconClassNameRight="muidocs-icon-custom-github"/>
                    <Drawer open={this.state.open}>
                        <AppBar
                            title="Fate World"
                            onLeftIconButtonTouchTap={this.handle2Toggle }
                            iconElementLeft={<IconButton><NavigationClose /></IconButton>}/>
                        <List>
                            <ListItem primaryText="首页" leftIcon={<ContentInbox />}
                                      onTouchTap={this.handleClose}
                                      containerElement={<Link to="/"/>}/>
                            <ListItem primaryText="目录" leftIcon={<ActionGrade />}
                                      containerElement={<Link to="/blog/list/1"/>}/>
                            <ListItem primaryText="文章test" leftIcon={<ContentSend />}
                                      containerElement={<Link to="/blog/article/1"/>}/>
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />}/>
                            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />}/>
                        </List>
                        <Divider />
                        <List>
                            <ListItem primaryText="All mail" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Trash" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Spam" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Follow up" rightIcon={<ActionInfo />}/>
                        </List>
                    </Drawer>
                </div>
            );
        }else {
            return (

                <div>
                    <AppBar zDepth={0}
                            style={styles.appBar}
                            onLeftIconButtonTouchTap={ this.handleToggle}
                            onRightIconButtonTouchTap={this.github}
                            iconClassNameRight="muidocs-icon-custom-github"/>

                    <Drawer
                        docked={false}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                        <AppBar
                            title="Fate World"
                            onLeftIconButtonTouchTap={this.handleToggle}
                            iconElementLeft={<IconButton><NavigationClose /></IconButton>}/>
                        <List>
                            <ListItem primaryText="首页" leftIcon={<ContentInbox />}
                                      onTouchTap={this.handleClose}
                                      containerElement={<Link to="/"/>}/>
                            <ListItem primaryText="Starred" leftIcon={<ActionGrade />}
                                      onTouchTap={ this.handleClose}
                                      containerElement={<Link to="/blog/list/1"/>}/>
                            <ListItem primaryText="文字" leftIcon={<ContentSend />}
                                      onTouchTap={ this.handleClose}
                                      containerElement={<Link to="/blog/article/1"/>}/>
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />}
                                      onTouchTap={this.handleClose}/>
                            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />}
                                      onTouchTap={ this.handleClose}/>
                        </List>
                        <Divider />
                        <List>
                            <ListItem primaryText="All mail" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Trash" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Spam" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Follow up" rightIcon={<ActionInfo />}/>
                        </List>
                    </Drawer>
                </div>


            );
        }

    }
}



import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import BlackHouse from 'material-ui/svg-icons/action/fingerprint';
import Secret from 'material-ui/svg-icons/action/lock';
import Java from 'material-ui/svg-icons/action/build';
import Javascript from 'material-ui/svg-icons/av/airplay';
import Life from 'material-ui/svg-icons/av/games';
import Front from 'material-ui/svg-icons/content/gesture';
import Else from 'material-ui/svg-icons/hardware/toys';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {Link} from 'react-router';
import '../fonts/material-icons.css'

const styles = {
  appBar:{
    position:"fixed",
  }
};
/*
* 文章类别
 */
const types = ["Javascript","Java","Front","Life","Else"];
const icon ={
    Java:<Java />,
    Javascript:<Javascript/>,
    Front:<Front/>,
    Life:<Life/>,
    Else:<Else/>
}
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
        var typeDraw = types.map(
            (type) => {


                let arr = new Array;
                if(this.state.bigWidth)
                    arr.push(<ListItem key={type} primaryText={type}
                                   containerElement={<Link to={"/blog/list/"+type}/>}
                                   leftIcon={icon[type]} />)
                else
                    arr.push(<ListItem key={type} primaryText={type}
                                       containerElement={<Link to={"/blog/list/"+type}/>}
                                       onTouchTap={this.handleClose}
                                       leftIcon={icon[type]} />)
                return arr;
            }
        )
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
                                      containerElement={<Link to={"/blog/list/all"}/>}
                                      nestedItems={typeDraw}/>

                            <ListItem primaryText="Secret" leftIcon={<Secret />}
                                      containerElement={<Link to={"/blog/login/a/new"}/>} />
                            <ListItem primaryText="小黑屋"
                                      containerElement={<Link to={"/blog/login/b/new"}/>}
                                      leftIcon={<BlackHouse />}/>
                        </List>
                        <Divider />
                        <List>
                            <ListItem primaryText="关于我" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Github"
                                      onTouchTap={this.github}
                                      rightIcon={<ActionInfo />}/>
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
                            <ListItem primaryText="目录" leftIcon={<ActionGrade />}
                                      containerElement={<Link to={"/blog/list/all"}/>}
                                      nestedItems={typeDraw}
                            />

                            <ListItem primaryText="Secret" leftIcon={<Secret />}
                                      onTouchTap={this.handleClose}
                                      containerElement={<Link to={"/blog/login/a"}/>}
                            />

                            <ListItem primaryText="小黑屋" leftIcon={<BlackHouse />}
                                      containerElement={<Link to={"/blog/login/b"}/>}
                                      onTouchTap={ this.handleClose}/>
                        </List>
                        <Divider />
                        <List>
                            <ListItem primaryText="关于我" rightIcon={<ActionInfo />}/>
                            <ListItem primaryText="Github"
                                      onTouchTap={this.github}
                                      rightIcon={<ActionInfo />}
                            />
                        </List>
                    </Drawer>
                </div>


            );
        }

    }
}



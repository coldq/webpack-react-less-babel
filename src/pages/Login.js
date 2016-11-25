/**
 * Created by cold on 2016/11/21.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {hashHistory} from 'react-router'

const styles = {
    button: {
        margin: 12,
    },
};
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            error: false,
            login:false
            }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.replaceUrl= this.replaceUrl.bind(this);
    }

    replaceUrl(){
        this.props.params.type == 'a'?hashHistory.push('/'):hashHistory.push('/blog/fuckworld/'+this.props.params.file)
    }
    handleSubmit() {
        const gg = document.getElementById("gg").value

        if (gg === 'coldwjj'){
            this.setState({ login: true });
            this.replaceUrl();
        }

        else
            this.setState({ login: false })
        // console.log("login:"+this.state.login)
    }

        render() {
            return (
                <form >
                    <TextField
                        id="gg"
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                    /><br />

                    <RaisedButton
                        label="找到钥匙了吗"
                        labelPosition="before"
                        primary={true}
                        style={styles.button}
                        onTouchTap={this.handleSubmit}
                        onKeyUp = {this.handleSubmit}
                    />
                    <br />


                    {/*{this.state.login &&(
                        <RaisedButton
                            label="欢迎来到 new World"
                            labelPosition="before"
                            primary={true}
                            style={styles.button}
                            onTouchTap={this.replaceUrl}
                        />

                            )

                    }*/}
                </form>
            )
        }
    }
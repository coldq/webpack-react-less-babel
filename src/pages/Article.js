/**
 * Created by cold on 2016/11/18.
 */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import  'whatwg-fetch';
import '../styles/markdown.css'
import {hashHistory} from 'react-router'
var marked = require('marked');

const styles = {
    paper:{
        "minHeight": 500,
        width: "90%",
        textAlign: 'center',
        display: 'inline-block',
        marginTop:20,
    },
    circularprogress:{
        paddingTop:"30%",

    },
    link: {
        color:'rgba(51, 51, 51, 0.44)',
        fontSize:15,
    },
    bottoms:{
        padding:20,
        paddingLeft:'5%',
        textAlign:'left',

    }

};
/*
* 博客文章模块，根据url中file参数fetch得到text
* text用marked转为html
 */
export default class Article extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: true, error: null, data: null};
        this._goRewrite=this._goRewrite.bind(this);
    }
    componentDidMount(){
        this.fetchArticle();

    }
    fetchArticle(){
        let url = 'http://localhost:3001/users/getArticle';
        fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({
                file:this.props.params.file
            }),
        }).then(
            response =>response.json()
        ).then(
            data => this.setState({loading: false, data: data}),
        ).catch(
            error => this.setState({loading: false, error: error})
        );
    }
    _goRewrite(){
        hashHistory.push('/blog/login/b/'+this.props.params.file)
    }
    render(){

        // console.log(marked.parser(marked.lexer(this.state.data)))
        if (this.state.loading) {
            return <Paper style={styles.paper} zDepth={3} rounded={false}>
                <CircularProgress style={styles.circularprogress} size={150} thickness={5} /></Paper>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            var markdown = {__html:marked(this.state.data.content)};
            // console.log(marked.parser(marked.lexer(this.state.data)))
            return(
                <div>

                <Paper style={styles.paper} zDepth={3} rounded={false}>

                    <h1>{this.state.data.title}</h1>
                    <hr />
                    <div className="markdown-body"dangerouslySetInnerHTML={markdown} />
                </Paper>
                    <div style={styles.bottoms}>
                        <a style={styles.link} onClick={this._goRewrite}>修改</a>
                    </div>
                </div>
            );
        }
    }
}

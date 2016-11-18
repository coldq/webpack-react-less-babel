/**
 * Created by cold on 2016/11/18.
 */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import  'whatwg-fetch';
import '../styles/markdown.css'
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
    }
    componentDidMount(){

        let url = 'https://raw.githubusercontent.com/coldq/hemems/gh-pages/resource/'+
            this.props.params.file+".md"
        fetch(url).then(
            response =>response.text()
        ).then(
            data => this.setState({loading: false, data: data}),
        ).catch(
            error => this.setState({loading: false, error: error})
        );
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
            var markdown = {__html:marked(this.state.data)};
            // console.log(marked.parser(marked.lexer(this.state.data)))
            return(
                <Paper style={styles.paper} zDepth={3} rounded={false}>
                    <div className="markdown-body"dangerouslySetInnerHTML={markdown} />
                </Paper>
            );
        }
    }
}

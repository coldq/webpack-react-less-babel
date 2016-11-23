/**
 * Created by cold on 2016/11/18.
 */

import React, {Component} from 'react';
import {Link} from 'react-router'
import  'whatwg-fetch';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    paper:{
        "minHeight": 500,
        width: "90%",
        textAlign: 'center',
        display: 'inline-block',
        marginTop:20,
    },
    circularprogress:{
        paddingTop:"20%",
    },
    paperlist:{
        color:'black',
        width:"70%",
        margin:'auto',
        marginTop:40,
        marginBottom:20,
        padding:10,

    },
    div:{
        display: 'inline-block',
        width:'100%'
    }

};

/*
* 文章列表模块
 */
export default  class  ArticleList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            loading:true,
            error: null,
            data: null};
    }
    fetchList(){
        let url = 'http://localhost:3001/users/getList';
        let params = new Object;
        params.type = this.props.params.type;
        params.page = 1;
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(params),
            }).then(
            response =>response.json()
        ).then(
            data => {
                this.setState({loading: false, data: data});
                console.log(data)
            }
        ).catch(
            error => this.setState({loading: false, error: error})
        );
    }
    componentDidMount(){
        this.fetchList();
    }
    /*
    *
    * 路径参数改变时，引起下面事件WillReceiveProps
    * */
    componentDidUpdate(prevProps){
        console.log("prev:"+prevProps.params.type)
        console.log("update:"+this.props.params.type+"\n");
        for(var i in this.props.params){
            console.log('this:'+i+':'+this.props.params[i]);
        }

        if(prevProps.params.type !== this.props.params.type){
            this.fetchList();
        }

    }

    render(){
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        if(this.state.loading){
            return <Paper style={styles.paper} zDepth={3} rounded={false}>
                <CircularProgress style={styles.circularprogress} size={150} thickness={5} /></Paper>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            /*
            返回单条是对象，不是数组
             */
            // if(isArray(this.state.data)){
                var articleList =this.state.data.map(
                    (file)=> {
                        return (
                            <PaperList key={file.id} data = {file}/>
                        )
                    }
                )
            // }else
            //     var articleList = <PaperList key={this.state.data.id} data = {this.state.data}/>

            return (
                <div style={styles.div}>
                    {articleList}
                </div>
            );
        }
    }
}
 class PaperList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
        this.handleExpandChange = this.handleExpandChange.bind(this);


    }

    handleExpandChange(expanded) {
        this.setState({expanded: expanded});
    };



    render() {
        return (
            <Paper style={styles.paperlist} zDepth={5}>
                <h1 ><Link to={'/blog/article/'+this.props.data.file}>{this.props.data.title}</Link></h1>
                <p fontSize={20}>{this.props.data.subtitle}</p>
                <p>{this.props.data.create_time.substr(0, 9)}</p>
            </Paper>
        );
    }
}
/**
 * Created by cold on 2016/11/21.
 */
import React, {Component} from 'react';
import Editer from './editor'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {hashHistory} from 'react-router'
import  'whatwg-fetch';
import RefreshIndicator from 'material-ui/RefreshIndicator';
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
    button: {
        marginLeft:20,
        marginTop: 30,
        float:'left',
    },
    select:{
        float:'left',
        width: 150,
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        marginLeft:20,
        marginTop: 30,
        float:'left',
    },
    error:{
        display: 'inline-block',
        position: 'relative',
        marginLeft:20,
        marginTop: 40,
        float:'left',
    }
};

export default class Write extends Component{
    constructor(props) {
        super(props);
        this._submit=this._submit.bind(this);
        this.handleChange =this.handleChange.bind(this)
        this.state = {
            value: 'Java',
            loading:false,
            error:null,
            data :null,
            loadingA:true,
        };
    }


    handleChange (event, index, value) {
        this.setState({value});
    }
    componentWillMount () {
        // cache dom node
        if(this.props.params.file != 'new'){
            this.setState({loadingA: true});
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
                data => {
                    this.setState({loadingA: false, data: data});
                    document.getElementById("title").value =data.title;
                    document.getElementById("subTitle").value = data.subtitle;
                    document.getElementById("imgUrl").value =data.imgUrl;
                    this.setState({value:data.type});
                }
            ).catch(
                error => this.setState({loadingA: false, data: error})
            );
        }
    }

    _submit(){
        this.setState({error:''})
        let data = new Object;

        if(this.props.params.file != 'new'){
           data.fileDir = this.props.params.file;
        }else {
            let uuid = ()=>{
                let S4 = ()=>{
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }
                return (S4() + S4() + S4() + S4() );
            }
            data.fileDir = uuid();
        }

        data.title=document.getElementById("title").value;
        data.subTitle = document.getElementById("subTitle").value;
        data.imgUrl = document.getElementById("imgUrl").value;
        data.type = this.state.value;
        data.context = document.getElementById("context").value;

        let foo = true;
        for(let i in data){
            console.log(data[i]=='')
            if(data[i] ==''){
                this.setState({error:i+"不能为空！"})
                foo=false;
            }
        }
        if(foo) {
            fetch("http://localhost:3001/users/write",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data),
                }).then(
                response =>response.json()
            ).then(
                datas => {
                    if(datas.code == true){
                        this.setState({loading: false});
                        hashHistory.push('/blog/article/'+data.fileDir)
                    }else
                        this.setState({loading: false, error: datas.code})
                }
            ).catch(
                error => this.setState({loading: false, error: error})
            );
        }
    }
    render(){
        return(
            <div>
                <TextField
                    id="title"
                    hintText="来写标题吧！"
                    fullWidth={true}
                />
                <TextField
                    id="subTitle"
                    hintText="副标题，最好写哦"
                    fullWidth={true}
                />
                <TextField
                    id="imgUrl"
                    hintText="封面"
                    fullWidth={true}
                />

                {this.state.loadingA ?
                    (<Paper style={styles.paper} zDepth={3} rounded={false}>
                    <CircularProgress style={styles.circularprogress} size={150} thickness={5} />
                    </Paper>)
                :((this.state.error==null)?<Editer content ={this.state.data.content}/>:
                    <Paper style={styles.paper} zDepth={3} rounded={false}><p>{this.state.error}</p></Paper>)}
                <SelectField
                    floatingLabelText="类型"
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.select}
                >
                    <MenuItem value={'Java'} primaryText="Java" />
                    <MenuItem value={'Javascript'} primaryText="Js" />
                    <MenuItem value={'Front'} primaryText="前端相关" />
                    <MenuItem value={'Life'} primaryText="生活杂记" />
                    <MenuItem value={'Else'} primaryText="其他" />
                </SelectField>

                {this.state.loading?( <RefreshIndicator
                    size={40}
                    left={10}
                    top={0}
                    status="loading"
                    style={styles.refresh}
                />):(<RaisedButton
                    label="提交"
                    labelPosition="before"
                    primary={true}
                    style={styles.button}
                    onTouchTap={this._submit}/>)}
                {this.state.error !='' && <div
                    style={styles.error}>{this.state.error}</div>}
            </div>
        )
    }
}
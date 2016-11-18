/**
 * Created by cold on 2016/11/18.
 */
import React, {Component} from 'react';
import {Link} from 'react-router'
const filelist = ['1','2','3','4'];

/*
* 文章列表模块
 */
export default  class  ArticleList extends Component{
    render(){
        var articleList = filelist.map(
            (file)=>{
                return (
                    <h2 key={file}>
                        <Link to={'/blog/article/'+file}> { 'Title'+file}</Link>
                    </h2>

            )}
        )
        return(
          <div>{articleList}</div>
        );
    }
}
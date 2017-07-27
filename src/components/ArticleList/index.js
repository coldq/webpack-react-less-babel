import React ,{PureComponent} from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {Icon,Tag} from 'antd';
import formatDate from '../../utils/formatDate';
import './style.scss';

class ArticleList extends PureComponent {
    constructor(props) {
        super(props);
   }

    render() {
        const {title,tag,content,author,date,type,filename} = this.props.item;
        const tags = tag.map((v) => {
            return <Tag key={v}>{v}</Tag>; // <Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
        });

        return (
            <div className="content">
                <h1 className="center header"><Link to={`/article/${filename}`}>{title}</Link></h1>
                <div className="center tags"><Icon type="tag" style={{fontSize:'12px'}}/> {tags}</div>
                <div className="art-info"><Icon type="calendar" />&nbsp;{formatDate(date,'yyyy/MM/dd')}&nbsp;&nbsp;&nbsp;&nbsp; 分类：{type}</div>
                <div className="author" >作者：{author} <Icon type="smile-o" /></div>
                
                <ReactMarkdown source={content.slice(0,300)} className="markdown-body hide-img"/>
                <div className="more"><Link to={`/article/${filename}`}>查看更多<Icon type="double-right" /> </Link></div>
            </div>
        );
    }
}
ArticleList.propTypes = {
  item: PropTypes.object.isRequired,
};
export default ArticleList;
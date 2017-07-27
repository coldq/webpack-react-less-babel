import React ,{PureComponent} from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './style.scss';
import ReactMarkdown from 'react-markdown';
import {Icon,Tag} from 'antd';
import formatDate from '../../utils/formatDate';
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
                <h1 className="center"><Link to={`/article/${filename}`}>{title}</Link></h1>
                 <div className="center"><Icon type="tag" style={{fontSize:'12px'}}/> {tags}</div>
                 <p>{author}-{formatDate(date,'yyyy/MM/dd')}-{type}</p>
                  <ReactMarkdown source={content.slice(0,100)+'...'}/>
            </div>
        );
    }
}
ArticleList.propTypes = {
  item: PropTypes.object.isRequired,
};
export default ArticleList;
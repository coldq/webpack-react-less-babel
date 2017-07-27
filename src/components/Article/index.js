import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/articleAction';
import {Row,Col} from 'antd';
import ReactMarkdown from 'react-markdown';



class Article extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
		this.props.actions.getArticle(this.props.params.file);
	}
    render() {
        return(
            <Row type="flex" justify="center" style={{marginTop:'36px'}}>
                
                <Col xs={22} sm={22} md={18} lg={16} xl={14}>
                    <div className="content">
                      <ReactMarkdown source={this.props.article} className="markdown-body"/>
                    </div>
                </Col>
            </Row>
        ); 
   }
}
Article.propTypes = {
    params:PropTypes.object.isRequired,
    article:PropTypes.string,
    actions:PropTypes.object,
};

function mapStateToProps(state) {
  return {
    article: state.article,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Article);

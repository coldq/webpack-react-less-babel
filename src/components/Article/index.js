import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/articleAction';

import ReactMarkdown from 'react-markdown';

class Article extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log(this.props)
		this.props.actions.getArticle(this.props.params.file);
	}
    render() {
        if(this.props.article) {
            return(
                <ReactMarkdown source={this.props.article} />
            );
        }
        else{
            return(
                <p>Loading..</p>
            )
        }
   }

}
Article.propTypes = {
    params:PropTypes.object.isRequired,
    article:PropTypes.any
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

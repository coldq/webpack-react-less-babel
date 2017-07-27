import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/blogAction';
import Home from '../components/Home';



export const HomePage = (props) =>{
    return (
        <Home {...props}/>
    );
};
HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  currentPage:PropTypes.number.isRequired,
  blog:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    blog: state.blog,
    currentPage:state.currentPage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
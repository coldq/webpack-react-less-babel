import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/asyncAction';
import Async from '../components/Async';

export const asyncPage = (props) =>{
    const data = props.data;
    let loading = data.get('loading'),
        error = data.get('error'),
        currentUser = data.get('currentUser'),
        userData  = data.get('userData'),
        repos = userData.get('repositories');

    
    if(loading){
        return (
            <p>
                loading...
            </p>
        );
    }
    if(error){
        return(
            <p>
                Error.
            </p>
        );
    }
    if(repos){
        return (
            <Async 
                currentUser = {currentUser}
                repos = {repos}
                loadRepos = {props.actions.loadRepos}
            />
        );
    }
    return (
        <button onClick = {props.actions.loadRepos}>coldq</button>
    );
    
};
asyncPage.propTypes = {
  actions: PropTypes.object.isRequired,
  data:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    data : state.asyncReducer
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
)(asyncPage);
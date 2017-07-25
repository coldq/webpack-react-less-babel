import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/countAction';
import Counter from '../components/Counter';



export const CountPage = (props) =>{
    return (
        <Counter
          Add = {props.actions.Add}
          Inc = {props.actions.Inc}
          count = {props.count}
        />
    );
};
CountPage.propTypes = {
  actions: PropTypes.object.isRequired,
  count:PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    count: state.count
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
)(CountPage);
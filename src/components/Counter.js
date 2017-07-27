import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

class Counter extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { count, Add, Inc } = this.props;
    return (
      <p>
        Clicked: {count} times
        {' '}
        <Button onClick={Add}>
          +
        </Button>
        {' '}
        <Button onClick={Inc}>
          -
        </Button>
        {' '}
      </p>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  Add: PropTypes.func.isRequired,
  Inc: PropTypes.func.isRequired
};

export default Counter;
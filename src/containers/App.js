import React from 'react';
import PropTypes from 'prop-types';
// import { Link, IndexLink } from 'react-router';
import Headers from '../components/Header/index';
import { BackTop,Icon} from 'antd';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <Headers/>
        {this.props.children}
        <BackTop>
          <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
        </BackTop>
      </div> 
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
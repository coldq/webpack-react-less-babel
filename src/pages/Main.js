import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyDrawer from './Drawer.js';
import AppBar from 'material-ui/AppBar';
import '../styles/Home.less'

const muiTheme = getMuiTheme({
 
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = {
      flag: false, //记录右边栏是否改变
    };
  }
  getChildContext() {
    return {flag: this.state.flag};
  }
  onChange(f) { 
    this.setState({
      flag: f,
    });
  }

  render() {
    
    return (

      <MuiThemeProvider >

        <div >

          <MyDrawer onChange={this.onChange}/>

            {this.props.children}

 
        </div>

      </MuiThemeProvider>
    );
  }
}
Main.childContextTypes = {
  flag: React.PropTypes.bool
};
export default Main;
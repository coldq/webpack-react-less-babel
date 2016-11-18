import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import ContentContainer from './pages/ContentContainer';
import Home from './pages/Home'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, Link, hashHistory,IndexRoute } from 'react-router';
import './styles/index.less';

injectTapEventPlugin();


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
   	  <IndexRoute component={Home}/>
      <Route path="blog" component={ContentContainer} >
        <Route path="list/:page" component={ArticleList}/>
        <Route path="article/:file" component={Article}/>
      </Route>
    </Route>
  </Router>
  ),document.getElementById('root')

);

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import ContentContainer from './pages/ContentContainer';
import Home from './pages/Home'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import Write from './pages/Write'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, Link, hashHistory,IndexRoute,withRouter } from 'react-router';
import Login from './pages/Login'
import './styles/index.less';

injectTapEventPlugin();




ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
   	  <IndexRoute component={Home}/>
      <Route path="blog" component={ContentContainer} >
          <Route path="list/:type" component={ArticleList}/>
          <Route path="article/:file" component={Article}/>
          <Route path="fuckworld/:file" component={Write} />
          <Route path="login/:type/:file" component={Login} />
      </Route>
    </Route>
  </Router>
  ),document.getElementById('root')

);

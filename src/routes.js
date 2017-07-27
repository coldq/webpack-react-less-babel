import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/HomePage';
import Article from './components/Article/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
     <Route path="article/:file" component={Article}/>         
  </Route>
);
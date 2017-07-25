import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './components/HomePage';
import Count from './containers/CountPage';
import Async from './containers/asyncPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
     <Route path="count" component={Count}/>  
     <Route path="async" component={Async}/>        
  </Route>
);
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact } from './components/index';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Route>
  </Router>
);

export default routes;
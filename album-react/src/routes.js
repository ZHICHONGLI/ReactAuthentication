import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components/index';
import { AddAlbumContainer, AlbumsContainer } from './containers';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Route>
    <Route path="/albums" component={Archive}>
      <IndexRoute component={AlbumsContainer} />
      <Route path="add" component={AddAlbumContainer} />
    </Route>
  </Router>
);

export default routes;
import React from 'react';
// Import Provider
import { Provider } from 'react-redux';
// Store to be passed to Provider
import configureStore from './store';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components/index';
import { AddAlbumContainer, AlbumsContainer } from './containers';

const store = configureStore();

// Use hashHistory for easier development
const routes = (
  <Provider store={store}>
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
  </Provider>

);

export default routes;
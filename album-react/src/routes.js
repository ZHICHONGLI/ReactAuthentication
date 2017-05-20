import React from 'react';
// Import Provider
import { Provider } from 'react-redux';
// Store to be passed to Provider
import configureStore from './store';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Archive, Login, Signup } from './components';
import { AddAlbumContainer, AlbumsContainer } from './containers';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toObject();
  }
});

const routes = (
  <Provider store={store}>
    <div className="wrapper">
      <Router history={history}>
        <Route path="/" component={Home}>
          <IndexRoute component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Route>
        <Route path="/albums" component={Archive}>
          <IndexRoute component={AlbumsContainer} />
          <Route path="add" component={AddAlbumContainer} />
        </Route>
        <Route path="/auth" component={Archive}>
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
        </Route>
      </Router>
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>

  </Provider>
);

export default routes;
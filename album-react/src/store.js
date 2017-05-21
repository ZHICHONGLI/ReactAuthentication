import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import rootSaga from './sages';
import reducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import isAuthenticated from './utils/authetication';

const initialState = Immutable.fromJS({
    auth: isAuthenticated()
});

// Function in charge of creating and returning the store of the app
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    // Store created with parameters of reducer + saga-middleware
    const routeMiddleware = routerMiddleware(hashHistory);
    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware, routeMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
        
    );
    // rootSaga starts all the sagas iin parallel
    sagaMiddleware.run(rootSaga);

    // Return the state
    return store;
}
export default configureStore;
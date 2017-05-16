import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sages';
import reducer from './reducers';

// Function in charge of creating and returning the store of the app
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    // Store created with parameters of reducer + saga-middleware
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        )
        
    );
    // rootSaga starts all the sagas iin parallel
    sagaMiddleware.run(rootSaga);

    // Return the state
    return store;
}
export default configureStore;
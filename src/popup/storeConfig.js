import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './reducers/rootReducer';
import RootSaga from './sagas/rootSaga';
import App from './App.js';


// компонент redux store
class Store extends Component {
    constructor(props) {
        super(props);
        const sagaMiddleware = createSagaMiddleware();
        const middleware = [ sagaMiddleware ];
        const store = createStore(
			RootReducer,
			compose(
				applyMiddleware(...middleware)
			)
		)
        sagaMiddleware.run(RootSaga, store.dispatch);

        this.state = {
            store: store,
        };
    }
  
    render() {
        const { store } = this.state;
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
  }
  
  export default Store;
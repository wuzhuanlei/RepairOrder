import React from  'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import utils from './common/utils';
import reducer from './reducers/reducer';
import App from './components/App';

const STORE_NAMESPACE = 'redux-repairOrders';

const middleWares = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(reducer, utils.store(STORE_NAMESPACE), middleWares);

store.subscribe(() => {
    const state = store.getState();
    utils.store(STORE_NAMESPACE, state);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
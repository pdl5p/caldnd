import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/index.scss';
import App from './App';
import createStore from './reducers/store';

const store = createStore();

const render = () => {
    ReactDOM.render(<App store={store} />, document.querySelector("#app"));
}
render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers').default;
        store.replaceReducer(nextReducer);
    });
}
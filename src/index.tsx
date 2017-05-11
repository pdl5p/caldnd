import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.scss';

import App from './App';

const render = () => {
    ReactDOM.render(<App />, document.querySelector("#app"));
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    })
}
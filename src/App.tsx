import * as React from 'react';
import Grid4 from './components/Grid4';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid4 />
    </Provider>
);

export default App;
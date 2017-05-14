import * as React from 'react';
import Grid5 from './components/Grid5';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid5 />
    </Provider>
);

export default App;
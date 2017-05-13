import * as React from 'react';
import Grid3 from './components/Grid3';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid3 />
    </Provider>
);

export default App;
import * as React from 'react';
import Grid7 from './components/grids/Grid7';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid7 />
    </Provider>
);

export default App;
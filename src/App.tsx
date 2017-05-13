import * as React from 'react';
import Grid1 from './components/Grid1';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid1 />
    </Provider>
);

export default App;
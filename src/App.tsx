import * as React from 'react';
import Grid2 from './components/Grid2';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid2 />
    </Provider>
);

export default App;
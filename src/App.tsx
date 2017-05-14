import * as React from 'react';
import Grid6 from './components/Grid6';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <Grid6 />
    </Provider>
);

export default App;
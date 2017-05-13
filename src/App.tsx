import * as React from 'react';
import DayCalendar from './components/DayCalendar';
import CustomerLookup from './components/CustomerLookup';
import SimpleDrag from './components/simpleDrag/SimpleDrag';

import { Provider } from 'react-redux';

const App = ({ store }) => (
    <Provider store={store}>
        <SimpleDrag />
    </Provider>
);

export default App;
import { createStore as create, compose } from 'redux';
import rootReducer from './index';

interface IWX extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
const poser = (window as IWX).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = () => create(rootReducer, poser());

export default createStore;
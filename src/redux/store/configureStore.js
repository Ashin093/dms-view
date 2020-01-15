/**
 * 引入createStore 创建store
 */
import { createStore } from 'redux';
import reducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    menuName:''
}
export default () => createStore(reducer, initialState,composeWithDevTools());

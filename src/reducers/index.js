import { combineReducers } from 'redux';
import document from './documentReducer';

const rootReducer = combineReducers({ document });

export default rootReducer;
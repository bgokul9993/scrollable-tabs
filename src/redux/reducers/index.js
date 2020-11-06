import { combineReducers } from 'redux';
import app from './app';

export default function createReducer(injectedReducers) {
    return combineReducers({
        app,
        ...injectedReducers
    })
};

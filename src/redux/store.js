import { createStore } from 'redux';
import { createHashHistory as createHistory } from 'history';
import createReducer from './reducers';

export const history = createHistory();

export default function configureStore(initialState = {}) {
    const store = createStore(createReducer(), initialState);

    store.injectedReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}

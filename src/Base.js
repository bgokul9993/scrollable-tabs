// @flow
import React from 'react';
import { Provider } from 'react-redux';
import App from 'App';
import PropTypes from 'prop-types';

function Base({ store, history }) {
    return (
        <Provider store={store} history={history}>
            <App />
        </Provider>
    );
}

Base.propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
}

export default Base;

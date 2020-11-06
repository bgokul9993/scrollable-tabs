import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Base from './Base';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from "redux/store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Base store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

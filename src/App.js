// @flow
import React from 'react';
import Routes from 'app/Routes';
import ErrorBoundary from 'app/ErrorBoundary';

const App = ({ history }) =>
  <div className="App">
    <ErrorBoundary>
      <div>
        <Routes history={history} />
      </div>
    </ErrorBoundary>
  </div>;

export default App;

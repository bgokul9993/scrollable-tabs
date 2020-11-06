import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from 'screen/Home';
import PageNotFound from 'screen/PageNotFound';


class Routes extends Component {

    render() {

        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;

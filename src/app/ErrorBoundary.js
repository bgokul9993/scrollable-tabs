// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  error: state.app.error
});

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: props.error
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error) {
      this.setState({ error: nextProps.error });
    }
  }

  componentDidCatch(error, info) {
    if (error) {
      this.setState({ error: { show: true, componentError: true }  });
    }
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
  
    if (error.show) {
      return (
        <div>
            Error While rendering
        </div>
      );
    }
    return children;
  }
}

export default connect(mapStateToProps)(ErrorBoundary);;

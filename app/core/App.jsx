import React, { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import DataSpinner from '../core/components/DataSpinner';
import Main from './Main';
import { withRouter } from 'react-router';
import * as actions from '../core/error/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorHandlingComponent } from './error/component/ErrorHandlingComponent';


const SubmissionBanner = lazy(() => import('../core/components/SubmissionBanner'));

class App extends React.Component {

  componentDidMount() {
    const user = this.props.kc.tokenParsed.email;
    this.props.log([{
      level: 'info',
      user: user,
      path: this.props.location.pathname,
      message: `Route requested ${this.props.location.pathname}`
    }]);

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const user = this.props.kc.tokenParsed.email;
    if (this.props.location !== prevProps.location) {
      this.props.log([{
        level: 'info',
        user: user,
        path: this.props.location.pathname,
        message: `Route changed from ${prevProps.location.pathname} to ${this.props.location.pathname}`
      }]);
    }
  }

  render() {
    return <div>
      <Header/>
      <Suspense
        fallback={<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
          <DataSpinner message="..."/></div>}>
        <SubmissionBanner/>
      </Suspense>
      <div className="container" style={{ height: '100vh' }}>
        <Main/>
      </div>
      <Footer/>
    </div>;
  }
}

ErrorHandlingComponent.propTypes = {
  log: PropTypes.func,
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
  return {
    kc: state.keycloak
  };
}, mapDispatchToProps)(App));

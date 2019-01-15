import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import DataSpinner from '../components/DataSpinner';
import {
  isCheckingOnBoarding,
  isFetchingStaffDetails,
  staffDetails
} from './selectors';
import PubSub from 'pubsub-js';
import OnboardChecker from './OnboardChecker';


export default function (ComposedComponent) {
  class withOnboardingCheck extends React.Component {
    static propTypes = {};

    componentDidMount() {
      this.props.performOnboardingCheck();
      this.props.fetchStaffDetails();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.isFetchingStaffDetails !== this.props.isFetchingStaffDetails
        && !this.props.isFetchingStaffDetails) {
        const { staffDetails } = this.props;
        const { redirectPath, data } = new OnboardChecker().onBoardCheck(staffDetails);
        if (redirectPath) {
          if (data) {
            PubSub.publish('submission', data);
          }
          this.props.history.replace(redirectPath);
        } else {
          this.props.onboardingCheckCompete();
        }
      }
    }

    render() {
      const {
        isCheckingOnBoarding
      } = this.props;
      if (isCheckingOnBoarding) {
        return <DataSpinner message={`Checking your credentials`}/>;
      } else {
        return (<ComposedComponent {...this.props} />);
      }
    }
  }


  withOnboardingCheck.propTypes = {
    fetchStaffDetails: PropTypes.func.isRequired,
    performOnboardingCheck: PropTypes.func.isRequired,
    onboardingCheckCompete: PropTypes.func.isRequired,
    isCheckingOnBoarding: PropTypes.bool,
    isFetchingStaffDetails: PropTypes.bool
  };

  const mapStateToProps = createStructuredSelector({
    staffDetails: staffDetails,
    isFetchingStaffDetails: isFetchingStaffDetails,
    isCheckingOnBoarding: isCheckingOnBoarding
  });

  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(withOnboardingCheck));
}

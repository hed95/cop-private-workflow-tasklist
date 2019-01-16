import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import DashboardTitle from './DashboardTitle';
import DashboardPanel from './DashboardPanel';
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/shift/actions';
import { connect } from 'react-redux';
import {
  endingShift,
  hasActiveShift, isFetchingShift, shift
} from '../../../core/shift/selectors';
import { errors, hasError } from '../../../core/error/selectors';
import ErrorPanel from '../../../core/error/component/ErrorPanel';
import DataSpinner from '../../../core/components/DataSpinner';
import * as errorActions from '../../../core/error/actions';

export class NoOpDashboardPage extends React.Component {

  render() {
    return <div id="dashboardContent">
      <div className="grid-row" style={{ width: '100%', height: '200px' }}>
        <div className="column-one-half">
          <h2 className="heading-large">
                    <span
                      className="heading-secondary">Operational platform</span>{this.props.kc.tokenParsed.given_name} {this.props.kc.tokenParsed.family_name}
          </h2>
        </div>
      </div>
      <h2 className="heading-medium">Access to the platform will be granted once your onboarding or mandatory declaration has been processed</h2>
    </div>;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
  return {
    kc: state.keycloak
  };
}, mapDispatchToProps)(NoOpDashboardPage));










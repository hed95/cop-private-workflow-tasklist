import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// local imports
import * as actions from '../actions';
import { claimSuccessful } from '../selectors';

export class Claim extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.claimSuccessful) {
      const { history, task } = this.props;
      history.push(`/task/${task.get('id')}`);
    }
  }

  render() {
    const { claimTask, task, kc } = this.props;
    const userId = kc.tokenParsed.email;
    const taskAssignee = task.get('assignee');
    const displayButton = taskAssignee === null || (taskAssignee !== userId);

    function renderClaimButton() {
      if (displayButton) {
        return (
          <button id="claimTask" className="govuk-button" type="submit" onClick={() => claimTask(task.get('id'))}>
            Claim
          </button>
        );
      }
      return <React.Fragment></React.Fragment>;
    }
    return ({ renderClaimButton });
  }
}

Claim.propTypes = {
  claimSuccessful: PropTypes.bool,
  claimTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(state => ({
  kc: state.keycloak,
  claimSuccessful: claimSuccessful(state),
}), mapDispatchToProps)(Claim));

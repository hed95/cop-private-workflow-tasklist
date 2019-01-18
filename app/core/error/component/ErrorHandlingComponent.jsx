import React from 'react';
import PropTypes from 'prop-types';
import { errors, hasError, unauthorised } from '../selectors';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router';
import ErrorPanel from './ErrorPanel';

class ErrorHandlingComponent extends React.Component {

  render() {
    const { hasError, unauthorised, skipAuthError} = this.props;
    if (!unauthorised && !hasError) {
      return <div>{this.props.children}</div>;
    }

    if (unauthorised && !skipAuthError) {
      return <Redirect push to="/dashboard"/>;
    } else {
      return <div>
        <ErrorPanel {...this.props} />
        {this.props.children}
      </div>;
    }
  }
}

ErrorHandlingComponent.propTypes = {
  hasError: PropTypes.bool,
  errors: ImmutablePropTypes.list,
  unauthorised: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  hasError: hasError,
  errors: errors,
  unauthorised: unauthorised
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandlingComponent);

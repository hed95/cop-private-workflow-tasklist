import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { list } from 'react-immutable-proptypes';
import { errors as errorsSelector } from '../error/selectors';
import AppConstants from '../../common/AppConstants';

export class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is404: null,
    };
  }

  componentDidMount() {
    this.checkErrors();
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    if (errors !== prevProps.errors) {
      this.checkErrors();
    }
  }

  checkErrors() {
    const { errors } = this.props;
    const is404 = errors.some(error => error.get('status') === 404);
    document.title = `${is404 ? 'Page not found' : 'Error'} | ${
      AppConstants.APP_NAME
    }`;
    this.setState({
      is404,
    });
  }

  render() {
    const { resource, id } = this.props;
    const { is404 } = this.state;
    switch (is404) {
      case true:
        return (
          <Fragment>
            <h2 className="govuk-heading-l govuk-!-margin-top-6">
              Page not found
            </h2>
            <p className="govuk-body">
              If you typed the web address, check it is correct.
            </p>
            <p className="govuk-body">
              If you pasted the web address, check you copied the entire
              address.
            </p>
            <p className="govuk-body">
              If you&rsquo;re looking for a form then{' '}
              <a href="/forms">view the full available list here</a>.
            </p>
            <p className="govuk-body">
              To find something else then{' '}
              <a href="/dashboard">go to the COP dashboard</a>.
            </p>
            <p className="govuk-body">
              If the web address is correct or you selected a link or button,{' '}
              <a
                href="https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal/3"
                rel="noopener noreferrer"
                target="_blank"
              >
                contact the COP support team
              </a>{' '}
              to report a bug.
            </p>
          </Fragment>
        );

      case false:
        return (
          <div>
            <h4 className="govuk-heading-s">
              {resource} with identifier {id} was not found
            </h4>
          </div>
        );

      default:
        return null;
    }
  }
}
NotFoundPage.propTypes = {
  errors: list.isRequired,
  resource: PropTypes.string.isRequired,
  id: PropTypes.string,
};

NotFoundPage.defaultProps = {
  id: '',
};

export default connect(state => ({
  errors: errorsSelector(state),
}))(NotFoundPage);

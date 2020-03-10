import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppConstants from '../../../common/AppConstants';
import HTMLReport from './HTMLReport';
import PowerBIReport from './PowerBIReport';

export const ReportPage = ({ appConfig, location }) => {
  const { reportServiceUrl } = appConfig;
  const params = queryString.parse(location.search);
  const { accessToken, embedUrl, htmlName, id, name, reportType } = params;
  document.title = `${name} | ${AppConstants.APP_NAME}`;

  return (
    <div>
      <Link
        id="backToReports"
        className="govuk-link govuk-back-link govuk-!-font-size-19"
        to="/reports"
      >
        Back to reports
      </Link>

      <div
        style={{
          display: 'flex',
          position: 'relative',
          margin: 'auto',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        {reportType === 'PowerBIReport' ? (
          <PowerBIReport {...{ accessToken, embedUrl, id, name }} />
        ) : (
          <HTMLReport {...{ htmlName, reportServiceUrl }} />
        )}
      </div>
    </div>
  );
};

ReportPage.propTypes = {
  appConfig: PropTypes.shape({
    reportServiceUrl: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(
  connect(
    state => ({
      appConfig: state.appConfig,
    }),
    {},
  )(ReportPage),
);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConstants from '../../common/AppConstants';
import './LogoBar.scss';

const LogoBar = ({ setFullscreen }) => (
  <div className="logo-bar">
    <p>
      To refresh the report, please return to{' '}
      <Link to={AppConstants.REPORTS_PATH}>the main reports page</Link> and
      reselect it.
    </p>
    <button type="button" onClick={setFullscreen}>
      View full screen
    </button>
  </div>
);

LogoBar.propTypes = {
  setFullscreen: PropTypes.func.isRequired,
};

export default LogoBar;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Report from 'powerbi-report-component';
import LogoBar from '../../../core/components/LogoBar';

export default class PowerBIReport extends Component {
  constructor(props) {
    super(props);
    this.report = null;
    this.setFullscreen = this.setFullscreen.bind(this);
  }

  handleReportLoad = report => {
    this.report = report;
  };

  setFullscreen = () => {
    if (this.report) this.report.fullscreen();
  };

  render() {
    const { accessToken, embedUrl, id: embedId, name: pageName } = this.props;
    return (
      <Fragment>
        <Report
          {...{ accessToken, embedId, embedUrl, pageName }}
          embedType="report"
          extraSettings={{
            filterPaneEnabled: false,
          }}
          onLoad={this.handleReportLoad}
          permissions="Read"
          reportMode="view"
          style={{ width: '100%', height: '100%' }}
          tokenType="Embed"
        />
        <LogoBar setFullscreen={this.setFullscreen} />
      </Fragment>
    );
  }
}

PowerBIReport.propTypes = {
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

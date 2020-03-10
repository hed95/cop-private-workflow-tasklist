import React from 'react';
import { ReportPage } from './ReportPage';

describe('Report Page', () => {
  it('renders back button', () => {
    const props = {
      appConfig: {
        reportServiceUrl: 'http://localhost:9000',
      },
      location: {
        search: 'params',
      },
    };
    const wrapper = shallow(<ReportPage {...props} />);
    expect(wrapper.find('#backToReports').exists()).toEqual(true);
  });

  it('renders an HTMLReport for HTML reports', () => {
    const props = {
      appConfig: {
        reportServiceUrl: 'http://localhost:9000',
      },
      location: {
        search: 'params',
      },
    };
    const wrapper = shallow(<ReportPage {...props} />);
    expect(wrapper.find('HTMLReport').exists()).toEqual(true);
  });

  it('renders a PowerBIReport for Power BI reports', () => {
    const props = {
      appConfig: {
        reportServiceUrl: 'http://localhost:9000',
      },
      location: {
        search: 'reportType=PowerBIReport',
      },
    };
    const wrapper = shallow(<ReportPage {...props} />);
    expect(wrapper.find('PowerBIReport').exists()).toEqual(true);
  });
});

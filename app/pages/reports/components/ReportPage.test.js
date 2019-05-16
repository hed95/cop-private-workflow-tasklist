import { shallow } from 'enzyme/build/index';
import { ReportPage } from './ReportPage';
import React from 'react';
import config from '../../../config';



describe('Report Page', () => {
  it('renders iframe for report', () => {
    const props = {
      location: {
        search: '?reportName=myReport.html'
      }
    };
    const wrapper = shallow(<ReportPage
      {...props}
    />);
    expect(wrapper.find('#backToReports').exists()).toEqual(true);
    const iframeWrapper = wrapper.find('Iframe');
    expect(iframeWrapper.prop('url')).toEqual(`${config.services.report.url}/api/reports/myReport.html`);
  });
});

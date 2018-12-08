import { shallow } from 'enzyme/build/index';
import { ReportPage } from './ReportPage';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15/build/index';


Enzyme.configure({ adapter: new Adapter() });

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
    expect(iframeWrapper.prop('url')).toEqual('/api/reports/myReport.html');
  });
});

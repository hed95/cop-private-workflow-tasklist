import React from 'react';
import Enzyme from 'enzyme';
import { mount,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { ReportsPage } from './ReportsPage';
import Spinner from 'react-spinkit';

const { Map,List} = Immutable;

Enzyme.configure({ adapter: new Adapter() });
describe('Reports Page', () => {
  const initialState = {
    'reports-page': new Map({
      loadingReports: false,
      reports: List([])
    })
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders data spinner', async () => {
    const fetchReportsList = jest.fn();
    const props = {
      loadingReports: true,
      reports: List([])
    };
    const wrapper = await shallow(<ReportsPage
      store={store}
      {...props}
      fetchReportsList={fetchReportsList}
    />);
    console.log(wrapper.html());
    expect(fetchReportsList).toBeCalled();
    expect(wrapper.find('.heading-large').text()).toEqual('Operational reports 0 reports');
    expect(wrapper.containsMatchingElement(Spinner)).toEqual(true);
  });
  it ('renders list of reports', async() => {
    const fetchReportsList = jest.fn();
    const props = {
      loadingReports: false,
      reports: Immutable.fromJS([
        {
          name: 'reportname',
          description: 'reportdescription',
          htmlName: 'reportHtmlName'
        }
      ])
    };
    const wrapper = await mount(<ReportsPage
      store={store}
      {...props}
      fetchReportsList={fetchReportsList}
    />);
    console.log(wrapper.html());
    expect(fetchReportsList).toBeCalled();
    expect(wrapper.find('.heading-large').text()).toEqual('Operational reports 1 reports');

    const tableWrapper = wrapper.find('table');
    expect(tableWrapper.exists()).toEqual(true);

    const rows = wrapper.find('#report');
    expect(rows.length).toEqual(1);

    const firstRowColumns = rows.first().find('td').map(column => column.text());
    expect(firstRowColumns.length).toEqual(2);
    expect(firstRowColumns[0]).toEqual('reportname');
    expect(firstRowColumns[1]).toEqual('reportdescription');
   });
});

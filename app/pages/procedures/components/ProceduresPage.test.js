import React from 'react';
import Enzyme from 'enzyme';
import { mount,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { ProceduresPage } from './ProceduresPage';
const { Map,List} = Immutable;



Enzyme.configure({ adapter: new Adapter() });

describe('ProceduresPage', () => {
  const initialState = {
    'process-definitions-page': new Map({
      isFetchingProcessDefinitions: true,
      processDefinitions: List([])
    })
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
      };
    };
    store = mockStore(initialState);
  });
  const fetchProcessDefinitions = jest.fn();

  it('renders loading when fetching data', () => {
    const props = {
      isFetchingProcessDefinitions: true,
      processDefinitions: List([])
    };
    const wrapper = shallow(<ProceduresPage
      store={store}
      {...props}
      fetchProcessDefinitions={fetchProcessDefinitions}
    />);
    console.log(wrapper.html());
    expect(fetchProcessDefinitions).toBeCalled();
    expect(wrapper.find('.heading-large').text()).toEqual('Operational procedures 0 procedures');
    expect(wrapper.find('#loading').text()).toEqual('Loading processes....');
    expect(fetchProcessDefinitions).toBeCalled();
  });


  it('renders a list of procedures', async() => {

    const props = {
      isFetchingProcessDefinitions: false,
      processDefinitions: Immutable.fromJS([{
        'process-definition': {
          key: 'processA',
          name: 'processA',
          description: 'processADescription'
        }
      },{
        'process-definition': {
          key: 'processB',
          name: 'processB',
          description: 'processBDescription'
        }
      }])
    };
    const wrapper = await mount(<ProceduresPage
      store={store}
      {...props}
      fetchProcessDefinitions={fetchProcessDefinitions}
    />);

    console.log(wrapper.html());
    expect(fetchProcessDefinitions).toBeCalled();
    expect(wrapper.find('.heading-large').text()).toEqual('Operational procedures 2 procedures');
    const tableWrapper = wrapper.find('table');
    expect(tableWrapper.exists()).toEqual(true);

  });
});

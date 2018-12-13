import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { MessagesPanel } from './MessagesPanel';
import PubSub from 'pubsub-js';
const { Map} = Immutable;
Enzyme.configure({ adapter: new Adapter() });


jest.mock('pubsub-js', ()=>({
  subscribe:jest.fn(),
  unsubscribe: jest.fn(),
  publish: jest.fn()
}));

describe('MessagesPanel', () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  const fetchMessageCounts = jest.fn();
  const setDefaultCounts = jest.fn();
  it('renders default value', async () => {
    const props = {
      hasActiveShift: false,
      isFetchingMessageCounts: false,
      messageCounts: Immutable.fromJS({
        page: {
          totalElements: 0
        }
      })
    };
    const wrapper = await mount(<MessagesPanel
      store={store}
      {...props}
      fetchMessageCounts={fetchMessageCounts}
      setDefaultCounts={setDefaultCounts}
    />);
    expect(setDefaultCounts).toBeCalled();
    expect(fetchMessageCounts).not.toBeCalled();

    const messagesPanel = wrapper.find('#messagesPanel');
    expect(messagesPanel.exists()).toEqual(true);
    expect(messagesPanel.find('.bold-xlarge').text()).toEqual('0');
    expect(messagesPanel.find('.bold-small').text()).toEqual('messages');

  });

  it ('renders values', async() => {
    const props = {
      hasActiveShift: true,
      isFetchingMessageCounts: false,
      messageCounts: Immutable.fromJS({
        page: {
          totalElements: 10
        }
      })
    };
    const wrapper = await mount(<MessagesPanel
      store={store}
      {...props}
      fetchMessageCounts={fetchMessageCounts}
      setDefaultCounts={setDefaultCounts}
    />);

    expect(fetchMessageCounts).toBeCalled();
    expect(PubSub.subscribe).toBeCalled();

    const messagesPanel = wrapper.find('#messagesPanel');
    expect(messagesPanel.exists()).toEqual(true);
    expect(messagesPanel.find('.bold-xlarge').text()).toEqual('10');
    expect(messagesPanel.find('.bold-small').text()).toEqual('messages');

  });
});

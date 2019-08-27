import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { MessagesPage } from './MessagesPage';
import moment from 'moment';

const { Map, List, Set } = Immutable;


describe('MessagesPage', () => {
  const initialState = {
    'notification-page': new Map({
      isFetching: false,
      notifications: List([]),
      total: 0,
      nextPage: null,
      hasMoreItems: false,
      pageSize: null,
      acknowledgingTaskIds: Set([]),
    }),
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });


  it('renders loading when fetching messages', async () => {
    const fetchNotifications = jest.fn();
    const fetchNotificationsNextPage = jest.fn();
    const acknowledgeNotification = jest.fn();
    const clearNotifications = jest.fn();

    const props = {
      isFetching: true,
      notifications: new List([]),
    };
    const wrapper = await mount(<MessagesPage
      store={store}
      {...props}
      fetchNotifications={fetchNotifications}
      fetchNotificationsNextPage={fetchNotificationsNextPage}
      clearNotifications={clearNotifications}
      acknowledgeNotification={acknowledgeNotification}

    />);
    const loadingWrapper = wrapper.find('#loadingMessages');
    expect(loadingWrapper.text()).toEqual('Loading messages...');
    expect(fetchNotifications).toBeCalled();

    wrapper.unmount();
    expect(clearNotifications).toBeCalled();
  });
  it('renders notifications', async () => {
    const fetchNotifications = jest.fn();
    const fetchNotificationsNextPage = jest.fn();
    const acknowledgeNotification = jest.fn();
    const clearNotifications = jest.fn();

    const props = {
      isFetching: false,
      notifications: Immutable.fromJS([{
        task: {
          id: 'id',
          description: 'description',
          priority: 1000,
          name: 'name',
          created: moment(),
        },

      }]),
      hasMoreItems: false,
      total: 1,
      acknowledgingTaskIds: new List([]),
    };
    const wrapper = await mount(<MessagesPage
      store={store}
      {...props}
      fetchNotifications={fetchNotifications}
      fetchNotificationsNextPage={fetchNotificationsNextPage}
      clearNotifications={clearNotifications}
      acknowledgeNotification={acknowledgeNotification}

    />);

    const messagesCountWrapper = wrapper.find('#numberOfMessages');
    expect(messagesCountWrapper.text()).toEqual('1 messages');

    const flashCardWrapper = wrapper.find('#messageName');
    expect(flashCardWrapper.find('h3').text()).toEqual('!WarningEmergency: name');
    expect(wrapper.find('#messageCreated').text()).toEqual('a few seconds ago');
    expect(wrapper.find('button').text()).toEqual('Acknowledge');

    wrapper.unmount();
    expect(clearNotifications).toBeCalled();
  });
});

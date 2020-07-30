import React from 'react';
import { createMemoryHistory } from 'history'
import { Header } from './Header';
import AppConstants from '../../common/AppConstants';

describe('Header', () => {

  const props = {
    history: createMemoryHistory(),
    appConfig: {
      serviceDeskUrls: {
        support: 'test'
      }
    },
    kc: {
      logout: jest.fn(),
    },
    location: {
      pathname: AppConstants.DASHBOARD_PATH
    }
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

});

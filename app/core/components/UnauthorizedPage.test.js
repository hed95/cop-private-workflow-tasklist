import React from 'react';
import { shallow } from 'enzyme';
import UnauthorizedPage from './UnauthorizedPage';

describe('Unauthorized page', () => {
  it('renders authorized text', async () => {
    const wrapper = shallow(<UnauthorizedPage />);
    expect(wrapper.find('#unauthorizedText').text()).toEqual('You are not authorized to access the platform');
  });
});

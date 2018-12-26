import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UnauthorizedPage from './UnauthorizedPage';
Enzyme.configure({ adapter: new Adapter() });

describe('Unauthorized page', () => {
  it('renders authorized text', async() => {
    const wrapper = shallow(<UnauthorizedPage/>);
    expect(wrapper.find('#unauthorizedText').text()).toEqual('You are not authorized to access the platform');
  });
});

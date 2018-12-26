import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DataSpinner from './DataSpinner';
Enzyme.configure({ adapter: new Adapter() });

describe('DataSpinner component', () => {
  it('renders loading text', async() => {
    const wrapper = shallow(<DataSpinner message="Loading content" />);
    expect(wrapper.find('#dataSpinner').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Loading content');
  });
});

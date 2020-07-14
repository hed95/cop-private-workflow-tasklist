import React from 'react';
import PrivacyAndCookiePolicy from './PrivacyAndCookiePolicy';

describe('Privacy Policy page', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<PrivacyAndCookiePolicy />);
    expect(wrapper).toMatchSnapshot();
  });
});

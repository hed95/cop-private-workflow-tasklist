import React from 'react';
import { mount } from 'enzyme';
import SubmissionBanner from './SubmissionBanner';
import PubSub from 'pubsub-js';


describe('SubmissionBanner', () => {
  it('component is hidden if no submission', async () => {
    const wrapper = await mount(<SubmissionBanner />);
    expect(wrapper.html()).toBeNull();
  });
  it('renders submission if data received', async () => {
    const wrapper = await mount(<SubmissionBanner />);
    PubSub.publishSync('submission', {
      submission: true,
      message: 'test',
    });
    expect(wrapper.html())
      .toEqual('<div class="container" id="successfulSubmission" style="padding-top: 5px;"><div class="govuk-panel govuk-panel--confirmation"><div class="govuk-panel__body govuk-!-font-size-24 govuk-!-font-weight-bold">test</div></div></div>');
  });
});

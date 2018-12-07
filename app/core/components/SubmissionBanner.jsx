import React from 'react';
import PubSub from 'pubsub-js';


class SubmissionBanner extends React.Component {

  constructor() {
    super();
    this.state = { submission: false, message: null, visibility: 'hidden' };
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  componentWillMount() {
    this.token = PubSub.subscribe('submission', this.handleSubmission);
  }


  componentWillUnmount() {
    if (this.token) {
      PubSub.unsubscribe(this.token);
    }
  }

  handleSubmission(mgs, data) {
    this.setState({
      submission: data.submission,
      message: data.message
    });
    setTimeout(() => {
      this.setState({
        submission: false, message: null
      });
    }, 5000);
  }

  render() {
    const { submission, message } = this.state;

    return submission ? <div className="container" id="successfulSubmission">
      <div className="govuk-box-highlight confirm-page new">
        <span className="hod-checkmark"/>
        <h2 className="heading-small">
          {message}
        </h2>
      </div>
    </div> : <div/>;
  }
}

export default SubmissionBanner;

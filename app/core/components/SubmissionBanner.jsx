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
      message: data.message,
      type: data.type ? data.type : 'success',
      autoDismiss: data.autoDismiss ? data.autoDismiss : true
    });

    if (data.autoDismiss) {
      setTimeout(() => {
        this.setState({
          submission: false, message: null, type: null, autoDismiss: true
        });
      }, 5000);
    }
  }

  render() {
    const { submission, message, type } = this.state;
    if (submission) {
       if (type === 'warning') {
         return <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
           <div className="notice">
             <i className="icon icon-important">
               <span className="visually-hidden">Warning</span>
             </i>
             <strong className="bold-medium">
               {message}
             </strong>
           </div>
         </div>
       } else {
         return <div className="container" id="successfulSubmission">
           <div className="govuk-box-highlight confirm-page new">
             <span className="hod-checkmark"/>
             <h2 className="heading-small">
               {message}
             </h2>
           </div>
         </div>
       }
    } else {
      return null;
    }
  }
}

export default SubmissionBanner;

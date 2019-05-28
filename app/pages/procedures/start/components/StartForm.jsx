import React from 'react';
import {Form} from 'react-formio';
import AppConstants from '../../../../common/AppConstants';

class StartForm extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  handleCancel = (resetForm) => {
    this.props.history.replace(AppConstants.PROCEDURES_PATH);
    resetForm(false);
  };

  options = {
    noAlerts: true,
    language: 'en',
    hooks:{
      beforeCancel: (...args) => {
        this.handleCancel(args);
      }
    },
    buttonSettings: {
      showCancel: true
    },
    i18n: {
      en: {
        submit: 'Submit',
        cancel: 'Cancel',
        previous: 'Back',
        next: 'Next'
      }
    }
  };

  render() {
    const { dataChange, submission, formReference, handleSubmit, onCustomEvent, startForm} = this.props;
    if (submission) {
      return <Form
        submission={{
          data: submission
        }}
        onChange={(instance) => dataChange(instance)}
        form={startForm} ref={(form) => formReference(form)} options={this.options}
        onCustomEvent={(event) => onCustomEvent(event)}
        onSubmit={(submission) => handleSubmit(submission)}/>;
    } else {
      return <Form
        onChange={(instance) => dataChange(instance)}
        form={startForm} ref={(form) => formReference(form)} options={this.options}
        onCustomEvent={(event) => onCustomEvent(event)}
        onSubmit={(submission) => handleSubmit(submission)}/>;
    }

  }
}

export default StartForm;

import React from 'react';
import { Form } from 'react-formio';
import AppConstants from '../../../../common/AppConstants';

const StartForm = ({form, processDefinition, handleSubmit, history, formReference}) => {
  let cancelButtonAdded;
  const onRender = () => {
    const hasCancelButton = $('.list-inline ul li:contains("Cancel")').length;
    if (hasCancelButton === 0 && cancelButtonAdded !== true) {
      $('.list-inline li:eq(0)')
        .before('<li class="list-inline-item"><button id="cancelButton" class="btn btn-default btn-secondary btn-wizard-nav-cancel">Cancel</button></li>');
      $('#cancelButton')
        .bind('click', (e) => {
          e.preventDefault();
          history.replace(AppConstants.DASHBOARD_PATH);
        });
      cancelButtonAdded = true;
    }
  };

  const options = {
    noAlerts: true,
    language: 'en',
    buttonSettings: {
      showCancel: false
    },
    i18n: {
      en: {
        submit : 'Submit',
        cancel: 'Cancel',
        previous: 'Back',
        next: 'Next'
      }
    }
  };
  const onCustomEvent = (event) => {
    if (event.type === 'cancel') {
      history.replace(AppConstants.DASHBOARD_PATH);
    }
  };

  const resetCancelButton =() => {
    if (cancelButtonAdded === true) {
      cancelButtonAdded = false;
    }
  };

  return <Form
    onNextPage={() => {
      resetCancelButton();
    }}
    onPrevPage={() => {
      resetCancelButton();
    }}
    onRender={() => onRender()}
    form={form} ref={(form) => formReference(form)} options={options}
    onCustomEvent={(event) => onCustomEvent(event)}
    onSubmit={(submission) => handleSubmit(submission)}/>;
};
export default StartForm;

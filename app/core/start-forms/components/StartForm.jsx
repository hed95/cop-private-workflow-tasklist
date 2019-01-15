import React from 'react';
import PropTypes from 'prop-types';
import {
  form,
  loadingForm, submissionToFormIOSuccessful,
  submissionToWorkflowSuccessful, submittingToFormIO,
  submittingToWorkflow
} from '../selectors';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-formio';
import NotFound from '../../components/NotFound';
import AppConstants from '../../../common/AppConstants';

export class StartForm extends React.Component {
  componentDidMount() {
    if (this.props.formName) {
      const formDataContext = this.props.formDataContext;
      const formName = this.props.formName;
      if (formDataContext) {
        this.props.fetchFormWithContext(formName, formDataContext);
      } else {
        this.props.fetchForm(formName);
      }
    }
  }

  shouldComponentUpdate() {
    return !this.form;
  }

  componentWillReceiveProps(nextProps) {
    if (this.form && this.form.formio) {
      if (!nextProps.submittingToWorkflow && nextProps.submissionToWorkflowSuccessful) {
        this.form.formio.emit('submitDone');
        this.props.history.replace(AppConstants.DASHBOARD_PATH);
      } else {
        if ((!nextProps.submittingToFormIO && !nextProps.submissionToFormIOSuccessful)
          || (!nextProps.submittingToWorkflow && !nextProps.submissionToWorkflowSuccessful)) {
          this.form.formio.emit('error');
          this.form.formio.emit('change', this.form.formio.submission);
        }
      }
    }
  }

  componentWillUnmount() {
    this.form = null;
    this.props.resetForm();
  }

  resetCancelButton = () => {
    if (this.cancelButtonAdded === true) {
      this.cancelButtonAdded = false;
    }
  };


  render() {
    const onRender = () => {
      const hasCancelButton = $('.list-inline ul li:contains("Cancel")').length;
      if (hasCancelButton === 0 && this.cancelButtonAdded !== true) {
        $('.list-inline li:eq(0)')
          .before('<li class="list-inline-item"><button id="cancelButton" class="btn btn-default btn-secondary btn-wizard-nav-cancel">Cancel</button></li>');
        $('#cancelButton')
          .bind('click', (e) => {
            e.preventDefault();
            this.props.history.replace(AppConstants.DASHBOARD_PATH);
          });
        this.cancelButtonAdded = true;
      }
    };
    const { loadingForm, form, processName, processKey, formName } = this.props;
    if (loadingForm) {
      return <div>Loading form for {processName}</div>;
    } else {
      const options = {
        noAlerts: true,
        language: 'en',
        buttonSettings: {
          showCancel: false
        },
        i18n: {
          en: {
            cancel: 'Cancel',
            previous: 'Back',
            next: 'Next'
          }
        }
      };
      const onCustomEvent = (event) => {
        if (event.type === 'cancel') {
          this.props.history.replace(AppConstants.DASHBOARD_PATH);
        }
      };
      if (form) {
        const variableInput = form.components.find(c => c.key === 'submitVariableName');
        const variableName = variableInput ? variableInput.defaultValue : formName;
        const process = processName ? processName : processKey;
        console.log(JSON.stringify(form));
        return <Form
          onNextPage={() => {
            this.resetCancelButton();
          }}
          onPrevPage={() => {
            this.resetCancelButton();
          }}
          onRender={() => onRender()}
          form={form} ref={(form) => this.form = form} options={options}
          onCustomEvent={(event) => onCustomEvent(event)}
          onSubmit={(submission) => {
            this.props.submit(form._id, processKey, variableName, submission.data, process);
          }}/>;
      } else {
        return <NotFound resource="Form" id={this.props.formName}/>;
      }

    }
  }
}

StartForm.propTypes = {
  formName: PropTypes.string.isRequired,
  processName: PropTypes.string.isRequired,
  processKey: PropTypes.string.isRequired,
  fetchForm: PropTypes.func,
  resetForm: PropTypes.func,
  fetchFormWithContext: PropTypes.func,
  loadingForm: PropTypes.bool,
  submittingToFormIO: PropTypes.bool,
  submissionToFormIOSuccessful: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect((state) => {
  return {
    form: form(state),
    loadingForm: loadingForm(state),
    submissionToWorkflowSuccessful: submissionToWorkflowSuccessful(state),
    submittingToWorkflow: submittingToWorkflow(state),
    submissionToFormIOSuccessful: submissionToFormIOSuccessful(state),
    submittingToFormIO: submittingToFormIO(state)

  };
}, mapDispatchToProps)(withRouter(StartForm));

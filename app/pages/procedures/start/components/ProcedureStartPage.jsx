import * as React from 'react';
import PropTypes from 'prop-types';
import {
  form,
  loadingForm,
  processDefinition,
  submissionToWorkflowSuccessful,
  submittingToWorkflow
} from '../selectors';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppConstants from '../../../../common/AppConstants';

import DataSpinner from '../../../../core/components/DataSpinner';
import Loader from 'react-loader-advanced';
import StartForm from './StartForm';
import NotFound from '../../../../core/components/NotFound';

class ProcessStartPage extends React.Component {
  componentDidMount() {
    if (this.props.processKey) {
      this.props.fetchProcessDefinition(this.props.processKey);
    } else {
      const { match: { params } } = this.props;
      this.props.fetchProcessDefinition(params.processKey);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.processDefinition !== prevProps.processDefinition) {
      this.props.fetchForm(this.props.processDefinition.get('formKey'));
    }

    if (this.form && this.form.formio) {
      const { submittingToWorkflow, submissionToWorkflowSuccessful, submittingToFormIO, submissionToFormIOSuccessful }
      = this.submissionInfo(prevProps);

      if (!submittingToWorkflow && submissionToWorkflowSuccessful) {
        this.form.formio.emit('submitDone');
        if (this.props.redirectPath) {
          this.props.history.replace(this.props.redirectPath);
        } else {
          this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
        }
      } else {
        if ((!submittingToFormIO && !submissionToFormIOSuccessful) ||
          (!submittingToWorkflow && !submissionToWorkflowSuccessful)) {
          this.form.formio.emit('error');
          this.form.formio.emit('change', this.form.formio.submission);
        }
      }
    }
  }

  submissionInfo(prevProps) {
    const submittingToWorkflow = (this.props.submittingToWorkflow !== prevProps.submittingToWorkflow)
      && this.props.submittingToWorkflow;
    const submissionToWorkflowSuccessful = (this.props.submissionToWorkflowSuccessful !== prevProps.submissionToWorkflowSuccessful)
      && this.props.submissionToWorkflowSuccessful;

    const submittingToFormIO = (this.props.submittingToFormIO !== prevProps.submittingToFormIO) &&
      this.props.submittingToFormIO;

    const submissionToFormIOSuccessful = (this.props.submissionToFormIOSuccessful !== prevProps.submissionToFormIOSuccessful)
      && this.props.submissionToFormIOSuccessful;
    return {
      submittingToWorkflow,
      submissionToWorkflowSuccessful,
      submittingToFormIO,
      submissionToFormIOSuccessful
    };
  }

  componentWillUnmount() {
    this.props.clearProcessDefinition();
  }


  render() {
    const { processDefinition, submittingToWorkflow, form, loadingForm } = this.props;
    const pointerStyle = { cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline' };
    if (loadingForm) {
      return <DataSpinner message="Loading procedure..."/>;
    } else {
      if (!form) {
        return <NotFound resource="Form" id={processDefinition.get('formKey')}/>;
      }
      const procedureKey = processDefinition.getIn(['process-definition', 'key']);
      const variableInput = form.components.find(c => c.key === 'submitVariableName');
      const variableName = variableInput ? variableInput.defaultValue : form.name;
      const process = processDefinition.getIn(['process-definition', 'name']) ?
        processDefinition.getIn(['process-definition', 'name']) : procedureKey;

      return <div>
        {!this.props.noBackLink ? <div style={pointerStyle}
                                       onClick={(event) => this.props.history.replace('/procedures')}>Back
          to
          procedures
        </div> : null}

        <Loader show={submittingToWorkflow}
                message={<div style={{ justifyContent: 'center' }}><DataSpinner
                  message="Starting procedure..."/></div>}
                hideContentOnLoad={submittingToWorkflow}
                foregroundStyle={{ color: 'black' }}
                backgroundStyle={{ backgroundColor: 'white' }}>
          <div className="grid-row">
            <div className="column-full">
              <fieldset>
                <div>
                  <h2 className="heading-large">
                    <span
                      className="heading-secondary">Operational procedure</span> {processDefinition.getIn(['process-definition', 'name'])}
                  </h2>


                  <StartForm form={form}
                             processDefinition={processDefinition.get('process-definition')}
                             history={this.props.history} formReference={(form) => this.form = form}
                             handleSubmit={(submission) => {
                               this.props.submit(form._id, procedureKey,
                                 variableName,
                                 submission.data, process,
                                 this.props.nonShiftApiCall);
                             }}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </Loader>


      </div>;
    }

  };

}

ProcessStartPage.propTypes = {
  fetchProcessDefinition: PropTypes.func.isRequired,
  clearProcessDefinition: PropTypes.func.isRequired,
  submit: PropTypes.func,
  processDefinition: ImmutablePropTypes.map,
  submittingToWorkflow: PropTypes.bool,
  submissionToWorkflowSuccessful: PropTypes.bool,
  loadingForm: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  processDefinition: processDefinition,
  submittingToWorkflow: submittingToWorkflow,
  submissionToWorkflowSuccessful: submissionToWorkflowSuccessful,
  form: form,
  loadingForm: loadingForm
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessStartPage));

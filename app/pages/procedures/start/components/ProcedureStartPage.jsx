import * as React from 'react';
import PropTypes from 'prop-types';
import {
  form,
  isFetchingProcessDefinition,
  loadingForm,
  processDefinition,
  submissionToWorkflowSuccessful,
  submittingToWorkflow
} from '../selectors';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppConstants from '../../../../common/AppConstants';

import DataSpinner from '../../../../core/components/DataSpinner';
import Loader from 'react-loader-advanced';
import StartForm from './StartForm';
import NotFound from '../../../../core/components/NotFound';
import secureLocalStorage from '../../../../common/security/SecureLocalStorage';
import withLog from '../../../../core/error/component/withLog';


export class ProcessStartPage extends React.Component {

  constructor(props) {
    super(props);
    this.secureLocalStorage = secureLocalStorage;
  }

  componentDidMount() {
    if (this.props.processKey) {
      this.props.fetchProcessDefinition(this.props.processKey);
    } else {
      const { match: { params } } = this.props;
      this.props.fetchProcessDefinition(params.processKey);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isFetchingProcessDefinition !== prevProps.isFetchingProcessDefinition
      && !this.props.isFetchingProcessDefinition) {
      this.props.fetchForm(this.props.processDefinition.get('formKey'));
    }

    if (this.form && this.form.formio) {
      const path = this.props.history.location.pathname;
      const user = this.props.kc.tokenParsed.email;

      const { submittingToWorkflow, submissionToWorkflowSuccessful, submittingToFormIO, submissionToFormIOSuccessful }
        = this.submissionInfo(prevProps);
      if (!submittingToWorkflow && submissionToWorkflowSuccessful) {
        this.form.formio.emit('submitDone');
        this.secureLocalStorage.removeAll();
        this.props.log([{
          user: user,
          path: path,
          level: 'info',
          message: `Procedure ${this.props.processDefinition.get('key')} successfully started`
        }]);
        if (this.props.redirectPath) {
          this.props.history.replace(this.props.redirectPath);
        } else {
          this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
        }
      } else {
        if ((!submittingToFormIO && !submissionToFormIOSuccessful) ||
          (!submittingToWorkflow && !submissionToWorkflowSuccessful)) {
          this.props.log([{
            user: user,
            path: path,
            level: 'error',
            message: `Procedure ${this.props.processDefinition.get('key')} failed to be initiated`
          }]);
          this.form.formio.emit('error');

          const submission = this.form.formio.submission ? this.form.formio.submission :
            this.secureLocalStorage.get(this.props.processDefinition.getIn(['process-definition', 'id']));

          this.form.formio.emit('change', submission);
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


  handleCustomEvent = (event) => {
    if (event.type === 'cancel') {
      this.secureLocalStorage.removeAll();
      this.props.history.replace(AppConstants.DASHBOARD_PATH);
    }
  };

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
                message={<div style={{ justifyContent: 'center',
                  zIndex: 100,
                  borderRadius: 0,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '-20px',
                  margin: 'auto' }}><DataSpinner
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

                  <StartForm {...this.props}
                             startForm={form}
                             formReference={(form) => {
                               this.form = form;
                             }}
                             removeAll={this.secureLocalStorage.removeAll()}
                             submission={this.secureLocalStorage.get(processDefinition.getIn(['process-definition','id']))}
                             dataChange={(instance) => {
                               this.secureLocalStorage.set(processDefinition.getIn(['process-definition','id']), instance.data)
                              }
                             }
                             onCustomEvent ={(event) => this.handleCustomEvent(event)}
                             handleSubmit={(submission) => {
                               if (this.form && this.form.formio) {
                                 this.form.formio.submitted = true;
                                 this.form.formio.submitting = true;
                               }
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
  log: PropTypes.func,
  fetchForm: PropTypes.func,
  fetchProcessDefinition: PropTypes.func.isRequired,
  clearProcessDefinition: PropTypes.func.isRequired,
  submit: PropTypes.func,
  processDefinition: ImmutablePropTypes.map,
  submittingToWorkflow: PropTypes.bool,
  submissionToWorkflowSuccessful: PropTypes.bool,
  loadingForm: PropTypes.bool
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
  return {
    processDefinition: processDefinition(state),
    submittingToWorkflow: submittingToWorkflow(state),
    submissionToWorkflowSuccessful: submissionToWorkflowSuccessful(state),
    form: form(state),
    loadingForm: loadingForm(state),
    isFetchingProcessDefinition: isFetchingProcessDefinition(state),
    kc: state.keycloak
  };
}, mapDispatchToProps)(withLog(ProcessStartPage)));

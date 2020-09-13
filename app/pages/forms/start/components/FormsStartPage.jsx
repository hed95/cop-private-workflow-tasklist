import * as React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Formio } from 'react-formio';
import Loader from 'react-loader-advanced';
import PubSub from 'pubsub-js';
import Immutable from 'immutable';
import StartForm from './StartForm';
import NotFound from '../../../../core/components/NotFound';
import secureLocalStorage from '../../../../common/security/SecureLocalStorage';
import withLog from '../../../../core/error/component/withLog';
import { FAILED, SUBMISSION_SUCCESSFUL, SUBMITTING } from '../constants';
import AppConstants from '../../../../common/AppConstants';
import DataSpinner from '../../../../core/components/DataSpinner';
import CompleteTaskForm from '../../../task/form/components/CompleteTaskForm';
import FormioEventListener from '../../../../core/util/FormioEventListener';
import * as actions from '../actions';
import {
  form,
  isFetchingProcessDefinition,
  loadingForm,
  processDefinition,
  submissionResponse,
  submissionStatus,
} from '../selectors';

const { Map } = Immutable;

export class ProcessStartPage extends React.Component {
  constructor(props) {
    super(props);
    this.secureLocalStorage = secureLocalStorage;
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  componentDidMount() {
    if (this.props.processKey) {
      this.props.fetchProcessDefinition(this.props.processKey);
    } else {
      const {
        match: { params },
      } = this.props;
      this.props.fetchProcessDefinition(params.processKey);
    }
    document.title = AppConstants.APP_NAME;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { processDefinition } = this.props;
    if (
      this.props.isFetchingProcessDefinition !==
        prevProps.isFetchingProcessDefinition &&
      !this.props.isFetchingProcessDefinition
    ) {
      this.props.fetchForm(processDefinition.get('formKey'));
    }

    if (processDefinition) {
      document.title = `${processDefinition.getIn([
        'process-definition',
        'name',
      ])} | ${AppConstants.APP_NAME}`;
    }

    const { submissionStatus } = this.props;
    if (
      submissionStatus !== prevProps.submissionStatus &&
      this.form &&
      this.form.formio
    ) {
      const path = this.props.history.location.pathname;
      const user = this.props.kc.tokenParsed.email;
      const processKey = processDefinition.getIn(['process-definition', 'key']);
      this.handleSubmission(submissionStatus, user, path, processKey);
    }
  }

  componentWillUnmount() {
    this.props.clearProcessDefinition();
    if (this.props.processDefinition.getIn(['process-definition', 'id'])) {
      this.secureLocalStorage.remove(
        this.props.processDefinition.getIn(['process-definition', 'id']),
      );
    }
  }

  handleCustomEvent = event => {
    const { history, processDefinition: pd } = this.props;
    switch (event.type) {
      case 'cancel':
        this.secureLocalStorage.remove(pd.getIn(['process-definition', 'id']));
        history.replace(AppConstants.DASHBOARD_PATH);
        break;
      case 'cancel-form':
        this.secureLocalStorage.remove(pd.getIn(['process-definition', 'id']));
        history.replace(AppConstants.FORMS_PATH);
        break;
      case 'save-draft':
        break;
      default:
    }
  };

  handleSubmission(submissionStatus, user, path, processKey) {
    switch (submissionStatus) {
      case SUBMITTING:
        this.props.log([
          {
            user,
            path,
            level: 'info',
            message: `Submitting data for ${processKey}`,
          },
        ]);
        break;
      case SUBMISSION_SUCCESSFUL:
        window.scrollTo(0, 0);
        this.form.formio.emit('submitDone');
        this.secureLocalStorage.remove(
          this.props.processDefinition.getIn(['process-definition', 'id']),
        );
        this.props.log([
          {
            user,
            path,
            level: 'info',
            message: `Procedure ${processKey} successfully started`,
          },
        ]);
        Formio.clearCache();
        if (
          !this.props.submissionResponse.tasks ||
          this.props.submissionResponse.tasks.length === 0
        ) {
          PubSub.publish('submission', {
            submission: true,
            autoDismiss: true,
            message: `${processKey} successfully submitted`,
          });
          if (this.props.redirectPath) {
            this.props.history.replace(this.props.redirectPath);
          } else {
            this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
          }
        }
        break;
      case FAILED:
        this.props.log([
          {
            user,
            path,
            level: 'error',
            message: `Procedure ${processKey} failed to be initiated`,
          },
        ]);
        const submission = this.form.formio.submission
          ? this.form.formio.submission
          : this.secureLocalStorage.get(
              this.props.processDefinition.getIn(['process-definition', 'id']),
            );
        this.form.formio.emit('error');
        this.form.formio.emit('change', submission);
        break;
      default:
        this.props.log([
          {
            level: 'warn',
            path,
            user,
            message: 'Unknown submission status',
            submissionStatus,
          },
        ]);
    }
  }

  render() {
    const {
      form,
      loadingForm,
      noBackLink,
      processDefinition,
      submissionStatus,
    } = this.props;
    const backToFormsLink = () => {
      let link = null;

      if (!noBackLink) {
        link = (
          <a
            href={AppConstants.FORMS_PATH}
            className="govuk-back-link govuk-!-font-size-19"
          >
            Back to forms
          </a>
        );
      }
      return link;
    };

    if (loadingForm) {
      return <DataSpinner message="Loading form..." />;
    }
    if (!form) {
      return <NotFound resource="Form" id={processDefinition.get('formKey')} />;
    }
    const procedureKey = processDefinition.getIn(['process-definition', 'key']);
    const variableInput = form.components.find(
      c => c.key === 'submitVariableName',
    );
    const variableName = variableInput ? variableInput.defaultValue : form.name;
    const process = processDefinition.getIn(['process-definition', 'name'])
      ? processDefinition.getIn(['process-definition', 'name'])
      : procedureKey;

    return (
      <div>
        {backToFormsLink()}
        <Loader
          show={submissionStatus === SUBMITTING}
          message={(
            <div
              style={{
                justifyContent: 'center',
                zIndex: 100,
                borderRadius: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                top: '-20px',
                margin: 'auto',
              }}
            >
              <DataSpinner message="Submitting form..." />
            </div>
          )}
          hideContentOnLoad={submissionStatus === SUBMITTING}
          foregroundStyle={{ color: 'black' }}
          backgroundStyle={{ backgroundColor: 'white' }}
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div>
                <span className="govuk-caption-l">Operational form</span>
                <h2 className="govuk-heading-l">
                  {processDefinition.getIn(['process-definition', 'name'])}
                </h2>
                {this.props.submissionResponse &&
                this.props.submissionResponse.tasks &&
                this.props.submissionResponse.tasks.length !== 0 ? (
                  <CompleteTaskForm
                    variables={
                      this.props.submissionResponse.processInstance.variables
                    }
                    fromProcedure
                    task={
                      new Map({
                        fromProcedure: true,
                        processName: processDefinition.getIn([
                          'process-definition',
                          'name',
                        ]),
                        processDefinitionId: processDefinition.getIn([
                          'process-definition',
                          'id',
                        ]),
                        formKey: this.props.submissionResponse.tasks[0].formKey,
                        id: this.props.submissionResponse.tasks[0].id,
                        assignee: this.props.submissionResponse.tasks[0]
                          .assignee,
                        processInstanceId: this.props.submissionResponse
                          .tasks[0].processInstanceId,
                        ...this.props.submissionResponse.tasks[0],
                      })
                    }
                  />
                ) : (
                  <StartForm
                    {...this.props}
                    startForm={form}
                    formReference={formLoaded => {
                      this.form = formLoaded;
                      if (this.form) {
                        this.form.createPromise.then(() => {
                          new FormioEventListener(this.form, this.props);
                        });
                      }
                    }}
                    dataChange={instance => {
                      this.secureLocalStorage.set(
                        processDefinition.getIn(['process-definition', 'id']),
                        instance.data,
                      );
                    }}
                    onCustomEvent={event => this.handleCustomEvent(event)}
                    handleSubmit={submission => {
                      if (this.form && this.form.formio) {
                        this.form.formio.submitted = true;
                        this.form.formio.submitting = true;
                      }
                      this.props.submit(
                        form.id,
                        procedureKey,
                        variableName,
                        submission.data,
                        process,
                        this.props.nonShiftApiCall,
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

ProcessStartPage.propTypes = {
  log: PropTypes.func,
  fetchForm: PropTypes.func,
  fetchProcessDefinition: PropTypes.func.isRequired,
  clearProcessDefinition: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  submit: PropTypes.func,
  processDefinition: ImmutablePropTypes.map,
  submissionStatus: PropTypes.string,
  noBackLink: PropTypes.bool,
  extendedStaffDetails: PropTypes.shape(
    {
      linemanagerEmail: PropTypes.string,
      delegateEmails: PropTypes.string,
    }
  ).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(
  connect(state => {
    return {
      processDefinition: processDefinition(state),
      submissionStatus: submissionStatus(state),
      submissionResponse: submissionResponse(state),
      form: form(state),
      loadingForm: loadingForm(state),
      isFetchingProcessDefinition: isFetchingProcessDefinition(state),
      kc: state.keycloak,
      appConfig: state.appConfig,
      extendedStaffDetails: {
        linemanagerEmail: state.keycloak.tokenParsed.linemanagerEmail,
        delegateEmails: state.keycloak.tokenParsed.delegateEmails,
      },
    };
  }, mapDispatchToProps)(withLog(ProcessStartPage)),
);

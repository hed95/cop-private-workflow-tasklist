import React, {PropTypes} from 'react'
import {
    form, loadingForm, submissionToWorkflowSuccessful, submittingToWorkflow
} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Form} from 'react-formio';
import NotFound from "../../components/NotFound";
import AppConstants from "../../../common/AppConstants";

class StartForm extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        if (this.form && this.form.formio.data.submit) {
            if (nextProps.submissionToWorkflowSuccessful) {
                this.form.formio.emit("submitDone");
                this.props.history.replace(AppConstants.DASHBOARD_PATH);
            } else {
                if (!nextProps.submittingToWorkflow) {
                    this.form.formio.emit("error");
                    this.form.formio.emit('change', this.form.formio.submission);
                }
            }
        }
    }

    componentWillUnmount() {
        this.form = null;
        this.props.resetForm();
    }

    render() {
        const {loadingForm, form, processName, processKey, formName} = this.props;
        if (loadingForm) {
            return <div>Loading form for {processName} </div>
        } else {
            const options = {
                noAlerts: true
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
                return <Form form={form} ref={(form) => this.form = form} options={options}
                             onCustomEvent={(event) => onCustomEvent(event)}
                             onSubmit={(submission) => {
                                 this.props.submit(form._id, processKey, variableName, submission.data, process);

                             }}/>
            } else {
                return <NotFound resource="Form" id={this.props.formName}/>
            }

        }
    }
}

StartForm.propTypes = {
    fetchForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchFormWithContext: PropTypes.func.isRequired,
    loadingForm: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect((state) => {
    return {
        form: form(state),
        loadingForm: loadingForm(state),
        submissionToWorkflowSuccessful: submissionToWorkflowSuccessful(state),
        submittingToWorkflow: submittingToWorkflow(state)

    }
}, mapDispatchToProps)(withRouter(StartForm))
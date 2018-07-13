import React, {PropTypes} from 'react'
import {
    form, loadingTaskForm, submittingTaskFormForCompletion,
    taskFormValidationSuccessful,
    taskFormCompleteSuccessful
} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Form} from 'react-formio';
import {createStructuredSelector} from "reselect";
import Spinner from 'react-spinkit';

class TaskForm extends React.Component {

    componentDidMount() {
        this.props.fetchTaskForm(this.props.task);
    }


    componentWillReceiveProps(nextProps) {
        if (this.form && (this.form.formio && this.form.formio.data.submit)) {
            if (nextProps.taskFormCompleteSuccessful && nextProps.taskFormValidationSuccessful) {
                this.form.formio.emit("submitDone");
                this.props.history.replace("/tasks");
            } else {
                if (!nextProps.submittingTaskFormForCompletion) {
                    this.form.formio.emit("error");
                    this.form.formio.emit('change', this.form.formio.submission);
                }
            }
        }
    }

    componentWillUnmount() {
        this.form= null;
        this.props.resetForm();
    }

    renderForm() {
        const {loadingTaskForm, form, task, variables} = this.props;
        if (loadingTaskForm) {
            return <div>Loading form for {task.get('name')} </div>
        } else {
            const options = {
                noAlerts: true
            };

            if (!task.get('assignee')) {
                options.readOnly = true;
            }

            if (form) {
                const submit = form.components.find(c => c.key === 'submit');
                const submissionData = variables['submissionData'];
                if (submit) {
                    const variableInput = form.components.find(c => c.key === 'submitVariableName');
                    const variableName = variableInput.defaultValue;

                    if (submissionData) {
                        return <Form form={form} options={options} ref={(form) => this.form = form}
                                     submission={JSON.parse(submissionData)} onSubmit={(submission) => {
                            this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);

                        }}/>
                    } else {
                        return <Form form={form} ref={(form) => this.form = form} options={options}
                                     onSubmit={(submission) => {
                                         this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);
                                     }}/>
                    }

                } else {
                    return <Form form={form} options={
                       options
                    } ref={(form) => this.form = form}
                                 submission={JSON.parse(submissionData)}/>
                }


            } else {
                return <div/>
            }

        }
    }

    render() {
        const {submittingTaskFormForCompletion, submittingTaskFormForValidation} = this.props;
        return <div>
            {submittingTaskFormForValidation || submittingTaskFormForCompletion ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '5px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div/>
            }
            <div>{this.renderForm()}</div>
        </div>
    }
}

TaskForm.propTypes = {
    submitTaskForm: PropTypes.func.isRequired,
    fetchTaskForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    loadingTaskForm: PropTypes.bool
};


const mapStateToProps = createStructuredSelector({
    form: form,
    loadingTaskForm: loadingTaskForm,
    taskFormValidationSuccessful: taskFormValidationSuccessful,
    submittingTaskFormForCompletion: submittingTaskFormForCompletion,
    taskFormCompleteSuccessful: taskFormCompleteSuccessful

});


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));
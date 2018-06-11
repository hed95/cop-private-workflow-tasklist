import React, {PropTypes} from 'react'
import {
    form, loadingTaskForm, submittingTaskFormForCompletion,
    submittingTaskFormForValidation,
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
        if (nextProps.taskFormCompleteSuccessful) {
            this.props.history.replace("/tasks");
        }
    }

    renderForm() {
        const {loadingTaskForm, form, task} = this.props;
        if (loadingTaskForm) {
            return <div>Loading form for {task.getIn(['task', 'name'])} </div>
        } else {
            const options = {
                noAlerts: true
            };
            if (form) {
                return <Form form={form} options={options} onSubmit={(submission) => {
                    const variableInput = form.components.find(c => c.key === 'submitVariableName');
                    const variableName = variableInput.defaultValue;
                    this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);
                }}/>
            } else {
                return <div/>
            }

        }
    }

    render() {
        const {submittingTaskFormForCompletion, submittingTaskFormForValidation} = this.props;
        return <div>
            {submittingTaskFormForValidation || submittingTaskFormForCompletion ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div/>
            }

            {this.renderForm()}
        </div>
    }
}

TaskForm.propTypes = {
    submitTaskForm: PropTypes.func.isRequired,
    fetchTaskForm: PropTypes.func.isRequired,
    loadingTaskForm: PropTypes.bool
};


const mapStateToProps = createStructuredSelector({
    form: form,
    loadingTaskForm: loadingTaskForm,
    submittingTaskFormForValidation: submittingTaskFormForValidation,
    submittingTaskFormForCompletion: submittingTaskFormForCompletion,
    taskFormCompleteSuccessful: taskFormCompleteSuccessful

});


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));
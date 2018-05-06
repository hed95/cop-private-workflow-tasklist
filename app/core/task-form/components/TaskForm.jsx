import React, {PropTypes} from 'react'
import {
    form, loadingTaskForm
} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createForm} from "formiojs";

class TaskForm extends React.Component {

    componentDidMount() {
        this.props.fetchTaskForm(this.props.task);
    }

    render() {
        const {loadingTaskForm} = this.props;
        const that = this;
        if (!loadingTaskForm && this.props.form) {
            $("#taskFormio").empty();
            const parsedForm = this.props.form;
            createForm(document.getElementById("taskFormio"), parsedForm, {
                noAlerts: true,
            }).then(function (form) {
                form.on('submit', (submission) => {
                    form.emit('submitDone');
                });
                form.on('error', (errors) => {
                    console.log('IFrame: we have errors!', errors);
                    window.scrollTo(0, 0);
                    form.emit('submitDone');
                });
            }).catch(function (e) {
                console.log('IFrame: caught formio error in promise', e);
            });
        }

        return <div>
            {loadingTaskForm ? <h4 className="heading-small">Loading task form...</h4> :<div/>}
            <div id="taskFormio"/>

        </div>
    }
}

TaskForm.propTypes = {
    fetchTaskForm: PropTypes.func.isRequired,
    loadingTaskForm: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect((state) => {
    return {
        form: form(state),
        loadingTaskForm: loadingTaskForm(state)
    }
}, mapDispatchToProps)(withRouter(TaskForm))
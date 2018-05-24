import React, {PropTypes} from 'react'
import {
    form, formLoadingFailed, loadingForm
} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {createForm} from "formiojs";

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

    componentWillUnmount() {
        this.props.resetForm();
    }

    render() {
        const {loadingForm} = this.props;
        const that = this;
        let loading;
        if (!loadingForm && this.props.form) {
            loading = <div/>
            $("#formio").empty();
            const parsedForm = this.props.form;
            createForm(document.getElementById("formio"), parsedForm, {
                noAlerts: true
            }).then(function (form) {
                form.on('submit', (submission) => {
                    console.log('IFrame: submitting form', submission);
                    const processKey = that.props.processKey;
                    const variableInput = parsedForm.components.find(c => c.key === 'submitVariableName');
                    const variableName = variableInput ? variableInput.defaultValue : that.props.variableName;
                    const processName = that.props.processName ? that.props.processName : processKey;

                    that.props.submit(parsedForm._id,
                        processKey, variableName, submission.data, processName);
                    form.emit('submitDone');
                    that.props.history.replace("/tasks");
                });
                form.on('error', (errors) => {
                    console.log('IFrame: we have errors!', errors);
                    window.scrollTo(0, 0);
                    form.emit('submitDone');
                });
            }).catch(function (e) {
                console.log('IFrame: caught formio error in promise', e);
            });
        } else {
            loading = <div>Loading form...</div>
        }

        return <div>
            {loading}
            <div id="formio"/>
        </div>
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
        loadingForm: loadingForm(state)
    }
}, mapDispatchToProps)(withRouter(StartForm))
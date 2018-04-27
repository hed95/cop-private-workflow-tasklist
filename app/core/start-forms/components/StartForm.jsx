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
        this.props.fetchForm(this.props.formName);
    }

    render() {
        const {loadingForm} = this.props;
        const that = this;

        if (!loadingForm && this.props.form) {
            $("#formio").empty();
            const parsedForm = this.props.form;
            createForm(document.getElementById("formio"), parsedForm, {
                noAlerts: true
            }).then(function (form) {
                form.on('submit', (submission) => {
                    console.log('IFrame: submitting form', submission);
                    const processKey = that.props.processKey;
                    const variableInput = parsedForm.components.find(c => c.key === 'submitVariableName');
                    const variableName = variableInput ? variableInput.defaultValue: that.props.variableName;
                    that.props.submit(parsedForm._id, processKey, variableName, submission.data);
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

        return <div> <div id="formio"/></div>
    }
}

StartForm.propTypes = {
    fetchForm: PropTypes.func.isRequired,
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
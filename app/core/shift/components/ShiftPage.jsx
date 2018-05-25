import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import * as shiftActions from "../../../core/shift/actions";
import * as formActions from "../../../core/start-forms/actions";

import Spinner from 'react-spinkit';
import ImmutablePropTypes from "react-immutable-proptypes";
import {hasActiveShift, isFetchingShift, shift, submittingActiveShift} from "../../../core/shift/selectors";
import {errors, hasError} from "../../../core/error/selectors";
import {createForm} from "formiojs";
import {form, loadingForm} from "../../start-forms/selectors";
import {activeShiftSuccess} from "../selectors";
import $ from "jquery";

const uuidv4 = require('uuid/v4');

class ShiftPage extends React.Component {

    componentDidMount() {
        this.props.actions.shiftActions.fetchActiveShift();
        this.props.actions.formActions.fetchForm("createAnActiveShift");
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.activeShiftSuccess) {
            $('html,body').animate({scrollTop: 0}, 'slow');
        }
    }

    render() {
        const {
            hasActiveShift,
            isFetchingShift,
            submittingActiveShift,
            loadingForm,
            form
        } = this.props;

        const {hasError, errors} = this.props;
        const items = errors.map((err) => {
            return <li key={uuidv4()}>{err.get('url')} - [{err.get('status')} {err.get('error')}]
                - {err.get('message')}</li>
        });

        const headerToDisplay = !submittingActiveShift && !hasActiveShift ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="notice">
                    <i className="icon icon-important">
                        <span className="visually-hidden">Warning</span>
                    </i>
                    <strong className="bold-small">
                        Please enter your current task assignment before proceeding
                    </strong>
                </div>
            </div> : <div/>;

        let loading;
        const that = this;
        if (!loadingForm && form) {
            loading = <div/>;
            $("#shiftform").empty();
            const parsedForm = form;
            createForm(document.getElementById("shiftform"), parsedForm, {
                noAlerts: true
            }).then(function (form) {
                form.on('submit', (submission) => {
                    console.log('IFrame: submitting form', submission);
                    that.props.actions.shiftActions.submit(parsedForm._id, submission.data);
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
        } else {
            loading = <div>Loading form...</div>
        }

        return <div>
            {hasError ?
                <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1"
                     tabIndex="-1">
                    <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                        We are experiencing technical problems
                    </h2>
                    <ul className="error-summary-list">
                        {items}
                    </ul>

                </div> : <div/>}
            {isFetchingShift ?
                <div style={{display: 'flex', justifyContent: 'center'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div>
                : headerToDisplay
            }
            {submittingActiveShift ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div/>
            }

            <div className="grid-row">
                <div className="column-full">
                    <fieldset>
                        <legend>
                            <h3 className="heading-medium">Shift Details</h3>
                        </legend>
                        {loading}
                        <div id="shiftform"/>
                    </fieldset>
                </div>

            </div>
        </div>
    }
}


ShiftPage.propTypes = {
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool,
    shift: ImmutablePropTypes.map
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            shiftActions: bindActionCreators(shiftActions, dispatch),
            formActions: bindActionCreators(formActions, dispatch)
        }
    };
};

export default connect((state) => {
    return {
        kc: state.keycloak,
        hasActiveShift: hasActiveShift(state),
        isFetchingShift: isFetchingShift(state),
        submittingActiveShift: submittingActiveShift(state),
        activeShiftSuccess: activeShiftSuccess(state),
        shift: shift(state),
        hasError: hasError(state),
        errors: errors(state),
        form: form(state),
        loadingForm: loadingForm(state)

    }
}, mapDispatchToProps)(withRouter(ShiftPage))


import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";

import Spinner from 'react-spinkit';
import ImmutablePropTypes from "react-immutable-proptypes";
import {hasActiveShift, isFetchingShift, shift, submittingActiveShift} from "../../../core/shift/selectors";
import {errors, hasError} from "../../../core/error/selectors";
import {activeShiftSuccess, loadingShiftForm, shiftForm} from "../selectors";
import $ from "jquery";
import {Form} from 'react-formio'
import * as actions from "../actions";
import moment from 'moment';
const uuidv4 = require('uuid/v4');

class ShiftPage extends React.Component {

    componentDidMount() {
        this.props.fetchActiveShift();
        this.props.fetchShiftForm();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.activeShiftSuccess) {
            $('html,body').animate({scrollTop: 0}, 'slow');
        }
    }

    renderForm() {
        const {shiftForm, shift, loadingShiftForm, isFetchingShift} = this.props;
        if (isFetchingShift || loadingShiftForm) {
            return <div>Loading Shift Details....</div>
        } else {
            const submit = (submission) => {
                this.props.submit(shiftForm._id, submission.data);
                this.form.formio.emit("submitDone");
            };
            const options = {
                noAlerts: true
            };
            if (shiftForm) {
                if (shift) {
                    const shiftSubmission = {
                        data: {
                            shiftminutes: shift.get('shiftminutes'),
                            shifthours: shift.get('shifthours'),
                            startdatetime: moment.utc(shift.get('startdatetime')),
                            teamid: shift.get('teamid'),
                            locationid: shift.get('locationid'),
                            commandid: shift.get('commandid'),
                            subcommandid: shift.get('subcommandid'),
                            phone: shift.get('phone')
                        }
                    };
                    return <Form form={shiftForm} submission={shiftSubmission} options={options}
                                   ref={(form) => this.form = form}
                                   onSubmit={(submission) => {
                                       this.props.submit(shiftForm._id, submission.data);
                                       this.form.formio.emit("submitDone");
                                   }
                                   }/>
                } else {
                    return <Form form={shiftForm}
                                   ref={(form) => this.form = form}
                                   options={options} onSubmit={submit}/>
                }
            } else {
                return <div/>
            }
        }
    }

    render() {
        const {
            hasActiveShift,
            isFetchingShift,
            submittingActiveShift,
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
            {isFetchingShift && !submittingActiveShift ?
                <div style={{display: 'flex', justifyContent: 'center'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div>
                : headerToDisplay
            }
            {!isFetchingShift && submittingActiveShift ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div/>
            }

            <div className="grid-row">
                <div className="column-full">
                    <fieldset>
                        <legend>
                            <h3 className="heading-medium">Shift Details</h3>
                        </legend>
                        {this.renderForm()}
                    </fieldset>
                </div>

            </div>
        </div>

    }
}


ShiftPage.propTypes = {
    fetchShiftForm: PropTypes.func.isRequired,
    fetchActiveShift: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool,
    shift: ImmutablePropTypes.map
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

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
        shiftForm: shiftForm(state),
        loadingShiftForm: loadingShiftForm(state)

    }
}, mapDispatchToProps)(withRouter(ShiftPage))


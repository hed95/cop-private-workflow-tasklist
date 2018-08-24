import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";

import ImmutablePropTypes from "react-immutable-proptypes";
import {
    activeShiftSuccess,
    hasActiveShift,
    isFetchingShift, isFetchingStaffDetails,
    loadingShiftForm,
    shift,
    shiftForm, staffDetails,
    submittingActiveShift
} from "../../../core/shift/selectors";
import {errors, hasError} from "../../../core/error/selectors";
import {Form} from 'react-formio'
import * as actions from "../../../core/shift/actions";
import moment from 'moment';
import Loader from 'react-loader-advanced';
import {DataSpinner} from "../../../core/components/DataSpinner";

const uuidv4 = require('uuid/v4');

class ShiftPage extends React.Component {

    componentWillMount() {
        this.submit = this.submit.bind(this);

    }

    componentDidMount() {
        this.props.fetchActiveShift();
        this.props.fetchShiftForm();
        this.props.fetchStaffDetails();
    }


    componentWillReceiveProps(nextProps) {
        if (this.form && this.form.formio) {
            if (!nextProps.submittingActiveShift) {
                if (nextProps.activeShiftSuccess) {
                    this.form.formio.emit("submitDone");
                    this.props.history.replace('/dashboard');
                } else {
                    this.form.formio.emit("error");
                    this.form.formio.emit('change', this.form.formio.submission);
                }
            }

        }
    }

    submit = (submission, shiftForm) => {
        this.props.submit(shiftForm._id, submission.data);
    };

    renderForm() {
        const {shiftForm, shift, loadingShiftForm, isFetchingShift, isFetchingStaffDetails, staffDetails} = this.props;

        const onRender = () => {
            if (this.form && this.form.formio) {
                this.form.formio.cancelButton.onclick = (event) => {
                    event.preventDefault();
                    this.props.history.replace("/dashboard")
                }
            }
        };

        if (isFetchingShift && loadingShiftForm && isFetchingStaffDetails) {
            return <DataSpinner message="Loading shift details..."/>
        } else {

            const options = {
                noAlerts: true,
                language: 'en',
                i18n: {
                    en: {
                        cancel: 'Cancel',
                        previous: 'Back',
                        next: 'Next'
                    }
                },
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
                            phone: shift.get('phone'),
                            currentlocationid: shift.get('currentlocationid')
                        }
                    };
                    options.i18n.en.submit = "Amend shift";

                    return <Form form={shiftForm} submission={shiftSubmission} options={options}
                                 ref={(form) => {
                                     this.form = form;
                                 }}
                                 onRender={() => onRender()}
                                 onSubmit={(submission) => this.submit(submission, shiftForm)}
                    />
                } else {
                    options.i18n.en.submit = "Start shift";
                    if (staffDetails) {
                        const shiftSubmission = {
                            data: {
                                shiftminutes: 0,
                                shifthours: 8,
                                startdatetime: moment.utc(moment()),
                                teamid: staffDetails.get('defaultteamid'),
                                locationid: staffDetails.get('defaultlocationid'),
                                commandid: staffDetails.get('defaultcommandid'),
                                subcommandid: staffDetails.get('defaultsubcommandid'),
                                phone: staffDetails.get('phone'),
                                currentlocationid: null
                            }
                        };
                        return <Form form={shiftForm} submission={shiftSubmission} options={options}
                                     ref={(form) => {
                                         this.form = form;
                                     }}
                                     onRender={() => onRender()}
                                     onSubmit={(submission) => this.submit(submission, shiftForm)}/>
                    }
                    return <Form form={shiftForm}
                                 ref={(form) => this.form = form}
                                 onRender={() => onRender()}
                                 options={options} onSubmit={(submission) => this.submit(submission, shiftForm)}/>
                }
            } else {
                return <div/>
            }
        }
    }

    render() {
        const {
            isFetchingShift,
            submittingActiveShift,
            hasError,
            errors

        } = this.props;

        const items = errors.map((err) => {
            return <li key={uuidv4()}>{err.get('url')} - [{err.get('status')} {err.get('error')}]
                - {err.get('message')}</li>
        });

        const spinner = <DataSpinner message="Submitting your shift details..."/>;

        return <div style={{paddingTop: '20px'}}>
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
            <Loader show={!isFetchingShift && submittingActiveShift} message={spinner}
                    hideContentOnLoad={submittingActiveShift}
                    foregroundStyle={{color: 'black'}}
                    backgroundStyle={{backgroundColor: 'white'}}
            >
                <div className="grid-row">
                    <div className="column-full" id="shiftWizardForm">
                        {this.renderForm()}
                    </div>

                </div>
            </Loader>
        </div>

    }
}


ShiftPage.propTypes = {
    fetchShiftForm: PropTypes.func.isRequired,
    fetchActiveShift: PropTypes.func.isRequired,
    fetchStaffDetails: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool,
    isFetchingStaffDetails: PropTypes.bool,
    shift: ImmutablePropTypes.map,
    staffDetails: ImmutablePropTypes.map
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        hasActiveShift: hasActiveShift(state),
        isFetchingShift: isFetchingShift(state),
        submittingActiveShift: submittingActiveShift(state),
        activeShiftSuccess: activeShiftSuccess(state),
        shift: shift(state),
        hasError: hasError(state),
        errors: errors(state),
        shiftForm: shiftForm(state),
        loadingShiftForm: loadingShiftForm(state),
        staffDetails: staffDetails(state),
        isFetchingStaffDetails: isFetchingStaffDetails(state)


    }
}, mapDispatchToProps)(ShiftPage))

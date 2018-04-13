import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    activeSessionError, activeSubmissionSuccess, hasActiveSession,
    isFetchingActiveSession
} from "../../../core/session/selectors";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import * as sessionActions from "../../../core/session/actions";
import * as personActions from '../../../core/person/actions';
import {
    person, isFetchingPerson
} from "../../../core/person/selectors";

import Spinner from 'react-spinkit';
import StartForm from "../../../core/start-forms/components/StartForm";
import {
    hasFormValidationErrors, submittingFormForValidation,
    validationErrors
} from "../../../core/start-forms/selectors";

class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.actions.sessionActions.fetchActiveSession();
        this.props.actions.personActions.fetchPerson();
        this.form = this.createForm();
    }

    componentWillUnmount() {
        this.form = null;
    }

    getValue = (object, propertyName) => {
        return object ? (object[propertyName] ? object[propertyName] : null) : null;
    };

    createForm = () => {
        const activeSession = this.props.activeSession;
        const personDetails = this.props.person;
        let dataContext;
        if (activeSession) {
            dataContext = activeSession
        } else {
            dataContext = {
                teamid: this.getValue(personDetails, 'teamid'),
                personid: this.getValue(personDetails, 'personid'),
                endtime: null,
                regionid: this.getValue(personDetails, 'regionid'),
                locationid: this.getValue(personDetails, 'locationid'),
                setregionasdefault: this.getValue(personDetails, 'setregionasdefault'),
                setteamasdefault: this.getValue(personDetails, 'setteamasdefault'),
                setlocationasdefault:  this.getValue(personDetails, 'setlocationasdefault'),
            };
        }

        return <div className="grid-row">
            <div className="column-full">
                <fieldset>
                    <legend>
                        <h3 className="heading-medium">Team Details</h3>
                    </legend>
                    <StartForm formName="createAnActiveSession" processKey="activate-session" {...this.props}
                               formDataContext={dataContext}/>
                </fieldset>
            </div>

        </div>
    };

    render() {

        const {hasActiveSession, isFetchingActiveSession, isFetchingPerson, activeSessionError, activeSubmissionSuccess} = this.props;
        const headerToDisplay = !hasActiveSession ?
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

            {isFetchingActiveSession && isFetchingPerson ?
                <div style={{display: 'flex', justifyContent: 'center'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div>
                : headerToDisplay
            }

            {activeSessionError ?
                <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1"
                     tabIndex="-1">
                    <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                        Failed to create shift details
                    </h2>
                    <ul className="error-summary-list">
                        <li>{activeSessionError}</li>
                    </ul>

                </div> : <div/>}
            {activeSubmissionSuccess ? <div className="govuk-box-highlight confirm-page new">
                <span className="hod-checkmark"/>
                <h2 className="heading-medium">
                    Shift details created
                </h2>
                <p>You can now nagivate to other areas of the platform</p>
            </div> : <div/>}

            {this.form}
        </div>
    }
}


ProfilePage.propTypes = {
    isFetchingActiveSession: PropTypes.bool,
    hasActiveSession: PropTypes.bool,
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            sessionActions: bindActionCreators(sessionActions, dispatch),
            personActions: bindActionCreators(personActions, dispatch)
        }
    };
};

export default connect((state) => {
    return {
        kc: state.keycloak,
        hasActiveSession: hasActiveSession(state),
        isFetchingActiveSession: isFetchingActiveSession(state),
        person: person(state),
        isFetchingPerson: isFetchingPerson(state),
        hasFormValidationErrors: hasFormValidationErrors(state),
        validationErrors: validationErrors(state),
        submittingFormForValidation: submittingFormForValidation(state),
        activeSessionError: activeSessionError(state),
        activeSubmissionSuccess: activeSubmissionSuccess(state)
    }
}, mapDispatchToProps)(withRouter(ProfilePage))


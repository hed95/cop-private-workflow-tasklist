import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    activeSessionError, activeSubmissionSuccess, hasActiveSession,
    isFetchingActiveSession, submittingActiveSession
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

        return <div className="grid-row">
            <div className="column-full">
                <fieldset>
                    <legend>
                        <h3 className="heading-medium">Team Details</h3>
                    </legend>
                    <StartForm formName="createAnActiveSession" processKey="activate-session" {...this.props}
                               formDataContext={null}/>
                </fieldset>
            </div>

        </div>
    };

    render() {

        const {
            hasActiveSession, isFetchingActiveSession,
            isFetchingPerson,
            activeSubmissionSuccess,
            submittingActiveSession
        } = this.props;
        const headerToDisplay = !submittingActiveSession && !hasActiveSession ?
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
            {activeSubmissionSuccess ? <div className="govuk-box-highlight confirm-page new">
                <span className="hod-checkmark"/>
                <h2 className="heading-small">
                    Shift details created. You can now navigate to other areas of the platform
                </h2>
            </div> : <div/>}
            {submittingActiveSession ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div></div>
            }
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
        submittingFormForValidation: submittingFormForValidation(state),
        submittingActiveSession: submittingActiveSession(state),
        activeSubmissionSuccess: activeSubmissionSuccess(state)
    }
}, mapDispatchToProps)(withRouter(ProfilePage))


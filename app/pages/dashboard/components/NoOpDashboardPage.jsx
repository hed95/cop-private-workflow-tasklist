import React from 'react';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actions from '../../../core/shift/actions';
import {connect} from 'react-redux';


export class NoOpDashboardPage extends React.Component {

    render() {
        return <div className="govuk-grid-row" style={{ width: '100%', height: '200px' }}>
            <div className="govuk-grid-column-full">
                <h2 className="govuk-heading-l">
                    <span className="govuk-caption-l">{this.props.kc.tokenParsed.given_name} {this.props.kc.tokenParsed.family_name}</span>
                    Operational dashboard
                </h2>
            </div>
            <div className="govuk-grid-column-full">
                <h3 className="govuk-heading-m">Access to the platform will be granted once your onboarding or mandatory declaration has been processed</h3>
                <h4 className="govuk-heading-s">Please click <a href="#" className="govuk-link govuk-link--no-visited-state"  onClick={(e) => {this.props.history.replace("/dashboard")}}> here </a>once you have received notification of approval.</h4>
            </div>
        </div>
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak
    };
}, mapDispatchToProps)(NoOpDashboardPage));










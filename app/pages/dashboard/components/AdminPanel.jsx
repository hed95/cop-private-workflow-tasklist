import React from 'react'
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AppConstants from "../../../common/AppConstants";

class AdminPanel extends React.Component {

    admin(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.ADMIN_PATH,
            shiftPresent: this.props.hasActiveShift
        });
    }

    render() {
        const adminRole = this.props.kc.realmAccess && this.props.kc.realmAccess.roles
            ? this.props.kc.realmAccess.roles.find(role => role === 'platform_admin')
            : null;

        return adminRole ? <li className="__card govuk-grid-column-one-third" id="adminPanel">
            <a href="#" onClick={this.admin.bind(this)} className="card__body">
                <span className="govuk-!-font-size-36 govuk-!-font-weight-bold">admin</span>
            </a>
            <div className="card__footer">
                <span className="govuk-!-font-size-19">Admin operations</span>
            </div>
        </li> : <div/>
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak
    }
}, mapDispatchToProps)(AdminPanel))

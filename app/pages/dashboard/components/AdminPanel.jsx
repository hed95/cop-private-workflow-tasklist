import React from 'react'
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class AdminPanel extends React.Component {

    admin(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: "/admin"
        });
    }

    render() {
        const adminRole = this.props.kc.realmAccess && this.props.kc.realmAccess.roles
            ? this.props.kc.realmAccess.roles.find(role => role === 'platform_admin')
            : null;

        return adminRole ? <li className="__card column-one-third" id="adminPanel">
            <a href="#" onClick={this.admin.bind(this)} className="card__body">
                <span className="bold-large">admin</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Admin operations</span>
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
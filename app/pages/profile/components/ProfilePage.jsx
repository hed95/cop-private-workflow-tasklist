import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PersonalDetailsSection from "./PersonalDetailsSection";

class ProfilePage extends React.Component {
    render() {
        return <div>
            <PersonalDetailsSection {...this.props} />
        </div>
    }
}

export default connect((state) => {
    return {
        kc: state.keycloak
    }
}, {})(withRouter(ProfilePage))
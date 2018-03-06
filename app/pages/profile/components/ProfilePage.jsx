import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PersonalDetailsSection from "./PersonalDetailsSection";
import TeamDetailsSection from "./TeamDetailsSection";
import ShiftDetailsSection from "./ShiftDetailsSection";

class ProfilePage extends React.Component {
    render() {
        return <div className="grid-row">
            <div className="column-one-half">
                <PersonalDetailsSection {...this.props} />
            </div>
            <div className="column-one-half">
                <TeamDetailsSection {...this.props} />
                <ShiftDetailsSection {...this.props} />
            </div>

        </div>
    }
}

export default connect((state) => {
    return {
        kc: state.keycloak
    }
}, {})(withRouter(ProfilePage))
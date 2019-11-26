import React from "react";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../actions";
import {claimSuccessful} from "../selectors";

export class Claim extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.claimSuccessful) {
            this.props.history.push(`/task/${this.props.task.get('id')}`);
        }
    }


    render() {
        const {task, kc} = this.props;
        const userId = kc.tokenParsed.email;
        const taskAssignee = task.get('assignee');
        const displayButton = taskAssignee === null || (taskAssignee !== userId);
        return displayButton ? <button id="claimTask" className="govuk-button" type="submit"
                      onClick={() =>
                          this.props.claimTask(this.props.task.get('id'))} >Claim</button> : <div/>
    }

}

Claim.propTypes = {
    claimTask: PropTypes.func.isRequired,
    claimSuccessful: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        claimSuccessful: claimSuccessful(state)
    }
}, mapDispatchToProps)(Claim))

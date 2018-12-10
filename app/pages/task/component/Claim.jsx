import React from "react";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../actions";
import {claimSuccessful} from "../selectors";

class Claim extends React.Component {


    componentWillReceiveProps(nextProps) {
        if (nextProps.claimSuccessful) {
            this.props.history.push(`/task?taskId=${this.props.task.get('id')}`);
        }
    }

    render() {
        const {task, kc} = this.props;
        const userId = kc.tokenParsed.email;
        const taskAssignee = task.get('assignee');
        const displayButton = !taskAssignee || (taskAssignee !== userId);

        return displayButton ? <input className="btn btn-primary btn-md" type="submit"
                      onClick={() =>
                          this.props.claimTask(this.props.task.get('id'))}  value="Claim"/> : <div/>
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

import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../actions";
import {unclaimSuccessful} from "../selectors";

class Unclaim extends React.Component {

    componentDidMount() {
        this.unclaim = this.unclaim.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.unclaimSuccessful) {
            this.props.history.push("/tasks");
        }
    }

    unclaim() {
        this.props.unclaimTask(this.props.task.get('id'));
    }

    render() {
        const {task, kc} = this.props;
        const userId = kc.tokenParsed.email;
        const taskAssignee = task.get('assignee');
        const displayButton = taskAssignee && taskAssignee === userId;
        return displayButton ? <input className="btn btn-primary" onClick={() => this.unclaim()} type="submit" value="Unclaim"/> : <div/>;
    }

}

Unclaim.propTypes = {
    unclaimTask: PropTypes.func.isRequired,
    unclaimSuccessful: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        unclaimSuccessful: unclaimSuccessful(state)
    }
}, mapDispatchToProps)(Unclaim))
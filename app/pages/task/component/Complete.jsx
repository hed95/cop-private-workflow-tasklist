import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../actions";
import {completeSuccessful} from "../selectors";

class Complete extends React.Component {

    componentDidMount() {
        this.complete = this.complete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.completeSuccessful) {
            this.props.history.push("/tasks");
        }
    }

    complete() {
        this.props.completeTask(this.props.task.get('id'));
    }

    render() {
        const {task, kc} = this.props;
        const userId = kc.tokenParsed.email;
        const taskAssignee = task.get('assignee');
        const displayButton = taskAssignee && taskAssignee === userId;
        return displayButton ? <input className="btn btn-primary" onClick={() => this.complete()}
                   type="submit" value="Complete" disabled={!displayButton}/> : <div/>



    }

}

Complete.propTypes = {
    completeTask: PropTypes.func.isRequired,
    completeSuccessful: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        completeSuccessful: completeSuccessful(state)
    }
}, mapDispatchToProps)(Complete))
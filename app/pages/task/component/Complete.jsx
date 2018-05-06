import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../actions";
import {completeSuccessful} from "../selectors";
import Tooltip from '@cypress/react-tooltip'

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
        const formKey = task.get('formKey');
        const displayButton = taskAssignee && taskAssignee === userId && !formKey;
        return <div>
            <input className="btn btn-primary" onClick={() => this.complete()}
                   type="button" value="Complete" disabled={!displayButton}/>

        </div>

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
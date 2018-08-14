import React, {PropTypes} from 'react'
import {withRouter} from "react-router";
import {isFetchingTaskCounts, taskCounts} from "../selectors";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";


class TaskCountPanel extends React.Component {

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.props.fetchTaskCounts();
        } else {
            this.props.setDefaultCounts();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.hasActiveShift !== prevProps.hasActiveShift) {
            this.props.fetchTaskCounts();
        }
    }


    yourTasks() {
        this.props.history.replace({ pathname: '/your-tasks'})
    }

    yourTeamUnassignedTasks() {
        this.props.history.replace({ pathname: '/your-group-unassigned-tasks'})
    }

    yourTeamTotalTasks() {
        this.props.history.replace({ pathname: '/your-group-tasks'})
    }

    render() {
        const {taskCounts, isFetchingTaskCounts} = this.props;
        return <div>
            <li className="__card column-one-third">
                <a href="#" onClick={this.yourTasks.bind(this)} className="card__body">
                    <span
                        className="bold-xlarge">{isFetchingTaskCounts ? 0 : taskCounts.get('tasksAssignedToUser')}</span>
                    <span className="bold-small">tasks assigned to you</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Tasks assigned to you</span>
                </div>
            </li>
            <li className="__card column-one-third">
                <a href="#" onClick={this.yourTeamUnassignedTasks.bind(this)} className="card__body">
                    <span className="bold-xlarge">{isFetchingTaskCounts ? 0 : taskCounts.get('tasksUnassigned')}</span>
                    <span className="bold-small">unassigned tasks</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Your team unassigned tasks</span>
                </div>
            </li>
            <li className="__card column-one-third">
                <a href="#" onClick={this.yourTeamTotalTasks.bind(this)} className="card__body">
                    <span
                        className="bold-xlarge">{isFetchingTaskCounts ? 0 : taskCounts.get('totalTasksAllocatedToTeam')}</span>
                    <span className="bold-small">tasks allocated to your team</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Overall tasks assigned to your team</span>
                </div>
            </li>
        </div>
    }
}

TaskCountPanel.propTypes = {
    fetchTaskCounts: PropTypes.func.isRequired,
    setDefaultCounts: PropTypes.func.isRequired,
    taskCounts: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    taskCounts: taskCounts,
    isFetchingTaskCounts: isFetchingTaskCounts
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskCountPanel));
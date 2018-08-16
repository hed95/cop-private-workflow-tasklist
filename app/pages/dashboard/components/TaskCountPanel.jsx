import React, {PropTypes} from 'react'
import {withRouter} from "react-router";
import {isFetchingTaskCounts, taskCounts} from "../selectors";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";


class TaskCountPanel extends React.Component {
    componentWillMount() {
        this.yourTeamTotalTasks = this.yourTeamTotalTasks.bind(this);
        this.yourTasks = this.yourTasks.bind(this);
        this.yourTeamUnassignedTasks = this.yourTeamUnassignedTasks.bind(this);
    }

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.props.fetchTaskCounts();
        } else {
            this.props.setDefaultCounts();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hasActiveShift !== nextProps.hasActiveShift) {
            this.props.fetchTaskCounts();
        }
    }


    yourTasks(e) {
        e.preventDefault();
        this.props.history.replace({ pathname: '/your-tasks'})
    }

    yourTeamUnassignedTasks(e) {
        e.preventDefault();
        this.props.history.replace({ pathname: '/your-group-unassigned-tasks'})
    }

    yourTeamTotalTasks(e) {
        e.preventDefault();
        this.props.history.replace({ pathname: '/your-group-tasks'})
    }

    render() {
        const {taskCounts, isFetchingTaskCounts} = this.props;
        return <div>
            <li className="__card column-one-third" id="myTasksPanel">
                <a href="#" onClick={this.yourTasks} className="card__body">
                    <span
                        className="bold-xlarge">{isFetchingTaskCounts ? 0 : taskCounts.get('tasksAssignedToUser')}</span>
                    <span className="bold-small">tasks assigned to you</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Tasks assigned to you</span>
                </div>
            </li>
            <li className="__card column-one-third" id="unassignedTasksPanel">
                <a href="#" onClick={this.yourTeamUnassignedTasks} className="card__body">
                    <span className="bold-xlarge">{isFetchingTaskCounts ? 0 : taskCounts.get('tasksUnassigned')}</span>
                    <span className="bold-small">unassigned tasks</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Your team unassigned tasks</span>
                </div>
            </li>
            <li className="__card column-one-third" id="myTeamTasks">
                <a href="#" onClick={this.yourTeamTotalTasks} className="card__body">
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
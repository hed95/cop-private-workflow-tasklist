import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { isFetchingTaskCounts, taskCounts } from '../selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AppConstants from '../../../common/AppConstants';
import PubSub from 'pubsub-js';
import withLog from '../../../core/error/component/withLog';

export class TaskCountPanel extends React.Component {

    constructor(props) {
        super(props);
        this.yourTeamTotalTasks = this.yourTeamTotalTasks.bind(this);
        this.yourTasks = this.yourTasks.bind(this);
    }

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.subToken = PubSub.subscribe('refreshCount', (msg, data) => {
                const path = this.props.history.location.pathname;
                const user = this.props.kc.tokenParsed.email;
                this.props.log([{
                    level: 'info',
                    user: user,
                    path: path,
                    message: 'refreshing task count',
                    data
                }]);
                this.props.fetchTaskCounts();
            });
            this.props.fetchTaskCounts();
        } else {
            this.props.setDefaultCounts();
        }
    }

    componentWillUnmount() {
        if (this.subToken) {
            PubSub.unsubscribe(this.subToken);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if (!this.props.isFetchingTaskCounts) {
           const path = this.props.history.location.pathname;
           const user = this.props.kc.tokenParsed.email;
           const taskCounts = this.props.taskCounts.toJSON();
           this.props.log([{
               level: 'info',
               user: user,
               path: path,
               message: 'task count loaded',
               taskCounts
           }]);
       }
    }

    yourTasks(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.YOUR_TASKS_PATH,
            state: {shiftPresent: this.props.hasActiveShift}
        })
    }

    yourTeamTotalTasks(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.YOUR_GROUP_TASKS_PATH,
            state: {shiftPresent: this.props.hasActiveShift}
        })
    }

    render() {
        const {taskCounts, isFetchingTaskCounts} = this.props;
        return <div>
            <li className="__card column-one-third" id="yourTasksPanel">
                <a href="#" onClick={this.yourTasks} className="card__body" id="yourTasksPageLink">
                    {isFetchingTaskCounts ? <span
                      className="bold-small">Loading</span> :<span
                      className="bold-xlarge">{taskCounts.get('tasksAssignedToUser')}</span>
                    }
                    <span className="bold-small">tasks assigned to you</span>
                </a>
                <div className="card__footer">
                    <span className="font-small">Tasks assigned to you</span>
                </div>
            </li>
            <li className="__card column-one-third" id="youTeamTasks">
                <a href="#" onClick={this.yourTeamTotalTasks} className="card__body" id="yourTeamTasksPageLink">

                    {
                        isFetchingTaskCounts ? <span
                          className="bold-small">Loading</span>: <span
                          className="bold-xlarge">{taskCounts.get('totalTasksAllocatedToTeam')}</span>
                    }
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
    log: PropTypes.func,
    fetchTaskCounts: PropTypes.func.isRequired,
    setDefaultCounts: PropTypes.func.isRequired,
    taskCounts: ImmutablePropTypes.map
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect((state) => {
    return {
        taskCounts: taskCounts(state),
        isFetchingTaskCounts: isFetchingTaskCounts(state),
        kc: state.keycloak
    }
}, mapDispatchToProps)(withRouter(withLog(TaskCountPanel)));

import React from "react";
import PropTypes from 'prop-types';
import StandardTaskSummaryPage from "./StandardTaskSummaryPage";
import {candidateGroups, isFetchingTask, task, variables} from "../selectors";
import * as actions from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import ImmutablePropTypes from "react-immutable-proptypes";
import queryString from 'query-string';
import {withRouter} from "react-router";
import {DataSpinner} from "../../../core/components/DataSpinner";
import TaskDetailsPage from "./TaskDetailsPage";
import NotFound from "../../../core/components/NotFound";


class TaskPage extends React.Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.taskId = params.taskId;
        this.props.fetchTask(this.taskId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskId !== this.props.taskId) {
            this.props.fetchTask(nextProps.taskId);
        }
    }

    componentWillUnmount() {
        this.props.clearTask();
    }

    render() {
        const {task, isFetchingTask} = this.props;
        if (isFetchingTask) {
            return <DataSpinner message="Fetching task information"/>
        } else {
            if (task.isEmpty()) {
               return <NotFound resource="Task" id={this.taskId}/>
            }
            return task.get('assignee')? <TaskDetailsPage {...this.props} /> : <StandardTaskSummaryPage {...this.props}/>
        }

    }
}

TaskPage.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    clearTask: PropTypes.func.isRequired,
    isFetchingTask: PropTypes.bool,
    task: ImmutablePropTypes.map
};


const mapStateToProps = createStructuredSelector({
    isFetchingTask: isFetchingTask,
    task: task,
    candidateGroups: candidateGroups,
    variables: variables
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskPage));

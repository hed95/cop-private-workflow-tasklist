import React, {PropTypes} from 'react';
import ImmutablePropTypes from "react-immutable-proptypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import {unassignedTasks} from "../selectors";
import moment from "moment";
import {priority} from "../../../core/util/priority";
import {withRouter} from "react-router";
import {DataSpinner} from "../../../core/components/DataSpinner";

class YourGroupUnassignedTasks extends React.Component {

    componentDidMount() {
        this.props.fetchUnassignedTasks("/api/workflow/tasks?unassignedOnly=true");
        this.goToTask = this.goToTask.bind(this);
    }

    goToTask(taskId) {
        this.props.history.replace(`/task?taskId=${taskId}`);
    }

    render() {
        const {unassignedTasks} = this.props;
        const pointerStyle = {cursor: 'pointer'};
        if (unassignedTasks.get('isFetchingUnassignedTasks')) {
            return <DataSpinner message="Fetching your group unassigned tasks"/>
        } else {
            return <div style={{paddingTop: '20px'}}>

                <div className="data">
                <span
                    className="data-item bold-medium">{unassignedTasks.get('total')} unassigned {unassignedTasks.get('total') === 1 ? 'task' : 'tasks'}</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Task name</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Due</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        unassignedTasks.get('tasks').map((taskData) => {
                            const task = taskData.get('task');
                            return <tr style={pointerStyle} onClick={() => this.goToTask(task.get('id'))}
                                       key={task.get('id')}>
                                <td>{task.get('name')}</td>
                                <td>{priority(task.get('priority'))}</td>
                                <td>{moment().to(moment(task.get('due')))}</td>
                            </tr>
                        })
                    }

                    </tbody>
                </table>
            </div>
        }
    }
}

YourGroupUnassignedTasks.propTypes = {
    fetchUnassignedTasks: PropTypes.func.isRequired,
    unassignedTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    unassignedTasks: unassignedTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupUnassignedTasks));

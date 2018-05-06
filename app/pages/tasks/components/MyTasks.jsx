import React, {PropTypes} from 'react';
import ImmutablePropTypes from "react-immutable-proptypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import {myTasks} from "../selectors";
import {priority} from "../../../core/util/priority";
import moment from "moment/moment";
import {withRouter} from "react-router";

class MyTasks extends React.Component {

    componentDidMount() {
        this.props.fetchTasksAssignedToMe("/api/workflow/tasks");
    }
    goToTask(taskId) {
        this.props.history.replace(`/task?taskId=${taskId}`);
    }


    render() {
        const {myTasks} = this.props;
        const pointerStyle = {cursor: 'pointer'};

        return <div>
            <div className="data">
                <span className="data-item bold-xlarge">{myTasks.get('total')}</span>
                <span className="data-item bold-small">Group Tasks</span>
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
                    myTasks.get('tasks').map((taskData) => {
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

MyTasks.propTypes = {
    fetchTasksAssignedToMe: PropTypes.func.isRequired,
    myTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    myTasks: myTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyTasks));

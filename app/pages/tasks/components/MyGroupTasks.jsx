import React, {PropTypes} from 'react';
import ImmutablePropTypes from "react-immutable-proptypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import {myGroupTasks} from "../selectors";
import moment from "moment";
import {priority} from "../../../core/util/priority";
import {withRouter} from "react-router";

class MyGroupTasks extends React.Component {

    componentDidMount() {
        this.props.fetchMyGroupTasks("/api/workflow/tasks");
        this.goToTask = this.goToTask.bind(this);
    }

    goToTask(taskId) {
        this.props.history.replace(`/task?taskId=${taskId}`);
    }

    render() {
        const {myGroupTasks} = this.props;
        const pointerStyle = {cursor: 'pointer'};
        return <div>

            <div className="data">
                <span className="data-item bold-xlarge">{myGroupTasks.get('total')}</span>
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
                    myGroupTasks.get('tasks').map((taskData) => {
                        const task = taskData.get('task');
                        return <tr style={pointerStyle} onClick={() => this.goToTask(task.get('id'))} key={task.get('id')}>
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

MyGroupTasks.propTypes = {
    fetchMyGroupTasks: PropTypes.func.isRequired,
    myGroupTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    myGroupTasks: myGroupTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyGroupTasks));

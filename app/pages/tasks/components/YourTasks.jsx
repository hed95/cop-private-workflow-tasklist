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
import {DataSpinner} from "../../../core/components/DataSpinner";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class YourTasks extends React.Component {

    componentDidMount() {
        this.props.fetchTasksAssignedToMe("/api/workflow/tasks?assignedToMeOnly=true");
    }

    goToTask(taskId) {
        this.props.history.replace(`/task?taskId=${taskId}`);
    }


    render() {
        const {myTasks} = this.props;
        const pointerStyle = {cursor: 'pointer'};
        if (myTasks.get('isFetchingTasksAssignedToMe')) {
            return <DataSpinner message="Fetching tasks assigned to you"/>
        } else {
            return <div style={{paddingTop: '20px'}}>
                <div className="data">
                    <span className="data-item bold-medium">{myTasks.get('total')} tasks assigned to you</span>
                </div>
                <Table>
                    <Thead>
                    <Tr>
                        <Th scope="col">Task name</Th>
                        <th scope="col">Priority</th>
                        <th scope="col">Due</th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        myTasks.get('tasks').map((taskData) => {
                            const task = taskData.get('task');
                            return <Tr style={pointerStyle} onClick={() => this.goToTask(task.get('id'))}
                                       key={task.get('id')}>
                                <Td>{task.get('name')}</Td>
                                <Td>{priority(task.get('priority'))}</Td>
                                <Td>{moment().to(moment(task.get('due')))}</Td>
                            </Tr>
                        })
                    }

                    </Tbody>
                </Table>
            </div>
        }
    }
}

YourTasks.propTypes = {
    fetchTasksAssignedToMe: PropTypes.func.isRequired,
    myTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    myTasks: myTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourTasks));

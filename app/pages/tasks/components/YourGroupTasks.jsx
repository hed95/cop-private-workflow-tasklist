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
import {DataSpinner} from "../../../core/components/DataSpinner";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class YourGroupTasks extends React.Component {

    componentDidMount() {
        this.props.fetchMyGroupTasks("/api/workflow/tasks?teamOnly=true&sort=created,desc");
        this.goToTask = this.goToTask.bind(this);
    }

    goToTask(taskId) {
        this.props.history.replace(`/task?taskId=${taskId}`);
    }

    render() {
        const {myGroupTasks} = this.props;
        const pointerStyle = {cursor: 'pointer'};

        if (myGroupTasks.get('isFetchingMyGroupTasks')) {
            return <DataSpinner message="Fetching your group tasks"/>
        } else {
            return <div style={{paddingTop: '20px'}}>

                <div className="data">
                <span
                    className="data-item bold-medium">{myGroupTasks.get('total')} {myGroupTasks.get('total') === 1 ? 'task' : 'tasks'} allocated to your team</span>
                </div>
                <Table>
                    <Thead>
                    <Tr>
                        <Th scope="col">Task name</Th>
                        <Th scope="col">Priority</Th>
                        <Th scope="col">Created</Th>
                        <Th scope="col">Due</Th>
                        <Th scope="col">Assignee</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        myGroupTasks.get('tasks').map((taskData) => {
                            const task = taskData.get('task');
                            return <Tr style={pointerStyle} onClick={() => this.goToTask(task.get('id'))}
                                       key={task.get('id')}>
                                <Td>{task.get('name')}</Td>
                                <Td>{priority(task.get('priority'))}</Td>
                                <Td>{moment().to(moment(task.get('created')))}</Td>
                                <Td>{moment().to(moment(task.get('due')))}</Td>
                                <Td>{task.get('assignee') ? task.get('assignee') : 'Unassigned'}</Td>
                            </Tr>
                        })
                    }

                    </Tbody>
                </Table>
            </div>
        }


    }
}

YourGroupTasks.propTypes = {
    fetchMyGroupTasks: PropTypes.func.isRequired,
    myGroupTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    myGroupTasks: myGroupTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupTasks));

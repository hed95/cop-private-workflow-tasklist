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
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


class YourGroupUnassignedTasks extends React.Component {

    componentDidMount() {
        this.props.fetchUnassignedTasks("/api/workflow/tasks?unassignedOnly=true&sort=created,desc");
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
                <Table>
                    <Thead>
                    <Tr>
                        <Th scope="col">Task name</Th>
                        <Th scope="col">Priority</Th>
                        <Th scope="col">Created</Th>
                        <Th scope="col">Due</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        unassignedTasks.get('tasks').map((taskData) => {
                            const task = taskData.get('task');
                            return <Tr style={pointerStyle} onClick={() => this.goToTask(task.get('id'))}
                                       key={task.get('id')}>
                                <Td>{task.get('name')}</Td>
                                <Td>{priority(task.get('priority'))}</Td>
                                <Td>{moment().to(moment(task.get('created')))}</Td>
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

YourGroupUnassignedTasks.propTypes = {
    fetchUnassignedTasks: PropTypes.func.isRequired,
    unassignedTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    unassignedTasks: unassignedTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupUnassignedTasks));

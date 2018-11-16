import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import { myGroupTasks } from '../selectors';
import moment from 'moment';
import { priority } from '../../../core/util/priority';
import { withRouter } from 'react-router';
import { DataSpinner } from '../../../core/components/DataSpinner';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';

class YourGroupTasks extends React.Component {

  componentDidMount() {
    this.props.fetchMyGroupTasks('/api/workflow/tasks?teamOnly=true&sort=created,desc');
    this.goToTask = this.goToTask.bind(this);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  render() {
    const { myGroupTasks } = this.props;
    const pointerStyle = { cursor: 'pointer' };

    if (myGroupTasks.get('isFetchingMyGroupTasks')) {
      return <DataSpinner message="Fetching your group tasks" />;
    }
    const data = myGroupTasks ? myGroupTasks.get('tasks').map((taskData) => {
      const task = taskData.get('task');
      const taskId = task.get('id');
      const taskNameLink = <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{task.get('name')}</div>;
      const priorityLink = <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{priority(task.get('priority'))}</div>;
      const createdOnLink = <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{ moment().to(moment(task.get('created')))}</div>;
      const dueOnLink = <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{ moment().to(moment(task.get('due')))}</div>;
      const assigneeLink =  <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{task.get('assignee') ? task.get('assignee') : 'Unassigned'}</div>;
      return {
        id: taskId,
        name: taskNameLink,
        priority: priorityLink,
        createdOn: createdOnLink,
        due: dueOnLink,
        assignee: assigneeLink ,
      };
    }).toArray() : [];

    const headers = {
      name: 'Task name',
      priority: 'Priority',
      createdOn: 'Created',
      due: 'Due',
      assignee: 'Assignee'
    };
    return (<div style={{ paddingTop: '20px' }}>
      <div className="data">
        <span
          className="data-item bold-medium"
        >{myGroupTasks.get('total')} {myGroupTasks.get('total') === 1 ? 'task' : 'tasks'} allocated to your team</span>
      </div>
      <ReactHyperResponsiveTable
        headers={headers}
        rows={data}
        keyGetter={row => row.id}
        breakpoint={578}
        tableStyling={({ narrow }) => (narrow ? 'narrowtable' : 'widetable')}
      />
    </div>);
  }
}

YourGroupTasks.propTypes = {
  fetchMyGroupTasks: PropTypes.func.isRequired,
  myGroupTasks: ImmutablePropTypes.map,
};

const mapStateToProps = createStructuredSelector({
  myGroupTasks,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupTasks));

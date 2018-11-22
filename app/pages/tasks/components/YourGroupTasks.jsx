import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import { yourGroupTasks } from '../selectors';
import moment from 'moment';
import { priority } from '../../../core/util/priority';
import { withRouter } from 'react-router';
import { DataSpinner } from '../../../core/components/DataSpinner';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';

class YourGroupTasks extends React.Component {

  componentDidMount() {
    this.props.fetchYourGroupTasks('/api/workflow/tasks?teamOnly=true&sort=created,desc');
    this.goToTask = this.goToTask.bind(this);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  render() {
    const { yourGroupTasks } = this.props;
    const pointerStyle = { cursor: 'pointer' };

    if (yourGroupTasks.get('isFetchingYourGroupTasks')) {
      return <DataSpinner message="Fetching your group tasks" />;
    }
    const data = yourGroupTasks ? yourGroupTasks.get('tasks').map((taskData) => {
      const task = taskData.get('task');
      const taskId = task.get('id');

      const linkElem = (prop) => {
        return <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{prop}</div>;
      };
      const taskNameLink = linkElem(task.get('name'));
      const priorityLink = linkElem(priority(task.get('priority')));
      const createdOnLink = linkElem(moment().to(moment(task.get('created'))));
      const dueOnLink = linkElem(moment().to(moment(task.get('due'))));
      const assigneeLink =  linkElem(task.get('assignee') ? task.get('assignee') : 'Unassigned');

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
    const filterTasksByName = (value) => {
      this.props.filterYourGroupTasksByName(value);
    };
    return (<div style={{ paddingTop: '20px' }}>
      <div className="data">
        <span
          className="data-item bold-medium"
        >{yourGroupTasks.get('total')} {yourGroupTasks.get('total') === 1 ? 'task' : 'tasks'} allocated to your team</span>
      </div>

      <div className="row">
        <div className="column-one-half">
          <div className="form-group">
            <label className="form-label" htmlFor="sortTask">Sort tasks by:</label>
            <select className="form-control" id="sortTask" name="sortTask"
                    onChange={(event) => {
                      const optionSelected = event.target.value;
                      this.props.setYourGroupTasksSortValue(optionSelected);
                      this.props.fetchYourGroupTasks(`/api/workflow/tasks?teamOnly=true&${optionSelected}`);
                    }
                    }
                    value={yourGroupTasks.get('sortValue')}>
              <option value="sort=due,desc">Latest due date</option>
              <option value="sort=due,asc">Oldest due date</option>
              <option value="sort=created,desc">Latest created date</option>
              <option value="sort=created,asc">Oldest created date</option>
              <option value="sort=priority,desc">Highest priority</option>
              <option value="sort=priority,asc">Lowest priority</option>
            </select>
          </div>
        </div>

        <div className="column-one-half">
          <div className="form-group">
            <label className="form-label" htmlFor="filterTaskName">Filter by task name or assignee:</label>
            <input className="form-control" id="filterTaskName" type="text" name="filterTaskName"
                   onChange={(event) => filterTasksByName(event.target.value)}/>
          </div>
        </div>
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
  fetchYourGroupTasks: PropTypes.func.isRequired,
  yourGroupTasks: ImmutablePropTypes.map,
  filterYourGroupTasksByName: PropTypes.func.isRequired,
  setYourGroupTasksSortValue: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  yourGroupTasks,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupTasks));

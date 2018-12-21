import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { yourTasks } from '../selectors';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { priority } from '../../../core/util/priority';
import moment from 'moment/moment';
import { withRouter } from 'react-router';
import { DataSpinner } from '../../../core/components/DataSpinner';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import AppConstants from "../../../common/AppConstants";
import {debounce, throttle} from 'throttle-debounce';

export class YourTasks extends React.Component {

  componentDidMount() {
    this.loadYourTasks(false, 'sort=due,desc');
    const that = this;
    this.timeoutId = setInterval(() => {
      const {yourTasks} = that.props;
      this.loadYourTasks(true, yourTasks.get('yourTasksSortValue'), yourTasks.get('yourTasksFilterValue'))
    }, AppConstants.THREE_MINUTES);
  }

  loadYourTasks(skipLoading, yourTasksSortValue, yourTasksFilterValue = null) {
    this.props.fetchTasksAssignedToYou(yourTasksSortValue, yourTasksFilterValue, skipLoading);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { yourTasks } = this.props;
    const pointerStyle = { cursor: 'pointer' };
    if (yourTasks.get('isFetchingTasksAssignedToYou')) {
      return <DataSpinner message="Fetching tasks assigned to you"/>;
    } else {
      const data = yourTasks ? yourTasks.get('tasks')
        .map((taskData) => {
          const task = taskData.get('task');
          const taskId = task.get('id');
          const linkElem = (prop) => {
            return <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{prop}</div>;
          };
          return {
            id: taskId,
            name: linkElem(task.get('name')),
            priority: linkElem(priority(task.get('priority'))),
            due: linkElem(moment().to(moment(task.get('due')))),
            createdOn: linkElem(moment().to(moment(task.get('created'))))
          };
        })
        .toArray() : [];
      const headers = {
        name: 'Task name',
        priority: 'Priority',
        due: 'Due',
        createdOn: 'Created'
      };


      const debounceSearch = (sortValue, filterValue) => {
        if (filterValue.length <= 2 || filterValue.endsWith(' ')) {
          throttle(200, () => {
            this.props.fetchTasksAssignedToYou(sortValue, filterValue, true);
          })();
        } else {
          debounce(500, () => {
            this.props.fetchTasksAssignedToYou(sortValue, filterValue, true);
          })();
        }

      };
      const filterTasksByName = (event) => {
        event.persist();
        const { yourTasks } = this.props;
        const yourTasksFilterValue = event.target.value;
        const yourTasksSortValue = yourTasks.get('yourTasksSortValue');
        debounceSearch(yourTasksSortValue, yourTasksFilterValue);
      };
      return <div style={{ paddingTop: '20px' }}>
        <div className="data" id="yourTasksTotalCount">
          <span
            className="data-item bold-medium">{yourTasks.get('total')} {yourTasks.get('total') === 1 ? 'task' : 'tasks'} assigned to you</span>
        </div>
        <div className="grid-row">
          <div className="column-one-half">
            <div className="form-group">
              <label className="form-label" htmlFor="sortTask">Sort tasks by:</label>
              <select className="form-control" id="sortTask" name="sortTask"
                      onChange={(event) => {
                        const yourTasksSortValue = event.target.value;
                        this.props.fetchTasksAssignedToYou(yourTasksSortValue,
                          yourTasks.get('yourTasksFilterValue'), true);
                      }}
                      value={yourTasks.get('yourTasksSortValue')}>
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
              <label className="form-label" htmlFor="filterTaskName">Search by task name:</label>
              <input className="form-control" id="filterTaskName" type="text" name="filterTaskName"
                     onChange={filterTasksByName}
                     defaultValue={yourTasks.get('yourTasksFilterValue')}/>
            </div>
          </div>
        </div>

        <ReactHyperResponsiveTable
          headers={headers}
          rows={data}
          keyGetter={row => row.id}
          breakpoint={578}
          tableStyling={({ narrow }) => (narrow ? 'narrowtable-yourtasks' : 'widetable')}
        />
      </div>;
    }
  }
}

YourTasks.propTypes = {
  fetchTasksAssignedToYou: PropTypes.func.isRequired,
  yourTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
  yourTasks: yourTasks,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourTasks));

import React from 'react';
import PropTypes from 'prop-types';
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
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';


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

          const data = unassignedTasks ? unassignedTasks.get('tasks').map((taskData) => {
            const task = taskData.get('task');
            const taskId = task.get('id');

            const linkElem = (prop) => {
              return <div style={pointerStyle} onClick={() => this.goToTask(taskId)}>{prop}</div>;
            };
            const taskNameLink = linkElem(task.get('name'));
            const priorityLink = linkElem(priority(task.get('priority')));
            const createdOnLink = linkElem(moment().to(moment(task.get('created'))));
            const dueOnLink = linkElem(moment().to(moment(task.get('due'))));

            return {
              id: taskId,
              name: taskNameLink,
              priority: priorityLink,
              createdOn: createdOnLink,
              due: dueOnLink,
            };
          }).toArray() : [];

          const headers = {
            name: 'Task name',
            priority: 'Priority',
            createdOn: 'Created',
            due: 'Due',
          };

          const filterTasksByName = (value) => {
            this.props.filterUnassignedTasksByName(value);
          };

          return (<div style={{ paddingTop: '20px' }}>
            <div className="data">
        <span
          className="data-item bold-medium">{unassignedTasks.get('total')} unassigned {unassignedTasks.get('total') === 1 ? 'task' : 'tasks'}</span>
          </div>
            <div className="grid-row">
              <div className="column-one-half">
                <div className="form-group">
                  <label className="form-label" htmlFor="sortTask">Sort tasks by:</label>
                  <select className="form-control" id="sortTask" name="sortTask"
                          onChange={(event) => {
                            const optionSelected = event.target.value;
                            this.props.setUnassignedTasksSortValue(optionSelected);
                            this.props.fetchUnassignedTasks(`/api/workflow/tasks?unassignedOnly=true&${optionSelected}`);
                            }
                          }
                          value={unassignedTasks.get('sortValue')}>
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
                  <label className="form-label" htmlFor="filterTaskName">Filter by task name:</label>
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
              tableStyling={({ narrow }) => (narrow ? 'narrowtable-your-group-unassignedtasks' : 'widetable')}
            />
          </div>);
        }
    }
}

YourGroupUnassignedTasks.propTypes = {
    fetchUnassignedTasks: PropTypes.func.isRequired,
    unassignedTasks: ImmutablePropTypes.map,
    filterUnassignedTasksByName: PropTypes.func.isRequired,
    setUnassignedTasksSortValue: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    unassignedTasks: unassignedTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupUnassignedTasks));

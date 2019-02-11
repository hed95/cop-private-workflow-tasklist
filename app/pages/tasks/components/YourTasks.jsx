import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import React from 'react';
import moment from 'moment';
import SortTasks from './SortTasks';
import FilterTaskName from './FilterTaskName';
import * as types from 'react-device-detect';
import _ from 'lodash';

const YourTasks = ({ yourTasks, sortYourTasks, filterTasksByName, goToTask, startAProcedure }) => {
  const underlinedStyle = { cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline' };

  const groupedTasks = yourTasks && yourTasks.get('tasks') ?_.groupBy(yourTasks.get('tasks').toJS(), (data) => {
    const groupKey = data['process-definition'] ? data['process-definition']['category']
        : 'Other';
    return groupKey;
  }): [];
  const sortByKeys = object => {
    const keys = Object.keys(object);
    const initialSort = _.sortBy(keys);
    const sortedKeys = _.sortBy(initialSort, (key) =>  {
      return key === 'Other'? 1: 0;
    });
    return _.fromPairs(
      _.map(sortedKeys, key => [key, object[key]])
    )
  };
  console.log(JSON.stringify(sortByKeys(groupedTasks)));
  const headers = types.isMobile ? {
    name: null,
    action: null
  } : {
    name: null,
    due: null,
    action: null
  };

  const dataToDisplay = _.map(groupedTasks, (value, key) => {
    const data = _.map(value, (val) => {
      const task = val.task;
      const actionButton = <input id="actionButton" className="btn btn-primary" onClick={() => goToTask(task.taskId)} type="submit"
                            value="Action"/>;
      const name = task.name;
      const taskId = task.id;
      return types.isMobile ? {
        id: taskId,
        name: name,
        action: actionButtonl
      } : {
        id: taskId,
        name: name,
        due: "due " + moment().to(moment(task.due)),
        action: actionButton
      }
    });
    return <div id={`category::${key}`} className="tasksGrouping">
        <div className="data-item bold-small" id={key}>{key} ({value.length} {value.length === 1 ? 'task' : 'tasks'})</div>
        <ReactHyperResponsiveTable
        headers={headers}
        rows={data}
        keyGetter={row => row.id}
        breakpoint={578}
        tableStyling={({ narrow }) => (narrow ? 'narrowtable-yourtasks' : 'widetable')}
        />
    </div>
  });
  return <div>
    <div style={underlinedStyle} onClick={startAProcedure}>Start a procedure</div>
    <div style={{ paddingTop: '20px' }}>
      <div className="data" id="yourTasksTotalCount">
          <span
            className="data-item bold-medium">{yourTasks.get('total')} {yourTasks.get('total') === 1 ? 'task' : 'tasks'} assigned to you</span>
      </div>
      <div className="grid-row">
        <div className="column-one-half">
          <SortTasks tasks={yourTasks} sortTasks={sortYourTasks}/>
        </div>

        <div className="column-one-half">
          <FilterTaskName tasks={yourTasks} filterTasksByName={filterTasksByName}/>
        </div>
      </div>
      {dataToDisplay}

    </div>
  </div>;
};

export default YourTasks;

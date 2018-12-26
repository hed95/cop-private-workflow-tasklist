import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import React from 'react';
import { priority } from '../../../core/util/priority';
import moment from 'moment';
import SortTasks from './SortTasks';
import FilterTaskName from './FilterTaskName';

const YourTasks = ({ yourTasks, sortYourTasks, filterTasksByName, goToTask}) => {
  const pointerStyle = { cursor: 'pointer' };

  const data = yourTasks ? yourTasks.get('tasks')
    .map((taskData) => {
      const task = taskData.get('task');
      const taskId = task.get('id');
      const linkElem = (prop) => {
        return <div id="link" style={pointerStyle}
                    onClick={() => goToTask(taskId)}>{prop}</div>;
      };
      return {
        id: taskId,
        name: linkElem(task.get('name')),
        priority: linkElem(priority(task.get('priority'))),
        due: linkElem(moment().to(moment(task.get('due')))),
        createdOn: linkElem(moment().to(moment(task.get('created'))))
      };
    }).toArray() : [];

  const headers = {
    name: 'Task name',
    priority: 'Priority',
    due: 'Due',
    createdOn: 'Created'
  };

  return <div style={{ paddingTop: '20px' }}>
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

    <ReactHyperResponsiveTable
      headers={headers}
      rows={data}
      keyGetter={row => row.id}
      breakpoint={578}
      tableStyling={({ narrow }) => (narrow ? 'narrowtable-yourtasks' : 'widetable')}
    />
  </div>;
};

export default YourTasks;

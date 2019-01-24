import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import React from 'react';
import FilterTaskName from './FilterTaskName';
import SortTasks from './SortTasks';
import { priority } from '../../../core/util/priority';
import moment from 'moment';

const YourGroupUnassignedTasks = ({ unassignedTasks, sortTasks, filterTasksByName, goToTask, startAProcedure }) => {
  const pointerStyle = { cursor: 'pointer' };
  const underlinedStyle = { cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline' };

  const data = unassignedTasks ? unassignedTasks.get('tasks')
    .map((taskData) => {
      const task = taskData.get('task');
      const taskId = task.get('id');

      const linkElem = (prop) => {
        return <div id="link" style={pointerStyle} onClick={() => goToTask(taskId)}>{prop}</div>;
      };
      const taskNameLink = linkElem(task.get('name'));
      const priorityLink = linkElem(priority(task.get('priority')));
      const createdOnLink = linkElem(moment()
        .to(moment(task.get('created'))));
      const dueOnLink = linkElem(moment()
        .to(moment(task.get('due'))));

      return {
        id: taskId,
        name: taskNameLink,
        priority: priorityLink,
        createdOn: createdOnLink,
        due: dueOnLink,
      };
    })
    .toArray() : [];

  const headers = {
    name: 'Task name',
    priority: 'Priority',
    createdOn: 'Created',
    due: 'Due',
  };

  return <div>
    <div style={underlinedStyle} onClick={startAProcedure}>Start a procedure</div>

    <div style={{ paddingTop: '20px' }}>
      <div className="data" id="unassignedTasksTotalCount">
        <span
          className="data-item bold-medium">{unassignedTasks.get('total')} unassigned {unassignedTasks.get('total') === 1 ? 'task' : 'tasks'}</span>
      </div>
      <div className="grid-row">
        <div className="column-one-half">
          <SortTasks tasks={unassignedTasks} sortTasks={sortTasks}/>
        </div>

        <div className="column-one-half">
          <FilterTaskName filterTasksByName={filterTasksByName} tasks={unassignedTasks}/>
        </div>
      </div>

      <ReactHyperResponsiveTable
        headers={headers}
        rows={data}
        keyGetter={row => row.id}
        breakpoint={578}
        tableStyling={({ narrow }) => (narrow ? 'narrowtable-your-group-unassignedtasks' : 'widetable')}
      />
    </div>
  </div>;
};

export default YourGroupUnassignedTasks;

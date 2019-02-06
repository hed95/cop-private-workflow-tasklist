import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import React from 'react';
import { priority } from '../../../core/util/priority';
import moment from 'moment';
import SortTasks from './SortTasks';
import FilterTaskName from './FilterTaskName';

const YourGroupTasks = ({ yourGroupTasks, filterTasksByName, sortYourGroupTasks, goToTask, startAProcedure }) => {
  const pointerStyle = { cursor: 'pointer' };
  const underlinedStyle = { cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline' };

  const data = yourGroupTasks ? yourGroupTasks.get('tasks')
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
      const assigneeLink = linkElem(task.get('assignee') ? task.get('assignee') : 'Unassigned');

      return {
        id: taskId,
        name: taskNameLink,
        priority: priorityLink,
        createdOn: createdOnLink,
        due: dueOnLink,
        assignee: assigneeLink,
      };
    })
    .toArray() : [];

  const headers = {
    name: 'Task name',
    priority: 'Priority',
    createdOn: 'Created',
    due: 'Due',
    assignee: 'Assignee'
  };

  return <div>
    <div style={underlinedStyle} onClick={startAProcedure}>Start a procedure</div>
    <div style={{ paddingTop: '20px' }}>

      <div className="data" id="yourGroupTasksTotalCount">
        <span
          className="data-item bold-medium"
        >{yourGroupTasks.get('total')} {yourGroupTasks.get('total') === 1 ? 'task' : 'tasks'} allocated to your team</span>
      </div>

      <div className="grid-row">
        <div className="column-one-half">
          <SortTasks sortTasks={sortYourGroupTasks} tasks={yourGroupTasks}/>
        </div>

        <div className="column-one-half">
          <FilterTaskName filterTasksByName={filterTasksByName} tasks={yourGroupTasks}/>
        </div>
      </div>

      <ReactHyperResponsiveTable
        headers={headers}
        rows={data}
        keyGetter={row => row.id}
        breakpoint={578}
        tableStyling={({ narrow }) => (narrow ? 'narrowtable' : 'widetable')}
      />
    </div>
  </div>;
};

export default YourGroupTasks;

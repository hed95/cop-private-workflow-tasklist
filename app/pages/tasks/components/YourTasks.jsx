import * as types from 'react-device-detect';
import _ from 'lodash';
import React from 'react';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import moment from 'moment';

// local imports
import "./YourTasks.scss";
import FilterTaskName from './FilterTaskName';
import SortTasks from './SortTasks';

const YourTasks = ({ yourTasks, sortYourTasks, filterTasksByName, goToTask, startAProcedure }) => {
  const groupedTasks = yourTasks && yourTasks.get('tasks') ? _.groupBy(yourTasks.get('tasks').toJS(), (data) => {
    const groupKey = data['process-definition'] ? data['process-definition']['category'] : 'Other';
    return groupKey;
  }): [];

  const sortByKeys = object => {
    const keys = Object.keys(object);
    const initialSort = _.sortBy(keys);
    const sortedKeys = _.sortBy(initialSort, (key) => key === 'Other' ? 1 : 0);
    return _.fromPairs(_.map(sortedKeys, key => [key, object[key]]));
  };
  const sortedData = sortByKeys(groupedTasks);

  const headers = types.isMobile ? {
    name: null,
    action: null
  } : {
    name: null,
    due: null,
    action: null
  };

  const dataToDisplay = _.map(sortedData, (value, key) => {
    const data = _.map(value, (val) => {
      const task = val.task;
      const actionButton = <button id="actionButton" className="govuk-button" onClick={() => goToTask(task.id)} type="submit">Action</button>;
      const name = task.name;
      const taskId = task.id;

      // datetime format
      const utcDateTime = moment.utc(task.due).format();
      const localDateTime = moment(utcDateTime).local().format();
      const dueDateTime = moment().to(localDateTime);

      // mobile phone users
      if (types.isMobile) {
        return { id: taskId, action: actionButton, name };
      }
      // desktop users
      return {
        id: taskId,
        name: <div className="govuk-!-font-size-19">{name}</div>,
        due: <div className="govuk-!-font-size-19">{`due ${dueDateTime}`}</div>,
        action: actionButton
      }
    });
    return (
      <div key={`category::${key}`} className="tasksGrouping">
        <div
          style={{paddingBottom: '5px'}}
          className="data-item govuk-!-font-size-19 govuk-!-font-weight-bold"
          key={key}>{key} ({value.length} {value.length === 1 ? 'task' : 'tasks'})
        </div>
        <ReactHyperResponsiveTable
          key={`category::${key}`}
          headers={headers}
          rows={data}
          keyGetter={row => row.id}
          breakpoint={578}
          tableStyling={({ narrow }) => (narrow ? 'narrowtable-yourtasks' : 'widetable-yourtasks')} />
      </div>
    );
  });
  return <div>
    <a href="#" className="govuk-link govuk-!-font-size-19" style={{textDecoration:'underline'}} onClick={startAProcedure}>Submit a form</a>
    <div style={{ paddingTop: '10px' }}>
      <div className="data" id="yourTasksTotalCount">
          <span
            className="data-item govuk-!-font-size-24 govuk-!-font-weight-bold">{yourTasks.get('total')} {yourTasks.get('total') === 1 ? 'task' : 'tasks'} assigned to you</span>
      </div>
      <div className="govuk-grid-row" style={{paddingTop: '10px'}}>
        <div className="govuk-grid-column-one-half">
          <SortTasks tasks={yourTasks} sortTasks={sortYourTasks}/>
        </div>

        <div className="govuk-grid-column-one-half">
          <FilterTaskName tasks={yourTasks} filterTasksByName={filterTasksByName}/>
        </div>
      </div>
      {dataToDisplay}

    </div>
  </div>;
};

export default YourTasks;

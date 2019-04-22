import React from 'react';

const SortTasks = ({tasks, sortTasks}) => {
  return <div className="govuk-form-group">
    <label className="govuk-label" htmlFor="sortTask">Sort tasks by:</label>
    <select className="govuk-select" id="sortTask" name="sortTask"
            onChange={sortTasks}
            value={tasks.get('sortValue')}>
      <option value="sort=due,desc">Latest due date</option>
      <option value="sort=due,asc">Oldest due date</option>
      <option value="sort=created,desc">Latest created date</option>
      <option value="sort=created,asc">Oldest created date</option>
      <option value="sort=priority,desc">Highest priority</option>
      <option value="sort=priority,asc">Lowest priority</option>
    </select>
  </div>
};

export default SortTasks;

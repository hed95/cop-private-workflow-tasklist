import React from 'react';

const FilterTaskName = ({tasks, filterTasksByName}) => {
  return  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor="filterTaskName">Search by task name:</label>
    <input className="govuk-input govuk-!-width-two-thirds" id="filterTaskName" type="text" name="filterTaskName"
           onChange={filterTasksByName}
           defaultValue={tasks.get('yourTasksFilterValue')}/>
  </div>
};

export default FilterTaskName;

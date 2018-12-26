import React from 'react';

const FilterTaskName = ({tasks, filterTasksByName}) => {
  return  <div className="form-group">
    <label className="form-label" htmlFor="filterTaskName">Search by task name:</label>
    <input className="form-control" id="filterTaskName" type="text" name="filterTaskName"
           onChange={filterTasksByName}
           defaultValue={tasks.get('yourTasksFilterValue')}/>
  </div>
};

export default FilterTaskName;

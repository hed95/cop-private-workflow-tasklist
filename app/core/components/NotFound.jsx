import React from 'react';

const NotFound = ({ resource, id }) => {
  return <div>
    {resource} with identifier {id} was not found
  </div>;
};

export default NotFound;

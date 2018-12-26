import React from 'react';
import Spinner from 'react-spinkit';

const DataSpinner = ({ message }) => {
  return <div id="dataSpinner">
    <div className="loader-content">
      <Spinner
        name="line-spin-fade-loader" color="black"/>
    </div>
    <div className="loader-message"><strong className="bold">
      {message}
    </strong></div>
  </div>;
};

export default DataSpinner;

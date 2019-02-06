import React from 'react';

const UnauthorizedPage = () => {
    return <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1">
      <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1" id="unauthorizedText">
        You are not authorized to access the platform
      </h2>
      <p>Please contact operational support to get access</p>

    </div>
};

export default UnauthorizedPage;

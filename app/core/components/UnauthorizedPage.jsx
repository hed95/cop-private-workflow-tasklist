import React from 'react';

export default class UnauthorizedPage extends React.Component {

  render() {
    return <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1">
      <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
        You are not authorized to access the platform
      </h2>
      <p>Please contact operational support to get access</p>

    </div>
  }
}


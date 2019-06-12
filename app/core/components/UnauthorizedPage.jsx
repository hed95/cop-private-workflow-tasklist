import React from 'react';

const UnauthorizedPage = () => (
  <div style={{ marginTop: '20px' }} className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="error-summary">
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      You are not authorized to access the platform
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        <li>
          <p className="govuk-body">
            To get access, please raise a request via <a className="govuk-link" href="https://lssiprod.service-now.com/ess?id=sc_cat_item&sys_id=e452ca8e4f83eb480900e1128110c730.">IT Now</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
);

export default UnauthorizedPage;

import PubSub from 'pubsub-js';
import React from 'react';
import uuid from 'uuid';

class FormErrorPanel extends React.Component {

  render() {
    return this.props.errors && this.props.errors.length !== 0 ? <div className="container">
        <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1"
             data-module="govuk-error-summary">
          <h2 className="govuk-error-summary__title" id="error-summary-title">
            There is a problem with your form
          </h2>
          <div className="govuk-error-summary__body">
            <ul className="govuk-list govuk-error-summary__list">
              {this.props.errors.map(({message,instance}) => {
                return <li key={uuid()}>
                  <a href="" onClick={(e) => {
                    e.preventDefault();
                    instance.focus();
                  }}>{message}</a>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
      : null;
  }
}

export default FormErrorPanel;

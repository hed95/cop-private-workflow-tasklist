import React from "react";

const uuidv4 = require('uuid/v4');

export default class ErrorPanel extends React.Component {

    render() {
        const {hasError, errors} = this.props;
        if (!errors) {
            return null;
        }
        const items = [];
        const buildMessageFrom = (err) => {
            if (!err.get('url')) {
                return <li key={uuidv4()}>{err.get('message')}</li>
            }
            return <li key={uuidv4()}>{err.get('url')} - [{err.get('status')} {err.get('error')}]
                - {err.get('message')}</li>
        };
        errors.forEach((err) => {
            items.push(buildMessageFrom(err));
        });
        if (hasError) {
            return <div className="govuk-error-summary" role="alert" aria-labelledby="error-summary-title"
                        tabIndex="-1">
                <h2 className="govuk-error-summary__title" id="error-summary-title">
                    We are experiencing technical problems
                </h2>
                <h4 className="govuk-heading-s">The technical issue has been logged for support to investigate.</h4>
                <details className="govuk-details">
                    <summary className="govuk-details__summary">
                        <span className="govuk-details__summary-text">
                         Error details
                        </span>
                    </summary>
                    <div className="govuk-details__text">
                        <div className="govuk-error-summary__body">
                            <ul className="govuk-list govuk-list--bullet govuk-error-summary__list">
                                {items}
                            </ul>
                        </div>
                    </div>
                </details>
            </div>
        } else {
            return null;
        }
    }
}




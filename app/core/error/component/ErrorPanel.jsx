import React from "react";

const uuidv4 = require('uuid/v4');

export default class ErrorPanel extends React.Component {

    render() {
        const {hasError, errors} = this.props;
        const items = [];

        errors.forEach((err) => {
            items.push(<li key={uuidv4()}>{err.get('url')} - [{err.get('status')} {err.get('error')}]
                - {err.get('message')}</li>);
        });
        if (hasError) {
            return <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1"
                 tabIndex="-1">
                <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                    We are experiencing technical problems
                </h2>
                <ul className="error-summary-list">
                    {items}
                </ul>

            </div>
        } else {
            return <div/>
        }
    }
}




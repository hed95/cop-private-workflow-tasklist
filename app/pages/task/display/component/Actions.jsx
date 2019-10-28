import React from "react";
import Claim from "./Claim";
import Unclaim from "./Unclaim";
import Complete from "./Complete";

const uuidv4 = require('uuid/v4');

export default class Actions extends React.Component {


    render() {
        const {variables, task} = this.props;
        if (variables && variables['enabledActions']) {
            const enabledActions = JSON.parse(variables['enabledActions']);
            const actions = enabledActions.map((a) => {
                if (a === 'unclaim') {
                    return <Unclaim key={uuidv4()} task={task}/>;
                }
                if (a === 'claim') {
                    return <Claim key={uuidv4()} task={task}/>;
                }
                if (a === 'complete') {
                    return <Complete key={uuidv4()} task={task}/>;
                }
                return <div/>
            });
            return <div style={{paddingTop: '50px'}}>
                <div className="btn-group btn-block" role="group">
                    {actions}
                </div>
                {actions && actions.length >= 1 && !task.get('name').includes('declaration') ?
                    <details className="govuk-details">
                        <summary className="govuk-details__summary">
                            <span className="govuk-details__summary-text">
                             Help with actions
                            </span>
                        </summary>
                        <div className="govuk-details__text">
                            <ul className="govuk-list govuk-list--bullet">
                                <li>Claim: The task will be assigned to you</li>
                                <li>Unclaim: The task will be available for other members in your team to action
                                </li>
                                <li>Complete: Finish work</li>
                            </ul>
                        </div>
                    </details> : <div/>}
            </div>
        } else {
            return <div/>
        }
    }
}

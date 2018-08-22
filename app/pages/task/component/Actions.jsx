import React from "react";
import Claim from "./Claim";
import Unclaim from "./Unclaim";
import Complete from "./Complete";

const uuidv4 = require('uuid/v4');

export default class Actions extends React.Component {


    render() {
        const {variables, task} = this.props;
        if (variables) {
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
                {actions && actions.length >= 1 ?
                    <div className="gov-panel" style={{paddingTop: '10px'}}>
                        <details>
                            <summary><span className="summary">Help with actions</span></summary>
                            <div className="panel panel-border-wide">
                                <ul className="list list-bullet">
                                    <li>Claim: The task will be assigned to you</li>
                                    <li>Unclaim: The task will be available for other members in your team to action
                                    </li>
                                    <li>Complete: Finish work</li>
                                </ul>
                            </div>
                        </details>
                    </div> : <div/>}
            </div>
        } else {
            return <div/>
        }
    }
}

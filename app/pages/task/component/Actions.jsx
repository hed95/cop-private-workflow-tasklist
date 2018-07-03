import React from "react";
import Claim from "./Claim";
import Unclaim from "./Unclaim";
import Complete from "./Complete";

export default class Actions extends React.Component {

    buildActions() {
        const uuidv4 = require('uuid/v4');

        const {task, variables} = this.props;
        if (variables && variables['enabledActions']) {
            const enabledActions = variables['enabledActions'];
            const actions = [];
            if (enabledActions.indexOf('unclaim') >= 1) {
                actions.push(<Claim key={uuidv4()} task={task}/>)
            }
            if (enabledActions.indexOf('claim') >= 1) {
                actions.push(<Unclaim key={uuidv4()} task={task} />)
            }
            if (enabledActions.indexOf('complete') >=1 ){
                actions.push(<Complete key={uuidv4()} task={task}/>)
            }
            return <div>{actions}</div>
        } else {
            return <div />
        }
    }





    render() {
       return <div style={{paddingTop: '20px'}}>

            <div className="btn-group btn-block" role="group">
                {this.buildActions()}
            </div>
            <div className="gov-panel" style={{paddingTop: '20px'}}>
                <details>
                    <summary><span className="summary">Help with actions</span></summary>
                    <div className="panel panel-border-wide">
                        <ul className="list list-bullet">
                            <li>Claim: The task will be assigned to you</li>
                            <li>Unclaim: The task will be available for other members in your team to action</li>
                            <li>Complete: Finish work</li>
                        </ul>
                    </div>
                </details>
            </div>
        </div>
    }
}

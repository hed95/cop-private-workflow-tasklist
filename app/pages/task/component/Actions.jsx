import React from "react";
import Claim from "./Claim";
import Unclaim from "./Unclaim";
import Complete from "./Complete";

export default class Actions extends React.Component {

    render() {
        const {task} = this.props;

        return <div style={{paddingTop: '20px'}}>

            <div className="btn-group btn-block" role="group">
                <Claim task={task}/>
                <Unclaim task={task} />
                <Complete task={task}/>
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

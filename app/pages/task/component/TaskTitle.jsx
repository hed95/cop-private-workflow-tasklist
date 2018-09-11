import React from 'react';
import moment from "moment";
import {priority} from "../../../core/util/priority";

export default class TaskTitle extends React.Component {

    render() {
        const {task, candidateGroups} = this.props;
        const taskPriority = priority(task.get('priority'));
        return <div className="grid-row">
            <div className="column-full">
                <h1 className="heading-medium" style={{width: '100%'}}>
                    {task.get('name')} <span className="heading-secondary">
                    <div className="grid-row">
                        <div className="column-one-quarter text-secondary font-medium">{!task.get('assignee')
                            ? <div>Unassigned</div> : (task.get('assignee') !== this.props.kc.tokenParsed.email ? task.get('assignee') : "Assigned to you")}</div>
                    <div className="column-one-quarter text-secondary font-medium">Due: {moment().to(moment(task.get('due')))}</div>
                    <div className="column-one-quarter text-secondary font-medium">Priority: {taskPriority}</div>
                    <div className="column-one-quarter text-secondary font-medium">Team: { candidateGroups.toJS().toString()}</div>
                </div>
                </span>
                </h1>
            </div>
        </div>
    }
}

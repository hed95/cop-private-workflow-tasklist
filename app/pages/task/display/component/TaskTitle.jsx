import React from 'react';
import moment from "moment";
import {priority} from "../../../../core/util/priority";

export default class TaskTitle extends React.Component {

    render() {
        const {task, candidateGroups} = this.props;
        const taskPriority = priority(task.get('priority'));

        return <div>
            <div className="grid-row">
                <div className="column-full" id="taskName">
                    <h1 className="heading-medium" style={{width: '100%'}}>
                        {task.get('name')}
                    </h1>
                </div>
            </div>
            <div className="grid-row">
                <div
                    className="column-one-third text-secondary font-small" id="taskDueDate">Due: {moment().to(moment(task.get('due')))}</div>
                <div className="column-one-third text-secondary font-small" id="taskPriority">Priority: {taskPriority}</div>
                <div
                    className="column-one-third text-secondary font-small" id="taskTeams">Team: {candidateGroups.toJS().toString()}</div>
            </div>
            <div className="grid-row">
                <div className="column-full text-secondary font-small" id="taskAssignee">
                    {!task.get('assignee') ?
                        <div>Unassigned</div> : (task.get('assignee') !== this.props.kc.tokenParsed.email ? `Assigned to ${task.get('assignee')}` : "Assigned to you")}
                </div>
            </div>
        </div>
    }
}

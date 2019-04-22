import React from 'react';
import moment from "moment";
import {priority} from "../../../../core/util/priority";

export default class TaskTitle extends React.Component {

    render() {
        const {task, candidateGroups} = this.props;
        const taskPriority = priority(task.get('priority'));

        return <div>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-full" id="taskName">
                    <h1 className="govuk-heading-m" style={{width: '100%'}}>
                        {task.get('name')}
                    </h1>
                </div>
            </div>
            <div className="govuk-grid-row">
                <div
                    className="govuk-grid-column-one-third" id="taskDueDate">
                    <span className="govuk-caption-m govuk-!-font-size-19">Due</span>
                    <h4 className="govuk-heading-m govuk-!-font-size-19">{moment().to(moment(task.get('due')))}</h4>
                </div>
                <div
                    className="govuk-grid-column-one-third" id="taskPriority">
                    <span className="govuk-caption-m govuk-!-font-size-19">Priority</span>
                    <h4 className="govuk-heading-m govuk-!-font-size-19">{taskPriority}</h4>
                </div>
                <div
                    className="govuk-grid-column-one-third" id="taskTeam">
                    <span className="govuk-caption-m govuk-!-font-size-19">Team</span>
                    <h4 className="govuk-heading-m govuk-!-font-size-19">{candidateGroups.toJS().toString()}</h4>
                </div>
            </div>
            <div className="govuk-grid-row">

                <div
                    className="govuk-grid-column-one-third" id="taskAssignee">
                    <span className="govuk-caption-m govuk-!-font-size-19">Assignee</span>
                    <h4 className="govuk-heading-m govuk-!-font-size-19">
                        {!task.get('assignee') ?
                            'Unassigned': (task.get('assignee') !== this.props.kc.tokenParsed.email ? `${task.get('assignee')}` : "You are the current assignee")}
                    </h4>
                </div>
            </div>
        </div>
    }
}

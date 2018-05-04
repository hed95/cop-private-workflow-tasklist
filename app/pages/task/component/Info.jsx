import React from "react";
import Actions from './Actions';
import moment from "moment/moment";
import {priority} from "../../../core/util/priority";

class Info extends React.Component {

    render() {
        const {task, candidateGroups, variables} = this.props;
        return <div>
            <div className="app-dl">
                <dl className="dl-horizontal">
                    <dt>Name</dt>
                    <dd>{task.get('name')}</dd>
                    <dt>Description</dt>
                    <dd><p>{task.get('description')}</p></dd>
                    <dt>Due</dt>
                    <dd>{moment().to(moment(task.get('due')))}</dd>
                    <dt>Priority</dt>
                    <dd>{priority(task.get('priority'))}</dd>
                    <dt>Assigned To</dt>
                    <dd>{task.get('assignee') ? task.get('assignee') : 'Unassigned'}</dd>
                    <dt>Team</dt>
                    {candidateGroups.map((command) => {
                        return <dd>{command}</dd>
                    })}
                    <dt>Supporting Information</dt>
                    <dt>

                    </dt>
                </dl>
            </div>
            <Actions task={task}/>
        </div>


    }
}

export default Info;
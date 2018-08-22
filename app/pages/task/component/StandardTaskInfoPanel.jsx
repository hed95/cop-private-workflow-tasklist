import React from "react";
import Actions from './Actions';
import moment from "moment/moment";
import {priority} from "../../../core/util/priority";
const uuidv4 = require('uuid/v4');

class StandardTaskInfoPanel extends React.Component {

    render() {
        const {task, candidateGroups, variables} = this.props;
        return <div>
            <div className="app-dl">
                <dl className="dl-horizontal">
                    <dt>Name</dt>
                    <dd key={uuidv4()}>{task.get('name')}</dd>
                    <dt>Description</dt>
                    <dd key={uuidv4()}><p>{task.get('description')}</p></dd>
                    <dt>Due</dt>
                    <dd>{moment().to(moment(task.get('due')))}</dd>
                    <dt>Priority</dt>
                    <dd key={uuidv4()}>{priority(task.get('priority'))}</dd>
                    <dt>Assigned To</dt>
                    <dd key={uuidv4()}>{task.get('assignee') ? task.get('assignee') : 'Unassigned'}</dd>
                    <dt>Team</dt>
                    {candidateGroups.map((command) => {
                        return <dd key={uuidv4()}>{command}</dd>
                    })}
                    <dt>Supporting Information</dt>
                    <dt>
                    </dt>
                </dl>
            </div>

            <Actions task={task} variables={variables}/>
        </div>


    }
}

export default StandardTaskInfoPanel;
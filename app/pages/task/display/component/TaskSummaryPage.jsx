import React from "react";
import Actions from './Actions';
import TaskTitle from "./TaskTitle";
import Comments from "./Comments";

const TaskSummaryPage = props => {

        const {task, variables} = this.props;
        return <div>
            <TaskTitle {...this.props} />
            <div className="govuk-grid-row">
                <div className="govuk-column-two-thirds" style={{paddingTop: '10px'}}>
                    <p>{task.get('description')}</p>
                    <Actions task={task} variables={variables}/>
                </div>
            </div>


        </div>
}

export default TaskSummaryPage;

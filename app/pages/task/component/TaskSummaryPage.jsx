import React from "react";
import Actions from './Actions';
import TaskTitle from "./TaskTitle";
import Comments from "./Comments";


class TaskSummaryPage extends React.Component {

    render() {
        const {task, variables} = this.props;
        return <div>
            <TaskTitle {...this.props} />
            <div className="grid-row">
                <div className="column-two-thirds" style={{paddingTop: '10px'}}>
                    <p>{task.get('description')}</p>
                    <Actions task={task} variables={variables}/>
                </div>
                <div className="column-one-third" style={{paddingTop: '10px'}}>
                    <Comments taskId={task.get("id")}/>
                </div>
            </div>


        </div>
    }
}

export default TaskSummaryPage;

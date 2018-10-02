import React from 'react';
import Actions from "./Actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import TaskTitle from "./TaskTitle";
import Comments from "./Comments";
import TaskForm from "../../../core/task-form/components/TaskForm";

class TaskDetailsPage extends React.Component {
    render() {
        const {task,variables} = this.props;
        const hasFormKey = task && task.get('formKey');
        return <div>
            <TaskTitle {...this.props} />
            <div className="grid-row">
                <div className="column-two-thirds" style={{paddingTop: '10px'}}>
                    <p>{task.get('description')}</p>
                    {hasFormKey ? <TaskForm task={task} variables={variables}/> : <Actions task={task} variables={variables}/>}

                </div>
                <div className="column-one-third" style={{paddingTop: '10px'}}>
                    <Comments taskId={task.get("id")}/>
                </div>
            </div>


        </div>
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak
    }
}, mapDispatchToProps)(TaskDetailsPage))
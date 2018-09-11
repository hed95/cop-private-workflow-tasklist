import React from "react";
import Actions from './Actions';
import moment from "moment/moment";
import {priority} from "../../../core/util/priority";
import TaskTitle from "./TaskTitle";
import {DataSpinner} from "../../../core/components/DataSpinner";


class StandardTaskSummaryPage extends React.Component {

    render() {
        const {task, variables} = this.props;
        return <div style={{'paddingTop': '5px'}}>
            <TaskTitle {...this.props} />
            <p className="lede">{task.get('description')}</p>
            <Actions task={task} variables={variables}/>
        </div>
    }
}

export default StandardTaskSummaryPage;
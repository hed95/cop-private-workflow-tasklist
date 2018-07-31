import React, {PropTypes} from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Comments from "./Comments";
import StandardTaskInfoPanel from "./StandardTaskInfoPanel";
import {
    candidateGroups,
    isFetchingTask, task, variables
} from "../selectors";
import * as actions from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import ImmutablePropTypes from "react-immutable-proptypes";
import queryString from 'query-string';
import Attachments from "./Attachments";
import Audit from "./Audit";
import TaskForm from "../../../core/task-form/components/TaskForm";
const uuidv4 = require('uuid/v4');


class TaskDetailsPage extends React.Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.taskId = params.taskId;
        this.props.fetchTask(this.taskId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskId !== this.props.taskId) {
            this.props.fetchTask(nextProps.taskId);
        }
    }

    componentWillUnmount() {
        this.props.clearTask();
    }

    render() {
        const {task, variables, isFetchingTask} = this.props;
        const hasFormKey = task && task.get('formKey');
        if (isFetchingTask) {
            return <div>Loading task information</div>
        } else {
            return <div>
                <h3 className="heading-medium">{task.get('name')}</h3>
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        {hasFormKey ? <Tab>Form</Tab> : null}
                        <Tab>Comments</Tab>
                        <Tab>Attachments</Tab>
                        <Tab>Audit</Tab>
                    </TabList>
                    <div style={{paddingTop: '10px'}}>
                        <TabPanel key={uuidv4()}>
                            <StandardTaskInfoPanel {...this.props} />
                        </TabPanel>
                        {hasFormKey ? <TabPanel key={uuidv4()}>
                            <fieldset>
                                <TaskForm task={task} variables={variables}/>
                            </fieldset>
                        </TabPanel> : null}
                        <TabPanel key={uuidv4()}>
                            <Comments taskId={this.taskId}/>
                        </TabPanel>
                        <TabPanel key={uuidv4()}>
                            <Attachments taskId={this.taskId} />
                        </TabPanel>
                        <TabPanel key={uuidv4()}>
                            <Audit taskId={this.taskId} />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        }

    }
}

TaskDetailsPage.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    isFetchingTask: PropTypes.bool,
    task: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    isFetchingTask: isFetchingTask,
    task: task,
    candidateGroups: candidateGroups,
    variables: variables
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsPage);

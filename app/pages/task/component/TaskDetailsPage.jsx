import React, {PropTypes} from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Comments from "./Comments";
import Info from "./Info";
import Form from "./Form";
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

    render() {
        const {task} = this.props;

        const hasFormKey = task && task.get('formKey');
        return <div>
            <h3 className="heading-medium">{task.get('name')}</h3>
            <Tabs>
                <TabList>
                    <Tab>Details</Tab>
                    {hasFormKey ? <Tab>Form</Tab> : null}
                    <Tab>Comments</Tab>
                    <Tab>Attachments</Tab>
                </TabList>
                <div style={{paddingTop: '10px'}}>
                    <TabPanel key={uuidv4()}>
                        <Info {...this.props} />
                    </TabPanel>
                    {hasFormKey ? <TabPanel key={uuidv4()}>
                        <Form task={task}/>
                    </TabPanel> : null}
                    <TabPanel key={uuidv4()}>
                        <Comments taskId={this.taskId}/>
                    </TabPanel>
                    <TabPanel key={uuidv4()}>
                        <Attachments taskId={this.taskId} />
                    </TabPanel>
                </div>
            </Tabs>
        </div>
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

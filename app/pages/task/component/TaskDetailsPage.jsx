import React, {PropTypes} from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Comments from "./Comments";
import Info from "./Info";
import Form from "./Form";
import {
    isFetchingTask, task
} from "../selectors";
import * as actions from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import ImmutablePropTypes from "react-immutable-proptypes";
import queryString from 'query-string';


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
        return <div>
            <h3 className="heading-medium">{task.get('name')}</h3>
            <Tabs>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Form</Tab>
                    <Tab>Comments</Tab>
                </TabList>
                <div style={{paddingTop: '10px'}}>
                    <TabPanel>
                        <Info task={task}/>
                    </TabPanel>
                    <TabPanel>
                        <Form/>
                    </TabPanel>
                    <TabPanel>
                        <Comments taskId={this.taskId}/>
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
    task: task
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsPage);

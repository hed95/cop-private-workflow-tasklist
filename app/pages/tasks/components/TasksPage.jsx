import React, {PropTypes} from 'react'
import MyTasks from "./MyTasks";
import MyGroupTasks from "./MyGroupTasks";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UnassignedTasks from "./UnassignedTasks";
import {withRouter} from "react-router";
import {isFetchingTaskCounts, tabIndex, taskCounts} from "../selectors";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";

class TasksPage extends React.Component {

    componentDidMount() {
        this.props.fetchTaskCounts();
    }

    render() {
        const pointerStyle = {cursor: 'pointer'};


        const {taskCounts, isFetchingTaskCounts, tabIndex} = this.props;

        return <div>
            {!isFetchingTaskCounts ? <div className="grid-row">
                <div className="column-one-third">
                    <div className="data">
                        <a style={pointerStyle} onClick={() => this.props.setTabIndex(0)}>
                            <span className="data-item bold-xlarge">{taskCounts.get('tasksAssignedToUser')}</span>
                        </a>
                        <span className="data-item bold-small">Assigned to me</span>
                    </div>

                </div>

                <div className="column-one-third">
                    <div className="data">
                        <a style={pointerStyle} onClick={() => this.props.setTabIndex(1)}>
                            <span className="data-item bold-xlarge">{taskCounts.get('tasksUnassigned')}</span>
                        </a>
                        <span className="data-item bold-small">Unassigned</span>
                    </div>
                </div>
                <div className="column-one-third">
                    <div className="data">
                        <a  style={pointerStyle} onClick={() => this.props.setTabIndex(2)}>
                            <span className="data-item bold-xlarge">{taskCounts.get('totalTasksAllocatedToTeam')}</span>
                        </a>
                        <span className="data-item bold-small">Allocated to team</span>
                    </div>
                </div>

            </div> : <div>Loading task counts...</div> }

            <Tabs selectedIndex={tabIndex} onSelect={tabIndex => this.props.setTabIndex(tabIndex)}>
                <TabList>
                    <Tab>Tasks assigned to me</Tab>
                    <Tab>Unassigned tasks</Tab>
                    <Tab>Tasks allocated to team</Tab>

                </TabList>

                <div style={{paddingTop: '10px'}}>
                    <TabPanel>
                        <MyTasks/>
                    </TabPanel>
                    <TabPanel>
                        <UnassignedTasks/>
                    </TabPanel>
                    <TabPanel>
                        <MyGroupTasks/>
                    </TabPanel>

                </div>
            </Tabs>
        </div>
    }
}

TasksPage.propTypes = {
    fetchTaskCounts: PropTypes.func.isRequired,
    setTabIndex: PropTypes.func.isRequired,
    taskCounts: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    taskCounts: taskCounts,
    isFetchingTaskCounts: isFetchingTaskCounts,
    tabIndex: tabIndex
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TasksPage));

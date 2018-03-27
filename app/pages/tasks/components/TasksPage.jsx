import React from 'react'
import MyTasks from "./MyTasks";
import MyGroupTasks from "./MyGroupTasks";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class TasksPage extends React.Component {
    render() {
        return <div>
            <Tabs>
                <TabList>
                    <Tab>My Tasks</Tab>
                    <Tab>My Group Tasks</Tab>
                </TabList>

                <TabPanel>
                    <MyTasks/>
                </TabPanel>
                <TabPanel>
                    <MyGroupTasks/>
                </TabPanel>
            </Tabs>
        </div>
    }
}

export default TasksPage;
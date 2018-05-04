import React from 'react'
import MyTasks from "./MyTasks";
import MyGroupTasks from "./MyGroupTasks";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class TasksPage extends React.Component {
    render() {
        return <div>
            <Tabs>
                <TabList>
                    <Tab>My Group Tasks</Tab>
                    <Tab>My Tasks</Tab>
                </TabList>

                <div style={{paddingTop: '10px'}}>
                    <TabPanel>
                        <MyGroupTasks/>
                    </TabPanel>
                    <TabPanel>
                        <MyTasks/>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    }
}

export default TasksPage;
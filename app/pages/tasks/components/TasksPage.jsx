import React from 'react'
import MyTasks from "./MyTasks";
import MyGroupTasks from "./MyGroupTasks";


class TasksPage extends React.Component {
    render() {
        return <div>
            <div className="grid-row">
                <div className="column-full">
                   <MyTasks />
                </div>
                <div className="column-full">
                   <MyGroupTasks />
                </div>
            </div>
        </div>
    }
}

export default TasksPage;
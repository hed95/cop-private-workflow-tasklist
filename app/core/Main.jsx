import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from './../pages/processes/components/ProcessesPage'
import TaskPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import NotificationsPage from './../pages/notifications/components/NotificationsPage'
import ProfilePage from "../pages/profile/components/ProfilePage";


const Main = () => (
    <main>
            <Switch>
                <Route name="Profile" exact path="/" component={ProfilePage}/>
                <Route name="Tasks" exact path='/tasks' component={TaskPage}/>
                <Route name="Processes" exact path='/processes' component={ProcessesPage}/>
                <Route name="Reports" exact path='/reports' component={ReportsPage}/>
                <Route name="Notifications" exact path='/notifications' component={NotificationsPage}/>
                <Redirect to="/"/>
            </Switch>
    </main>
);

export default Main
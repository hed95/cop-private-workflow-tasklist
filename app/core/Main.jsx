import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from './../pages/processes/components/ProcessesPage'
import TaskPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import NotificationsPage from './../pages/notifications/components/NotificationsPage'
import ProfilePage from "../pages/profile/components/ProfilePage";
import SessionScopedRoute from "./session/components/SessionScopedRoute";

const Main = () => (
    <main>
            <Switch>
                <Route name="Profile" exact path="/profile" render={() => (
                    <ProfilePage />
                )}/>
                <SessionScopedRoute name="Tasks" exact path='/tasks' component={TaskPage} />
                <SessionScopedRoute name="Processes" exact path='/processes' component={ProcessesPage}/>
                <SessionScopedRoute name="Reports" exact path='/reports' component={ReportsPage}/>
                <SessionScopedRoute name="Notifications" exact path='/notifications' component={NotificationsPage}/>
                <Redirect to="/profile"/>
            </Switch>
    </main>
);

export default Main
import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from './../pages/processes/components/ProcessesPage'
import TasksPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import NotificationsPage from './../pages/notifications/components/NotificationsPage'
import ProfilePage from "../pages/profile/components/ProfilePage";
import AdminPage from "../pages/admin/components/AdminPage";
import SessionScopedRoute from "./session/components/SessionScopedRoute";
import CampaignsPage from "../pages/campaigns/components/CampaignsPage";
import ProcessStartPage from "../pages/processes/components/ProcessStartPage";
import TaskDetailsPage from "../pages/task/component/TaskDetailsPage";

const Main = () => (
    <main>
            <Switch>
                <Route name="Profile" exact path="/profile" render={() => (
                    <ProfilePage />
                )}/>
                <SessionScopedRoute name="Tasks" exact path='/tasks' component={TasksPage} />
                <SessionScopedRoute name="Processes" exact path='/processes' component={ProcessesPage}/>
                <SessionScopedRoute name="Reports" exact path='/reports' component={ReportsPage}/>
                <SessionScopedRoute name="Notifications" exact path='/notifications' component={NotificationsPage}/>
                <SessionScopedRoute name="Campaigns" exact path='/campaigns' component={CampaignsPage}/>
                <SessionScopedRoute name="Process Start Page" exact path="/process-start" component={ProcessStartPage}/>
                <SessionScopedRoute name="Task Details Page" exact path="/task" component={TaskDetailsPage}/>

                <Route name="Admin" exact path="/admin" component={AdminPage}/>
                <Redirect to="/profile"/>
            </Switch>
    </main>
);

export default Main
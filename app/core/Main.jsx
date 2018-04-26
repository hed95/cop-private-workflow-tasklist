import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from './../pages/processes/components/ProcessesPage'
import TaskPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import NotificationsPage from './../pages/notifications/components/NotificationsPage'
import ProfilePage from "../pages/profile/components/ProfilePage";
import AdminPage from "../pages/admin/components/AdminPage";
import SessionScopedRoute from "./session/components/SessionScopedRoute";
import CampaignsPage from "../pages/campaigns/components/CampaignsPage";
import ProcessStartPage from "../pages/processes/components/ProcessStartPage";

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
                <SessionScopedRoute name="Campaigns" exact path='/campaigns' component={CampaignsPage}/>
                <SessionScopedRoute name="Process Start Page" exact path="/process-start" component={ProcessStartPage}/>
                <Route name="Admin" exact path="/admin" component={AdminPage}/>
                <Redirect to="/profile"/>
            </Switch>
    </main>
);

export default Main
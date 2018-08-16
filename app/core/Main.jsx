import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from '../pages/procedures/components/ProceduresPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import MessagesPage from '../pages/messages/components/MessagesPage'
import ShiftPage from "../pages/shift/components/ShiftPage";
import AdminPage from "../pages/admin/components/AdminPage";
import ShiftScopedRoute from "../pages/shift/components/ShiftScopedRoute";
import CalendarPage from "../pages/calendar/components/CalendarPage";
import ProcessStartPage from "../pages/procedures/components/ProcedureStartPage";
import TaskDetailsPage from "../pages/task/component/TaskDetailsPage";
import ReportPage from "../pages/reports/components/ReportPage";
import DashboardPage from "../pages/dashboard/components/DashboardPage";
import YourTasks from "../pages/tasks/components/YourTasks";
import YourGroupUnassignedTasks from "../pages/tasks/components/YourGroupUnassignedTasks";
import YourGroupTasks from "../pages/tasks/components/YourGroupTasks";


const Main = () => (
    <main>
        <Switch>
            <Route name="Dashboard" exact path="/dashboard" component={DashboardPage}/>
            <Route name="Shift" exact path="/shift" component={ShiftPage}/>

            <ShiftScopedRoute name="Your tasks" exact path='/your-tasks' component={YourTasks}/>
            <ShiftScopedRoute name="Your group unassigned tasks" exact path='/your-group-unassigned-tasks' component={YourGroupUnassignedTasks}/>
            <ShiftScopedRoute name="Your group tasks" exact path='/your-group-tasks' component={YourGroupTasks}/>
            <ShiftScopedRoute name="Procedures" exact path='/procedures' component={ProcessesPage}/>
            <ShiftScopedRoute name="Reports" exact path='/reports' component={ReportsPage} />
            <ShiftScopedRoute exact path="/report" component={ReportPage}/>
            <ShiftScopedRoute name="Messages" exact path='/messages' component={MessagesPage}/>
            <ShiftScopedRoute name="Calendar" exact path='/calendar' component={CalendarPage}/>
            <ShiftScopedRoute name="Procedure Start Page" exact path="/procedure-start" component={ProcessStartPage}/>
            <ShiftScopedRoute name="Task Details Page" exact path="/task" component={TaskDetailsPage}/>
            <ShiftScopedRoute name="Admin" exact path="/admin" component={AdminPage}/>
            <Redirect to="/dashboard"/>
            </Switch>
    </main>
);

export default Main
import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProceduresPage from '../pages/procedures/components/ProceduresPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import MessagesPage from '../pages/messages/components/MessagesPage'
import ShiftPage from "../pages/shift/components/ShiftPage";
import AdminPage from "../pages/admin/components/AdminPage";
import ShiftScopedRoute from "./shift/ShiftScopedRoute";
import CalendarPage from "../pages/calendar/components/CalendarPage";
import ProcessStartPage from "../pages/procedures/components/ProcedureStartPage";
import TaskDetailsPage from "../pages/task/component/TaskPage";
import ReportPage from "../pages/reports/components/ReportPage";
import DashboardPage from "../pages/dashboard/components/DashboardPage";
import YourTasksContainer from "../pages/tasks/components/YourTasksContainer";
import YourGroupUnassignedTasksContainer from "../pages/tasks/components/YourGroupUnassignedTasksContainer";
import YourGroupTasksContainer from "../pages/tasks/components/YourGroupTasksContainer";
import AppConstants from "../common/AppConstants";
import ProcessDiagramPage from '../pages/procedures/components/ProcessDiagramPage';


const Main = () => (
    <main>
        <Switch>
            <Route name="Dashboard" exact path={AppConstants.DASHBOARD_PATH} component={DashboardPage}/>
            <Route name="Shift" exact path={AppConstants.SHIFT_PATH} component={ShiftPage}/>
            <ShiftScopedRoute name="Your tasks" exact path={AppConstants.YOUR_TASKS_PATH} component={YourTasksContainer}/>
            <ShiftScopedRoute name="Your group unassigned tasks" exact path={AppConstants.YOUR_GROUP_UNASSIGNED_TASKS_PATH} component={YourGroupUnassignedTasksContainer}/>
            <ShiftScopedRoute name="Your group tasks" exact path={AppConstants.YOUR_GROUP_TASKS_PATH} component={YourGroupTasksContainer}/>
            <ShiftScopedRoute name="Procedures" exact path={AppConstants.PROCEDURES_PATH} component={ProceduresPage}/>
            <ShiftScopedRoute name="Reports" exact path={AppConstants.REPORTS_PATH} component={ReportsPage} />
            <ShiftScopedRoute exact path={AppConstants.REPORT_PATH} component={ReportPage}/>
            <ShiftScopedRoute name="Messages" exact path={AppConstants.MESSAGES_PATH} component={MessagesPage}/>
            <ShiftScopedRoute name="Calendar" exact path={AppConstants.CALENDAR_PATH} component={CalendarPage}/>
            <ShiftScopedRoute name="Procedure Start Page" exact path={AppConstants.PROCEDURE_START_PATH} component={ProcessStartPage}/>
            <ShiftScopedRoute name="Process Diagram Page" exact path={AppConstants.PROCESS_DIAGRAM_PATH} component={ProcessDiagramPage}/>
            <ShiftScopedRoute name="Task Details Page" exact path={AppConstants.TASK_PATH} component={TaskDetailsPage}/>
            <ShiftScopedRoute name="Admin" exact path={AppConstants.ADMIN_PATH} component={AdminPage}/>
            <Redirect to={AppConstants.DASHBOARD_PATH}/>
            </Switch>
    </main>
);

export default Main

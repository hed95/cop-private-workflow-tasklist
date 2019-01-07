import 'babel-polyfill';

import React, { Suspense, lazy }  from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ShiftScopedRoute from './shift/ShiftScopedRoute';
import AppConstants from '../common/AppConstants';
import DataSpinner from './components/DataSpinner';

const DashboardPage = lazy(() => import('../pages/dashboard/components/DashboardPage'));
const ShiftPage = lazy(() => import ('../pages/shift/components/ShiftPage'));
const YourTasksContainer = lazy(() => import ('../pages/tasks/components/YourTasksContainer'));
const ProceduresPage = lazy(() => import ('../pages/procedures/components/ProceduresPage'));
const ReportsPage = lazy(() => import('../pages/reports/components/ReportsPage'));
const YourGroupUnassignedTasksContainer = lazy(() => import('../pages/tasks/components/YourGroupUnassignedTasksContainer'));
const YourGroupTasksContainer = lazy(() => import('../pages/tasks/components/YourGroupTasksContainer'));
const ReportPage = lazy(() => import('../pages/reports/components/ReportPage'));
const MessagesPage = lazy(() => import('../pages/messages/components/MessagesPage'));
const CalendarPage = lazy(() => import('../pages/calendar/components/CalendarPage'));
const ProcessStartPage = lazy(() => import('../pages/procedures/components/ProcedureStartPage'));
const ProcessDiagramPage = lazy(() => import('../pages/procedures/components/ProcessDiagramPage'));
const AdminPage = lazy(() => import('../pages/admin/components/AdminPage'));
const TaskPage =  lazy(() => import('../pages/task/component/TaskPage'));

const Main = () => (
  <main>
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}><DataSpinner message="Loading routes"/></div>}>
      <Switch>
        <Route name="Dashboard" exact path={AppConstants.DASHBOARD_PATH} component={() => <DashboardPage />}/>
        <Route name="Shift" exact path={AppConstants.SHIFT_PATH} component={() => <ShiftPage/>}/>
        <ShiftScopedRoute name="Your tasks" exact path={AppConstants.YOUR_TASKS_PATH} component={() => <YourTasksContainer />}/>
        <ShiftScopedRoute name="Your group unassigned tasks" exact path={AppConstants.YOUR_GROUP_UNASSIGNED_TASKS_PATH} component={() => <YourGroupUnassignedTasksContainer />}/>
        <ShiftScopedRoute name="Your group tasks" exact path={AppConstants.YOUR_GROUP_TASKS_PATH} component={() => <YourGroupTasksContainer/>}/>
        <ShiftScopedRoute name="Procedures" exact path={AppConstants.PROCEDURES_PATH} component={() =><ProceduresPage/>}/>
        <ShiftScopedRoute name="Reports" exact path={AppConstants.REPORTS_PATH} component={() =><ReportsPage/>} />
        <ShiftScopedRoute exact path={AppConstants.REPORT_PATH} component={() => <ReportPage/>}/>
        <ShiftScopedRoute name="Messages" exact path={AppConstants.MESSAGES_PATH} component={() => <MessagesPage/>}/>
        <ShiftScopedRoute name="Calendar" exact path={AppConstants.CALENDAR_PATH} component={() => <CalendarPage/>}/>
        <ShiftScopedRoute name="Procedure Start Page" exact path={AppConstants.PROCEDURE_START_PATH} component={() =><ProcessStartPage/>}/>
        <ShiftScopedRoute name="Process Diagram Page" exact path={AppConstants.PROCESS_DIAGRAM_PATH} component={() =><ProcessDiagramPage/>}/>
        <ShiftScopedRoute name="Task Details Page" exact path={AppConstants.TASK_PATH} component={() =><TaskPage/>}/>
        <ShiftScopedRoute name="Admin" exact path={AppConstants.ADMIN_PATH} component={() =><AdminPage/>}/>
        <Redirect to={AppConstants.DASHBOARD_PATH}/>
      </Switch>
    </Suspense>
  </main>
);

export default Main

import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from '../pages/procedures/components/ProceduresPage'
import TasksPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import MessagesPage from '../pages/messages/components/MessagesPage'
import ProfilePage from "../pages/shift/components/ShiftPage";
import AdminPage from "../pages/admin/components/AdminPage";
import SessionScopedRoute from "./shift/components/ShiftScopedRoute";
import CalendarPage from "../pages/calendar/components/CalendarPage";
import ProcessStartPage from "../pages/procedures/components/ProcedureStartPage";
import TaskDetailsPage from "../pages/task/component/TaskDetailsPage";
import ErrorHandlingComponent from "./error/component/ErrorHandlingComponent";

const Main = () => (
    <main>
            <Switch>
                <Route name="Shift" exact path="/shift" render={() => (
                    <ErrorHandlingComponent><ProfilePage /></ErrorHandlingComponent>
                )}/>
                <SessionScopedRoute name="Tasks" exact path='/tasks' component={TasksPage} />
                <SessionScopedRoute name="Procedures" exact path='/procedures' component={ProcessesPage}/>
                <SessionScopedRoute name="Reports" exact path='/reports' component={ReportsPage}/>
                <SessionScopedRoute name="Messages" exact path='/messages' component={MessagesPage}/>
                <SessionScopedRoute name="Calendar" exact path='/calendar' component={CalendarPage}/>
                <SessionScopedRoute name="Procedure Start Page" exact path="/procedure-start" component={ProcessStartPage}/>
                <SessionScopedRoute name="Task Details Page" exact path="/task" component={TaskDetailsPage}/>

                <Route name="Admin" exact path="/admin" component={AdminPage}/>
                <Redirect to="/shift"/>
            </Switch>
    </main>
);

export default Main
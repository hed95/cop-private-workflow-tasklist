import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import ProcessesPage from '../pages/procedures/components/ProceduresPage'
import TasksPage from './../pages/tasks/components/TasksPage'
import ReportsPage from './../pages/reports/components/ReportsPage'
import MessagesPage from '../pages/messages/components/MessagesPage'
import ProfilePage from "../pages/shift/components/ShiftPage";
import AdminPage from "../pages/admin/components/AdminPage";
import ShiftScopedRoute from "./shift/components/ShiftScopedRoute";
import CalendarPage from "../pages/calendar/components/CalendarPage";
import ProcessStartPage from "../pages/procedures/components/ProcedureStartPage";
import TaskDetailsPage from "../pages/task/component/TaskDetailsPage";
import ErrorHandlingComponent from "./error/component/ErrorHandlingComponent";
import InterventionsReport from "../pages/reports/components/InterventionsReport";


const ReportRoutes = ({match}) => (
    <div>

    </div>
);



const Main = () => (
    <main>
            <Switch>
                <Route name="Shift" exact path="/shift" render={() => (
                    <ErrorHandlingComponent><ProfilePage /></ErrorHandlingComponent>
                )}/>
                <ShiftScopedRoute name="Tasks" exact path='/tasks' component={TasksPage} />
                <ShiftScopedRoute name="Procedures" exact path='/procedures' component={ProcessesPage}/>
                <ShiftScopedRoute name="Reports" exact path='/reports' component={ReportsPage} />
                <ShiftScopedRoute exact path="/reports/interventions" component={InterventionsReport}/>
                <ShiftScopedRoute name="Messages" exact path='/messages' component={MessagesPage}/>
                <ShiftScopedRoute name="Calendar" exact path='/calendar' component={CalendarPage}/>
                <ShiftScopedRoute name="Procedure Start Page" exact path="/procedure-start" component={ProcessStartPage}/>
                <ShiftScopedRoute name="Task Details Page" exact path="/task" component={TaskDetailsPage}/>

                <Route name="Admin" exact path="/admin" component={AdminPage}/>
                <Redirect to="/shift"/>
            </Switch>
    </main>
);

export default Main
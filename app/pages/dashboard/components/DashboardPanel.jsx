import React from 'react';
import ProceduresDashboardPanel from "./ProceduresDashboardPanel";
import ReportsDashboardPanel from "./ReportsDashboardPanel";
import CalendarDashboardPanel from "./CalendarDashboardPanel";
import AdminPanel from "./AdminPanel";
import MessagesPanel from "./MessagesPanel";
import {withRouter} from "react-router";
import TaskCountPanel from "./TaskCountPanel";

class DashboardPanel extends React.Component {


    render() {
        return <div>
            <ul className="grid-row">
                <TaskCountPanel hasActiveShift={this.props.hasActiveShift}/>
                <MessagesPanel hasActiveShift={this.props.hasActiveShift}/>
            </ul>
            <hr/>
            <ul className="grid-row">
                <ProceduresDashboardPanel hasActiveShift={this.props.hasActiveShift}/>
                <ReportsDashboardPanel hasActiveShift={this.props.hasActiveShift}/>
                <CalendarDashboardPanel hasActiveShift={this.props.hasActiveShift}/>
                <AdminPanel hasActiveShift={this.props.hasActiveShift}/>
            </ul>
        </div>
    }

}

export default withRouter(DashboardPanel);
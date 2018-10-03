import React from 'react';
import ProceduresDashboardPanel from "./ProceduresDashboardPanel";
import ReportsDashboardPanel from "./ReportsDashboardPanel";
import CalendarDashboardPanel from "./CalendarDashboardPanel";
import AdminPanel from "./AdminPanel";
import MessagesPanel from "./MessagesPanel";
import {withRouter} from "react-router";
import TaskCountPanel from "./TaskCountPanel";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import connect from "react-redux/es/connect/connect";

class DashboardPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    connect = () => {
        this.socket = new SockJS("/api/workflow/ws-tasks", null, {});
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect({
            "Authorization": `Bearer ${this.props.kc.token}`
        }, () => {
            this.connected = true;
            console.log(`connected to websocket server`);
            this.client.subscribe(`/topic/task/${this.props.shift.teamid}`, (msg) => {
                console.log(msg);
            });
        }, (error) => {
            if (error) {
                console.log(`Failed to connect ${error}`);
            }
            if (this.connected) {
                this.connected = false;
                this.retryCount = 0;
            }
            this._timeoutId =
                setTimeout(this.connect(), () => {
                    return 1000 * this.retryCount++
                });
        })
    };

    disconnect = () => {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null
        }
        console.log("Disconnecting websocket");
        if (this.connected) {
            this.connected = null;
            this.stompClient.disconnect();
        }
    };

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.retryCount = 0;
            this.connect = this.connect.bind(this);
            this.disconnect = this.disconnect.bind(this);
            this.connect();
        }
    }

    componentWillUnmount() {
        this.disconnect();
    }

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

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
    }
}, {})(DashboardPanel))
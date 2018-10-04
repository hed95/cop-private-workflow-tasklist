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
import PubSub from "pubsub-js";

class DashboardPanel extends React.Component {

    connect = () => {
        this.socket = new SockJS("/ws/workflow/tasks", null, {});
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = () => {};
        this.stompClient.connect({
            "Authorization": `Bearer ${this.props.kc.token}`
        }, () => {
            this.connected = true;
            console.log(`Connected to websocket server`);
            this.stompClient.subscribe(`/topic/task/${this.props.shift.get('teamid')}`, (msg) => {
                PubSub.publish("refreshCount", {});
            });
            this.stompClient.subscribe(`/user/queue/task`, (msg) => {
                PubSub.publish("refreshCount", {});
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
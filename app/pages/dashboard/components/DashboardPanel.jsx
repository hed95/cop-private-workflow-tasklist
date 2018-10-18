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

    constructor(props) {
        super(props);
        this.websocketSubscriptions = [];
        this.retryCount = 0;
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.heartbeat = 10000;
        this.heartbeatIncoming = this.heartbeat;
        this.heartbeatOutgoing = this.heartbeat;
    }

    connect = () => {
        this.socket = new SockJS("/ws/workflow/tasks");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = () => {};
        this.client.heartbeat.outgoing = this.props.heartbeatOutgoing;
        this.client.heartbeat.incoming = this.props.heartbeatIncoming;

        this.stompClient.connect({
            "Authorization": `Bearer ${this.props.kc.token}`
        }, () => {
            this.connected = true;
            console.log(`Connected to websocket server`);
            const teamSub = this.stompClient.subscribe(`/topic/task/${this.props.shift.get('teamid')}`, (msg) => {
                PubSub.publish("refreshCount", {});
            });
            this.websocketSubscriptions.push(teamSub);

            const userSub = this.stompClient.subscribe(`/user/queue/task`, (msg) => {
                PubSub.publish("refreshCount", {});
            });
            this.websocketSubscriptions.push(userSub);
            console.log("Number of subscriptions " + this.websocketSubscriptions.length);

        }, (error) => {
            this.retryCount++;
            if (error) {
                this.websocketSubscriptions = [];
                console.log(`Failed to connect ${error}...will retry to connect in ${this.retryCount === 1 ? 6 : 60} seconds`);
            }
            if (this.connected) {
                this.connected = false;
            }
            let timeout = this.retryCount === 1 ? 6000 : 60000;
            this._timeoutId =
                setTimeout(() => this.connect(), timeout);

        })
    };

    disconnect = () => {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        }
        this.retryCount = 0;
        console.log("Disconnecting websocket");
        if (this.connected) {
            if (this.websocketSubscriptions) {
                this.websocketSubscriptions.forEach((sub) => {
                    console.log("Disconnecting sub" + sub.id);
                    sub.unsubscribe();
                });
                this.websocketSubscriptions = [];
            }
            this.connected = null;
            this.stompClient.disconnect();
        }
    };


    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.connect();
        }
    }

    componentWillUnmount() {
        PubSub.clearAllSubscriptions();
        this.retryCount = 0;
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
import React, { Suspense } from 'react';

import {withRouter} from "react-router";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {connect} from "react-redux";
import PubSub from "pubsub-js";
import DataSpinner from '../../../core/components/DataSpinner';


const ProceduresDashboardPanel = React.lazy(() => import('./ProceduresDashboardPanel'));
const ReportsDashboardPanel = React.lazy(() => import('./ReportsDashboardPanel'));
const CalendarDashboardPanel = React.lazy(() => import('./CalendarDashboardPanel'));
const MessagesPanel  = React.lazy(() => import('./MessagesPanel'));
const TaskCountPanel = React.lazy(() => import('./TaskCountPanel'));
const AdminPanel = React.lazy(() => import('./AdminPanel'));

export class DashboardPanel extends React.Component {

    constructor(props) {
        super(props);
        this.websocketSubscriptions = [];
        this.retryCount = 0;
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    connect = () => {
        this.socket = new SockJS("/ws/workflow/tasks");
        this.stompClient = Stomp.over(this.socket);
        const uiEnv = this.props.appConfig.uiEnvironment.toLowerCase();

        if (uiEnv !== 'development' &&  uiEnv !== 'local') {
            this.stompClient.debug = () => {};
        }

        const heartBeat = 5000;
        this.stompClient.heartbeat.outgoing = heartBeat;
        this.stompClient.heartbeat.incoming = heartBeat;

        this.stompClient.connect({
            "Authorization": `Bearer ${this.props.kc.token}`
        }, () => {
            this.connected = true;
            console.log(`Connected to websocket server`);
            const teamSub = this.stompClient.subscribe(`/topic/task/${this.props.shift.get('teamid')}`, (msg) => {
                PubSub.publishSync("refreshCount", {});
            });
            this.websocketSubscriptions.push(teamSub);

            const userSub = this.stompClient.subscribe(`/user/queue/task`, (msg) => {
                PubSub.publishSync("refreshCount", {});
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
            if (this._timeoutId) {
                clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }
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
        if (this.props.shift) {
            this.connect();
        }
    }

    componentWillUnmount() {
        this.retryCount = 0;
        this.disconnect();
    }

    render() {
        return <div>
            <ul className="grid-row">
                <TaskCountPanel {...this.props}/>
                <MessagesPanel {...this.props} />
            </ul>
            <hr/>
            <ul className="grid-row">
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}><DataSpinner message="Loading panels..."/></div>}>
                <ProceduresDashboardPanel {...this.props}/>
                <ReportsDashboardPanel {...this.props}/>
                <CalendarDashboardPanel {...this.props}/>
                <AdminPanel {...this.props}/>
              </Suspense>
            </ul>
        </div>
    }

}

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        appConfig: state.appConfig
    }
}, {})(DashboardPanel))

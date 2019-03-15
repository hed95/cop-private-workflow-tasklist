import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { yourTasks } from '../selectors';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import DataSpinner from '../../../core/components/DataSpinner';
import { debounce, throttle } from 'throttle-debounce';
import YourTasks from './YourTasks';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export class YourTasksContainer extends React.Component {


  constructor(props) {
    super(props);
    this.websocketSubscriptions = [];
    this.retryCount = 0;
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.goToTask = this.goToTask.bind(this);
    this.sortYourTasks = this.sortYourTasks.bind(this);
    this.filterTasksByName = this.filterTasksByName.bind(this);
    this.debounceSearch = this.debounceSearch.bind(this);
  }

  connect = () => {
    this.socket = new SockJS('/ws/workflow/tasks');
    this.stompClient = Stomp.over(this.socket);
    const uiEnv = this.props.appConfig.uiEnvironment.toLowerCase();
    if (uiEnv !== 'development' && uiEnv !== 'local') {
      this.stompClient.debug = () => {
      };
    }
    const heartBeat = 5000;
    this.stompClient.heartbeat.outgoing = heartBeat;
    this.stompClient.heartbeat.incoming = heartBeat;

    this.stompClient.connect({
      'Authorization': `Bearer ${this.props.kc.token}`
    }, (frame) => {
      this.connected = true;
      console.log(`Connected to websocket server`);
      const userSub = this.stompClient.subscribe(`/user/queue/task`, (msg) => {
        this.loadYourTasks(true, this.props.yourTasks.get('yourTasksSortValue'),
          this.props.yourTasks.get('yourTasksFilterValue'));
      });
      this.websocketSubscriptions.push(userSub);
      console.log('Number of subscriptions ' + this.websocketSubscriptions.length);

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

    });
  };

  disconnect = () => {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
    this.retryCount = 0;
    console.log('Disconnecting websocket');
    if (this.connected) {
      if (this.websocketSubscriptions) {
        this.websocketSubscriptions.forEach((sub) => {
          console.log('Disconnecting sub' + sub.id);
          sub.unsubscribe();
        });
        this.websocketSubscriptions = [];
      }
      this.connected = null;
      this.stompClient.disconnect();
    }
  };

  componentDidMount() {
    this.loadYourTasks(false, 'sort=due,desc');
    this.connect();
  }

  loadYourTasks(skipLoading, yourTasksSortValue, yourTasksFilterValue = null) {
    this.props.fetchTasksAssignedToYou(yourTasksSortValue, yourTasksFilterValue, skipLoading);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  componentWillUnmount() {
    this.retryCount = 0;
    this.disconnect();
  }

  debounceSearch(sortValue, filterValue) {
    if (filterValue.length <= 2 || filterValue.endsWith(' ')) {
      throttle(200, () => {
        this.props.fetchTasksAssignedToYou(sortValue, filterValue, true);
      })();
    } else {
      debounce(500, () => {
        this.props.fetchTasksAssignedToYou(sortValue, filterValue, true);
      })();
    }
  };

  filterTasksByName(event) {
    event.persist();
    const { yourTasks } = this.props;
    this.debounceSearch(yourTasks.get('yourTasksSortValue'), event.target.value);
  };

  sortYourTasks(event) {
    this.props.fetchTasksAssignedToYou(event.target.value,
      this.props.yourTasks.get('yourTasksFilterValue'), true);
  };

  render() {
    const { yourTasks } = this.props;
    if (yourTasks.get('isFetchingTasksAssignedToYou')) {
      return <DataSpinner message="Fetching tasks assigned to you"/>;
    } else {
      return <YourTasks
        filterTasksByName={this.filterTasksByName}
        sortYourTasks={this.sortYourTasks}
        goToTask={this.goToTask}
        yourTasks={yourTasks} startAProcedure={() => this.props.history.replace('/procedures')}/>;
    }
  }
}

YourTasksContainer.propTypes = {
  fetchTasksAssignedToYou: PropTypes.func.isRequired,
  yourTasks: ImmutablePropTypes.map
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect((state) => {
  return {
    yourTasks: yourTasks(state),
    appConfig: state.appConfig,
    kc: state.keycloak
  };
}, mapDispatchToProps)(withRouter(YourTasksContainer));

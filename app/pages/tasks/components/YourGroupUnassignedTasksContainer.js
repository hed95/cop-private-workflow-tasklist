import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import { unassignedTasks } from '../selectors';
import { withRouter } from 'react-router';
import DataSpinner from '../../../core/components/DataSpinner';
import YourGroupUnassignedTasks from './YourGroupUnassignedTasks';
import { debounce, throttle } from 'throttle-debounce';
import AppConstants from '../../../common/AppConstants';


export class YourGroupUnassignedTasksContainer extends React.Component {


  componentDidMount() {
    this.loadUnassignedTasks(false, 'sort=due,desc');
    const that = this;
    this.timeoutId = setInterval(() => {
      const { unassignedTasks } = that.props;
      this.loadUnassignedTasks(true, unassignedTasks.get('yourGroupsUnassignedTasksSortValue'),
        unassignedTasks.get('yourGroupsUnassignedTasksFilterValue'));
    }, AppConstants.ONE_MINUTE);
  }

  componentWillMount() {
    this.goToTask = this.goToTask.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
    this.filterTasksByName = this.filterTasksByName.bind(this);
    this.debounceSearch = this.debounceSearch.bind(this);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  loadUnassignedTasks(skipLoading, yourGroupsUnassignedTasksSortValue, yourGroupsUnassignedTasksFilterValue = null) {
    this.props.fetchUnassignedTasks(yourGroupsUnassignedTasksSortValue, yourGroupsUnassignedTasksFilterValue, skipLoading);
  }

  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  debounceSearch(sortValue, filterValue) {
    if (filterValue.length <= 2 || filterValue.endsWith(' ')) {
      throttle(200, () => {
        this.props.fetchUnassignedTasks(sortValue, filterValue, true);
      })();
    } else {
      debounce(500, () => {
        this.props.fetchUnassignedTasks(sortValue, filterValue, true);
      })();
    }
  };

  filterTasksByName(event) {
    event.persist();
    const { unassignedTasks } = this.props;
    this.debounceSearch(unassignedTasks.get('yourGroupsUnassignedTasksSortValue'),
      event.target.value);
  };

  sortTasks(event) {
    this.props.fetchUnassignedTasks(event.target.value,
      this.props.unassignedTasks.get('yourGroupsUnassignedTasksFilterValue'), true);
  };


  goToTask(taskId) {
    this.props.history.replace(`/task?taskId=${taskId}`);
  }

  render() {
    const { unassignedTasks } = this.props;
    if (unassignedTasks.get('isFetchingUnassignedTasks')) {
      return <DataSpinner message="Fetching your group unassigned tasks"/>;
    } else {
      return <YourGroupUnassignedTasks
        sortTasks={this.sortTasks}
        filterTasksByName={this.filterTasksByName}
        unassignedTasks={unassignedTasks}
        goToTask={this.goToTask} startAProcedure={() => this.props.history.replace("/procedures")}/>;
    }
  }
}

YourGroupUnassignedTasksContainer.propTypes = {
  fetchUnassignedTasks: PropTypes.func.isRequired,
  unassignedTasks: ImmutablePropTypes.map,
};

const mapStateToProps = createStructuredSelector({
  unassignedTasks: unassignedTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourGroupUnassignedTasksContainer));

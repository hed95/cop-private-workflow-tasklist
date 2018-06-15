import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import ImmutablePropTypes from "react-immutable-proptypes";
import {createStructuredSelector} from "reselect";
import * as actions from '../actions';
import {
    pageSize, hasMoreItems, isFetching, nextPage, notifications, total, acknowledgingTaskIds
} from "../selectors";
import LoadingBar from 'react-redux-loading-bar'
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';


class MessagesPage extends React.Component {

    componentDidMount() {
        this.props.fetchNotifications("/api/workflow/notifications");
    }

    render() {
        const items = [];
        this.props.notifications.forEach(task => {
            const notificationElement = items.find(element => element.key === task.getIn(['task', 'id']));
            if (!notificationElement) {
                items.push(<NotificationTask key={task.getIn(['task', 'id'])} task={task} action={this.props}/>);
            }
        });

        return <div>
            <LoadingBar
                updateTime={100}
                maxProgress={100}
                progressIncrease={4}
                scope="notifications"
                className="loading-bar"
            />
            {this.props.isFetching ?
                <div className="data-item bold-small">Loading messages...</div> :
                <div className="data">

                    <span className="data-item bold-xlarge">{this.props.total}</span>
                    <span className="data-item bold-small">Messages</span>
                </div>}


            <div className="grid-row">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.props.fetchNotifications(this.props.nextPage)}
                    initialLoad={false}
                    hasMore={this.props.hasMoreItems}>
                    <div>
                        {items}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    }
}

const NotificationTask = ({task, action}) => {
    const taskId = task.getIn(['task', 'id']);
    const taskDescription = task.getIn(['task', 'description']);
    const taskName = task.getIn(['task', 'name']);

    const determineColour = (task) => {
        const taskPriority = task.getIn(['task', 'priority']);
        switch (taskPriority) {
            case 1000:
                return '#B10E1E';
            case 100:
                return '#F47738';
            default:
                return '#BFC1C3';
        }
    };

    const determineTitle = (task) => {
        const taskPriority = task.getIn(['task', 'priority']);
        switch (taskPriority) {
            case 1000:
                return 'Emergency';
            case 100:
                return 'Urgent';
            default:
                return 'Info';
        }
    };

    const created = (task) => {
        const created = moment(task.getIn(['task', 'created']));
        return created.fromNow(false);
    };

    const onClick = e => {
        e.preventDefault();
        action.acknowledgeNotification(taskId);
    };
    return <div className="column-one-third">
        <div className="flash-card" style={{'backgroundColor': determineColour(task)}}>
            <header>
                <h2 className="heading-small">{determineTitle(task)}: {taskName}</h2>
                <h5 className="heading-xsmall">{created(task)}</h5>
            </header>
            <div className="grid-row">
                <div className="column-full">
                    <a style={{'color': 'white'}} href={taskDescription}> {taskDescription}</a>
                    <div className="form-group bottom-right-container">
                        <input className="button" type="submit" value="Acknowledge" onClick={onClick}
                               disabled={action.acknowledgingTaskIds.contains(taskId)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

MessagesPage.propTypes = {
    fetchNotifications: PropTypes.func.isRequired,
    acknowledgeNotification: PropTypes.func.isRequired,
    notifications: ImmutablePropTypes.list.isRequired,
    isFetching: PropTypes.bool,
    total: PropTypes.number,
    nextPage: PropTypes.string,
    hasMoreItems: PropTypes.bool,
    pageSize: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
    notifications: notifications,
    isFetching: isFetching,
    total: total,
    nextPage: nextPage,
    hasMoreItems: hasMoreItems,
    pageSize: pageSize,
    acknowledgingTaskIds: acknowledgingTaskIds
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);

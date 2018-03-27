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

class NotificationsPage extends React.Component {

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
                <div className="data-item bold-small">Loading notifications...</div> :
                <div className="data">

                    <span className="data-item bold-xlarge">{this.props.total}</span>
                    <span className="data-item bold-small">Notifications</span>
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

    const onClick = e => {
        e.preventDefault();
        action.acknowledgeNotification(taskId);
    };
    return <div className="column-one-third">
        <div className="flash-card">
            <header>
                <h2 className="heading-small">{taskName}</h2>
            </header>
            <div className="grid-row">
                <div className="column-full">
                    <a style={{'color': 'white'}} href={taskDescription}> {taskDescription}</a>
                    <div className="form-group bottom-right-container" >
                        <input className="button button-white" type="submit" value="Complete" onClick={onClick}
                               disabled={action.acknowledgingTaskIds.contains(taskId)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

NotificationsPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);

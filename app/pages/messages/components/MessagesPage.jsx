import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import ImmutablePropTypes from "react-immutable-proptypes";
import {createStructuredSelector} from "reselect";
import * as actions from '../actions';
import {
    pageSize, hasMoreItems, isFetching, nextPage, notifications, total, acknowledgingTaskIds
} from "../selectors";
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';


export class MessagesPage extends React.Component {

    componentDidMount() {
        this.props.fetchNotifications();
    }

    componentWillUnmount() {
        this.props.clearNotifications();
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

            {this.props.isFetching ?
                <h4 className="govuk-heading-s">Loading messages...</h4> : <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-half">
                        <span className="govuk-caption-l">Operational messages</span>
                        <h2 className="govuk-heading-l">{this.props.total} messages</h2>
                    </div>

                </div>
            }

            <div className="govuk-grid-row" id="messages">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.props.fetchNotificationsNextPage(this.props.nextPage)}
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
                return 'Standard';
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
    return <div className="govuk-grid-column-one-third">
        <div className="flash-card" style={{'backgroundColor': determineColour(task)}}>
            <header>
                <h2 className="govuk-heading-s" id='messageName' style={{color:'white'}}>{determineTitle(task)}: {taskName}</h2>
                <h5 className="govuk-!-font-size-16" id='messageCreated'>{created(task)}</h5>
            </header>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-full">
                    <a style={{'color': 'white'}} href={taskDescription}> {taskDescription}</a>
                    <div className="form-group bottom-right-container">
                        <button className="govuk-button" type="submit"  onClick={onClick}
                                disabled={action.acknowledgingTaskIds.contains(taskId)}>Acknowledge</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

MessagesPage.propTypes = {
    fetchNotifications: PropTypes.func.isRequired,
    fetchNotificationsNextPage: PropTypes.func.isRequired,
    acknowledgeNotification: PropTypes.func.isRequired,
    clearNotifications: PropTypes.func.isRequired,
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

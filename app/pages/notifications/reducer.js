import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List, Set} = Immutable;

const initialState = new Map({
    isFetching: false,
    notifications: List([]),
    total: 0,
    nextPage: null,
    hasMoreItems: false,
    pageSize: null,
    acknowledgingTaskIds: Set([])
});

function reducer(state = initialState, action) {
    switch (action.type) {
        //fetch notifications
        case actions.FETCH_NOTIFICATIONS:
            return state.set('isFetching', true);
        case actions.FETCH_NOTIFICATIONS_SUCCESS:
            const data = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];

            const pagedNotifications = state.get('notifications');
            let merged;
            if (pagedNotifications.size !== 0) {
                merged = pagedNotifications.concat(Immutable.fromJS(data));
            } else {
                merged = Immutable.fromJS(data);
            }

            const total = action.payload.entity.page ? action.payload.entity.page.totalElements : 0;
            const pageSize = action.payload.entity.page ? action.payload.entity.page.size : 20;
            const links = action.payload.entity._links;
            let nextPage = null;
            let hasMoreItems = false;

            if ("next" in links) {
                nextPage = links.next.href;
                hasMoreItems = true;
            }
            return state.set('notifications', merged)
                .set('isFetching', false)
                .set('pageSize', pageSize)
                .set('total', total)
                .set('nextPage', nextPage)
                .set('hasMoreItems', hasMoreItems);

        case actions.FETCH_NOTIFICATIONS_FAILURE:
            return state.set('isFetching', false).set('error', action.payload);

        case actions.ACKNOWLEDGE_NOTIFICATION:
            const acknowledgingTaskIds = state.get('acknowledgingTaskIds').add(action.taskId);
            return state.set('acknowledgingTaskIds', acknowledgingTaskIds);
        case actions.ACKNOWLEDGE_NOTIFICATION_SUCCESS:
            const taskId = action.payload.entity.id;
            const taskIds = state.get('acknowledgingTaskIds').delete(taskId);
            const totalResult = state.get('total');
            state = state.set('acknowledgingTaskIds',taskIds )
                .set('total', (totalResult - 1));
            const itemIndex = state.get("notifications").findIndex(x => x.getIn(['task','id']) === taskId);
            return itemIndex > -1 ? state.deleteIn(["notifications", itemIndex]) : state;
        case actions.ACKNOWLEDGE_NOTIFICATION_FAILURE:
            const ids = state.get('acknowledgingTaskIds').delete(action.taskId);
            return state.set('acknowledgingTaskIds',ids);
        default:
            return state;
    }
}

export default reducer;

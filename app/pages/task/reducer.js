import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    isFetchingTask: false,
    isFetchingComments: false,
    isCreatingComment: false,
    comments: new List([]),
    task: new Map({}),
    form: null,
    isFetchingCreateCommentForm: false

});

function reducer(state = initialState, action) {
    switch (action.type) {
        //fetch task
        case actions.FETCH_TASK:
            return state.set('isFetchingTask', true);
        case actions.FETCH_TASK_SUCCESS:
            const task = action.payload.entity.task;
            return state.set('isFetchingTask', false)
                .set('task', Immutable.fromJS(task));
        case actions.FETCH_TASK_FAILURE:
            return state.set('isFetchingTask', false);

        //fetch comments
        case actions.FETCH_COMMENTS:
            return state.set("isFetchingComments", true)
                .set('comments', new List([]));
        case actions.FETCH_COMMENTS_SUCCESS:
            const comments = action.payload.entity;
            return state.set('isFetchingComments', false)
                .set('comments', Immutable.fromJS(comments));
        case actions.FETCH_COMMENTS_FAILURE:
            return state.set('isFetchingComments', false);

        //create comment
        case actions.CREATE_COMMENT:
            return state.set('isCreatingComment', true);
        case actions.CREATE_COMMENT_SUCCESS:
            const comment = action.payload.entity;
            const commentsFromState = state.get('comments');
            return state.set('isCreatingComment', false)
                .set('comments', commentsFromState.push(Immutable.fromJS(comment)));

        //fetch create comment form
        case actions.FETCH_CREATE_COMMENT_FORM:
            return state.set('isFetchingCreateCommentForm', true);
        case actions.FETCH_CREATE_COMMENT_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('isFetchingCreateCommentForm', false)
                .set('form', data);
        case actions.FETCH_CREATE_COMMENT_FORM_FAILURE:
            return state.set('isFetchingCreateCommentForm', false);

        default:
            return state;
    }
}


export default reducer;

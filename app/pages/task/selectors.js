import {NAME} from "./constants";

export const isFetchingTask = state => state[NAME].get('isFetchingTask');
export const isFetchingComments = state => state[NAME].get('isFetchingComments');
export const task = state => state[NAME].get('task');
export const comments = state => state[NAME].get('comments');
export const isCreatingComment = state => state[NAME].get('isCreatingComment');
export const isFetchingCreateCommentForm = state => state[NAME].get('isFetchingCreateCommentForm');
export const form = state => state[NAME].get('form');
export const reloadCommentForm = state => state[NAME].get('reloadCommentForm');
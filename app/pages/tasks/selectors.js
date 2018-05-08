import {NAME} from "./constants";

export const myTasks = state => state[NAME].get('myTasks');

export const myGroupTasks = state => state[NAME].get('myGroupTasks');

export const unassignedTasks = state => state[NAME].get('unassignedTasks');

export const taskCounts = state => state[NAME].get('taskCounts');

export const isFetchingTaskCounts = state => state[NAME].get('isFetchingTaskCounts');

export const tabIndex = state => state[NAME].get('tabIndex');


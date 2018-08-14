import {NAME} from "./constants";

export const myTasks = state => state[NAME].get('myTasks');

export const myGroupTasks = state => state[NAME].get('myGroupTasks');

export const unassignedTasks = state => state[NAME].get('unassignedTasks');



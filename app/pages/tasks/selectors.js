import {NAME} from "./constants";

export const myTasks = state => state[NAME].get('myTasks');

export const myGroupTasks = state => state[NAME].get('myGroupTasks');

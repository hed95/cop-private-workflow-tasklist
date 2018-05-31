import {NAME} from "./constants";

export const form = state => state[NAME].get('form');
export const loadingTaskForm = state => state[NAME].get('loadingTaskForm');
export const submittingTaskFormForValidation = state => state[NAME].get('submittingTaskFormForValidation');
export const submittingTaskFormForCompletion = state => state[NAME].get('submittingTaskFormForCompletion');
export const taskFormCompleteSuccessful = state => state[NAME].get('taskFormCompleteSuccessful');
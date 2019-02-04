import {NAME} from "./constants";

export const form = state => state[NAME].get('form');
export const loadingTaskForm = state => state[NAME].get('loadingTaskForm');
export const submittingTaskFormForCompletion = state => state[NAME].get('submittingTaskFormForCompletion');
export const taskFormCompleteSuccessful = state => state[NAME].get('taskFormCompleteSuccessful');
export const submittingToFormIO = state => state[NAME].get('submittingToFormIO');
export const submissionToFormIOSuccessful = state => state[NAME].get('submissionToFormIOSuccessful');
export const customEventSuccessfullyExecuted = state => state[NAME].get('customEventSuccessfullyExecuted');
export const submittingCustomEvent = state => state[NAME].get('submittingCustomEvent');

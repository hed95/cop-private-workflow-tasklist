import { NAME } from './constants';

export const form = state => state[NAME].get('form');
export const loadingForm = state => state[NAME].get('loadingForm');
export const submittingToWorkflow = state => state[NAME].get('submittingToWorkflow');
export const submissionToWorkflowSuccessful = state => state[NAME].get('submissionToWorkflowSuccessful');
export const submittingToFormIO = state => state[NAME].get('submittingToFormIO');
export const submissionToFormIOSuccessful = state => state[NAME].get('submissionToFormIOSuccessful');


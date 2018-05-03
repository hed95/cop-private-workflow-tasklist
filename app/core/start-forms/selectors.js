import { NAME } from './constants';

export const form = state => state[NAME].get('form');
export const loadingForm = state => state[NAME].get('loadingForm');
export const submittingFormForValidation = state => state[NAME].get('submittingFormForValidation');
export const submittingToWorkflow = state => state[NAME].get('submittingToWorkflow');
export const submissionToWorkflowSuccessful = state => state[NAME].get('submissionToWorkflowSuccessful');


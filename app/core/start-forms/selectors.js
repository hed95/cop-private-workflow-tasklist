import { NAME } from './constants';

export const form = state => state[NAME].get('form');
export const loadingForm = state => state[NAME].get('loadingForm');
export const formLoadingFailed = state => state[NAME].get('formLoadingFailed');
export const hasFormValidationErrors = state => state[NAME].get('hasFormValidationErrors');
export const validationErrors = state => state[NAME].get('validationErrors');
export const submittingFormForValidation = state => state[NAME].get('submittingFormForValidation');

export const submittingToWorkflow = state => state[NAME].get('submittingToWorkflow');

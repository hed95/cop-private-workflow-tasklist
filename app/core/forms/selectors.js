import { NAME } from './constants';

export const form = state => state[NAME].get('form');
export const loadingForm = state => state[NAME].get('loadingForm');
export const formLoadingFailed = state => state[NAME].get('formLoadingFailed');
export const formValidationError = state => state[NAME].get('formValidationError');
export const validationErrors = state => state[NAME].get('validationErrors');
export const submittingFormForValidation = state => state[NAME].get('submittingFormForValidation');

import { NAME } from './constants';

export const form = state => state[NAME].get('form');
export const loadingForm = state => state[NAME].get('loadingForm');
export const formLoadingFailed = state => state[NAME].get('formLoadingFailed');
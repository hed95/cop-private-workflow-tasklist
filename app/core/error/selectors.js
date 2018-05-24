import { NAME } from './constants';

export const hasError = state => state[NAME].get('hasError');
export const errors = state => state[NAME].get('errors');
export const unauthorised = state => state[NAME].get('unauthorised');

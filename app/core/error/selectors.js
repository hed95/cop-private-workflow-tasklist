import { NAME } from './constants';

export const hasError = state => state[NAME].get('hasError');
export const errors = state => state[NAME].get('errors');

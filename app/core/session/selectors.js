import { NAME } from './constants';

export const hasActiveSession = state => state[NAME].get('hasActiveSession');
export const activeSession = state => state[NAME].get('activeSession');
export const isFetching = state => state[NAME].get('isFetching');
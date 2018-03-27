import { NAME } from './constants';

export const hasActiveSession = state => state[NAME].get('hasActiveSession');
export const sessionInfo = state => state[NAME].get('sessionInfo');
export const isFetching = state => state[NAME].get('isFetching');
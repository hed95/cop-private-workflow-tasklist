import { NAME } from './constants';

export const hasActiveSession = state => state[NAME].get('hasActiveSession');
export const activeSession = state => state[NAME].get('activeSession');
export const isFetchingActiveSession = state => state[NAME].get('isFetchingActiveSession');
export const submittingActiveSession = state => state[NAME].get('submittingActiveSession');
export const activeSubmissionSuccess = state => state[NAME].get('activeSubmissionSuccess');

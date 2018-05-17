import { NAME } from './constants';

export const hasActiveShift = state => state[NAME].get('hasActiveShift');
export const shift = state => state[NAME].get('shift');
export const isFetchingShift = state => state[NAME].get('isFetchingShift');
export const submittingActiveShift = state => state[NAME].get('submittingActiveShift');
export const activeShiftSuccess = state => state[NAME].get('activeShiftSuccess');

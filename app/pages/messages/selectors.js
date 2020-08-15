import NAME from './constants';

export const notifications = state => state[NAME].get('notifications');
export const total = state => state[NAME].get('total');
export const isFetching = state => state[NAME].get('isFetching');
export const nextPage = state => state[NAME].get('nextPage');
export const hasMoreItems = state => state[NAME].get('hasMoreItems');
export const pageSize = state => state[NAME].get('pageSize');
export const acknowledgingTaskIds = state =>
  state[NAME].get('acknowledgingTaskIds');

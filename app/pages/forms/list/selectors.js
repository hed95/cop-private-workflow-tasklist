import NAME from './constants';

export const isFetchingProcessDefinitions = state =>
  state[NAME].get('isFetchingProcessDefinitions');
export const processDefinitions = state =>
  state[NAME].get('processDefinitions');

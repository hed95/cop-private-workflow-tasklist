import { NAME } from './constants';

export const isFetchingProcessDefinitions = state => state[NAME].get('isFetchingProcessDefinitions');
export const processDefinitions = state => state[NAME].get('processDefinitions');
export const hasError = state => state[NAME].get("error");
export const errorMessage = state => state[NAME].get("errorMessage");
export const isFetchingProcessDefinition = state => state[NAME].get('isFetchingProcessDefinition');
export const processDefinition = state => state[NAME].get('processDefinition');

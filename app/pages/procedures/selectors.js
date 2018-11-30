import { NAME } from './constants';

export const isFetchingProcessDefinitions = state => state[NAME].get('isFetchingProcessDefinitions');
export const processDefinitions = state => state[NAME].get('processDefinitions');
export const isFetchingProcessDefinition = state => state[NAME].get('isFetchingProcessDefinition');
export const processDefinition = state => state[NAME].get('processDefinition');
export const isFetchingProcessDefinitionXml = state => state[NAME].get('isFetchingProcessDefinitionXml');
export const processDefinitionXml = state => state[NAME].get('processDefinitionXml');

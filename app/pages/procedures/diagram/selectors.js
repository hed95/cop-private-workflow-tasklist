import { NAME } from './constants';

export const isFetchingProcessDefinitionXml = state => state[NAME].get('isFetchingProcessDefinitionXml');
export const processDefinitionXml = state => state[NAME].get('processDefinitionXml');

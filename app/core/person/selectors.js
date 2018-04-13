import { NAME } from './constants';


export const person = state => state[NAME].get('person');
export const isFetchingPerson = state => state[NAME].get('isFetchingPerson');


import { NAME } from './constants';

export const getRegions = state => state[NAME].get('regions');

export const getLocations = state => state[NAME].get('locations');

export const getTeams = state => state[NAME].get('teams');
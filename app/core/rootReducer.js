import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'

export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    keycloak: keycloakReducer
});
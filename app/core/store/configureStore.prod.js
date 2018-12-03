import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '../rootReducer';
import client from '../../common/rest/client';

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(createEpicMiddleware(rootEpic, {
      dependencies: {client: client}
    })));
}

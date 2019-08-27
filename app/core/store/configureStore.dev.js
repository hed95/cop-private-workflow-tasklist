
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic, rootReducer } from '../rootReducer';
import client from '../../common/rest/client';

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { client },
});

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(
        applyMiddleware(epicMiddleware),

    ));

  if (module.hot) {
    module.hot.accept('../rootReducer', () =>
            store.replaceReducer(require('../rootReducer').rootReducer),
        );

    module.hot.accept('../rootReducer', () => {
      epicMiddleware.replaceEpic(require('../rootReducer').rootEpic);
    });
  }

  return store;
}

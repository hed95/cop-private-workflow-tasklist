import configureMockStore from 'redux-mock-store';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import reducer from './reducer';
import * as types from './actionTypes';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import epic from './epic';
import 'rxjs';

describe('Messages epic', () => {
  const store = configureMockStore()({
    keycloak: {
      token: 'test',
      tokenParsed: {
        email: 'testEmail@email.com',
      },
    },
    appConfig: {
      workflowServiceUrl: 'http://localhost:9000',
    },
  });
  store.replaceReducer(reducer);
  it('can fetchNotifications', done => {
    const action$ = ActionsObservable.of(
      { type: 'FETCH_NOTIFICATIONS', payload: {} },
    );
    const payload = {
      status: {
        code: 200,
      },
      entity: {
        page: {
          totalElements: 1,
          size: 1,
        },
        _links: {
          next: {
            href: 'next',
          },
          previous: {
            href: 'previous',
          },
        },
        _embedded: {
          tasks: [
            {
              id: 'id',
              name: 'name',
            },
          ],
        },
      },
    };

    const client = () => Observable.of(payload);
    const expectedOutput = {
      type: types.FETCH_NOTIFICATIONS_SUCCESS, payload,
    };
    epic(action$, store, { client })
      .subscribe(actualOutput => {
        expect(actualOutput).toEqual(expectedOutput);
        done();
      });
  });
  it('can fetchNotifications after 503 retry', done => {
    const action$ = ActionsObservable.of(
      { type: 'FETCH_NOTIFICATIONS', payload: {} },
    );
    const payload = {
      status: {
        code: 200,
      },
      entity: {
        page: {
          totalElements: 1,
          size: 1,
        },
        _links: {
          next: {
            href: 'next',
          },
          previous: {
            href: 'previous',
          },
        },
        _embedded: {
          tasks: [
            {
              id: 'id',
              name: 'name',
            },
          ],
        },
      },
    };

    let counter = 0;
    const client = () => Observable.defer(() => {
      counter++;
      console.log(`counter ${counter}`);
      if (counter === 5) {
        return Observable.from(Promise.resolve(payload));
      }
      return Observable.from(Promise.reject({
        status: {
          code: 503,
        },
      }));
    });
    const expectedOutput = {
      type: types.FETCH_NOTIFICATIONS_SUCCESS, payload,
    };
    epic(action$, store, { client })
      .subscribe(actualOutput => {
        expect(actualOutput).toEqual(expectedOutput);
        done();
      });
  });
});

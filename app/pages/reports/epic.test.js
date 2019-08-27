import configureMockStore from 'redux-mock-store';
import reducer from './reducer';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as types from './actionTypes';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import epic from './epic';
import 'rxjs';

describe('reports epic', () => {
  const store = configureMockStore()({
    keycloak: {
      token: 'test',
      tokenParsed: {
        email: 'testEmail@email.com',
      },
    },
    appConfig: {
      reportServiceUrl: 'http://localhost:9000',
    },
  });
  store.replaceReducer(reducer);
  it('fetches reports', done => {
    const action$ = ActionsObservable.of(
      { type: types.FETCH_REPORTS_LIST, payload: {} },
    );
    const response = {
      status: {
        code: 200,
      },
      entity: [
        {
          name: 'report',
        },
      ],
    };
    const client = () => Observable.of(response);
    const expectedOutput = {
      type: types.FETCH_REPORTS_LIST_SUCCESS, payload: response,
    };
    epic(action$, store, { client })
      .subscribe(actualOutput => {
        expect(actualOutput).toEqual(expectedOutput);
        done();
      });
  });
  it('retries if reporting service returns 503', done => {
    const action$ = ActionsObservable.of(
      { type: types.FETCH_REPORTS_LIST, payload: {} },
    );
    const response = {
      status: {
        code: 200,
      },
      entity: [
        {
          name: 'report',
        },
      ],
    };
    let counter = 0;

    const client = () => Observable.defer(() => {
      counter++;
      console.log(`counter ${counter}`);
      if (counter === 5) {
        return Observable.from(Promise.resolve(response));
      }
      return Observable.from(Promise.reject({
        status: {
          code: 503,
        },
      }));
    });
    const expectedOutput = {
      type: types.FETCH_REPORTS_LIST_SUCCESS, payload: response,
    };
    epic(action$, store, { client })
      .subscribe(actualOutput => {
        expect(actualOutput).toEqual(expectedOutput);
        done();
      });
  });
});

import { ActionsObservable } from 'redux-observable';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import epic from './epic';
import reducer from './reducer';
import 'rxjs';
import configureMockStore from 'redux-mock-store';
import * as types from './actionTypes';
import PubSub from 'pubsub-js'

jest.mock('pubsub-js', ()=>({
  subscribe:jest.fn(),
  unsubscribe: jest.fn(),
  publish: jest.fn()
}));

describe('Start form epic', () => {
  const store = configureMockStore()({
    keycloak: {
      token: 'test'
    }
  });
  const payload = {
    entity: {
      name: 'formName'
    }
  };
  store.replaceReducer(reducer);
  it('dispatches action to fetch form when successful', (done) => {
    const action$ = ActionsObservable.of(
      { type: 'FETCH_FORM', formName: 'formName' }
    );

    const client = () => Observable.of(payload);

    const expectedOutput = {
      type: types.FETCH_FORM_SUCCESS,
      payload
    };

    epic(action$, store, { client })
      .subscribe((actualOutput) => {
        expect(actualOutput)
          .toEqual(expectedOutput);
        done();
      });
  });
  it('dispatches action to fetch form when unsuccessful', (done) => {
    const action$ = ActionsObservable.of(
      { type: 'FETCH_FORM', formName: 'formName' }
    );

    const client = () => Observable.throw({
      status: {
        code: 500
      }
    });


    Observable.concat(epic(action$, store, { client }))
      .toArray()
      .subscribe((data) => {
        const formFetchFailure = data[0];
        const error = data[1];
        expect(formFetchFailure)
          .toEqual({
            type: types.FETCH_FORM_FAILURE
          });
        expect(error)
          .toEqual({
            type: 'HANDLE_ERROR',
            payload: {
              status: {
                code: 500
              }
            }
          });
        done();
      });
  });
  it('dispatches action to fetch form with context when successful', (done) => {
    const action$ = ActionsObservable.of(
      {
        type: types.FETCH_FORM_WITH_CONTEXT, formName: 'formName', dataContext: {}
      }
    );
    const expectedOutput = {
      type: types.FETCH_FORM_SUCCESS,
      payload
    };

    const client = () => Observable.of(payload);
    epic(action$, store, { client })
      .subscribe((actualOutput) => {
        expect(actualOutput)
          .toEqual(expectedOutput);
        done();
      });

  });
  it('dispatches action to fetch form with context when unsuccessful', (done) => {
    const action$ = ActionsObservable.of(
      {
        type: types.FETCH_FORM_WITH_CONTEXT, formName: 'formName', dataContext: {}
      }
    );

    const client = () => Observable.throw({
      status: {
        code: 500
      }
    });
    Observable.concat(epic(action$, store, { client }))
      .toArray()
      .subscribe((data) => {
        const formFetchFailure = data[0];
        const error = data[1];
        expect(formFetchFailure)
          .toEqual({
            type: types.FETCH_FORM_FAILURE
          });
        expect(error)
          .toEqual({
            type: 'HANDLE_ERROR',
            payload: {
              status: {
                code: 500
              }
            }
          });
        done();
      });
  });

  it('dispatches action to submit to form engine', (done) => {
    const action$ = ActionsObservable.of(
      {
        type: types.SUBMIT,
        formId: 'formId',
        submissionData: {},
        variableName: 'variableName',
        processName: 'processName',
        processKey: 'processKey'
      }
    );
    const client = () => Observable.of({
      entity: { data: {} }
    });
    epic(action$, store, { client })
      .subscribe((actualOutput) => {
        expect(actualOutput.type).toEqual(types.SUBMIT_TO_WORKFLOW);
        expect(actualOutput.processKey).toEqual('processKey');
        expect(actualOutput.variableName).toEqual('variableName');
        done();
      });

  });
  it('dispatches action to submit to form engine unsuccessful', (done) => {
    const action$ = ActionsObservable.of(
      {
        type: types.SUBMIT,
        formId: 'formId',
        submissionData: {},
        variableName: 'variableName',
        processName: 'processName',
        processKey: 'processKey'
      }
    );
    const client = () => Observable.throw({
      status: {
        code: 500
      }
    });
    Observable.concat(epic(action$, store, { client }))
      .toArray()
      .subscribe((data) => {
        const formFetchFailure = data[0];
        const error = data[1];
        expect(formFetchFailure)
          .toEqual({
            type: types.SUBMIT_FAILURE
          });
        expect(error)
          .toEqual({
            type: 'HANDLE_ERROR',
            payload: {
              status: {
                code: 500
              }
            }
          });
        done();
      });
  });
  it('dispatches action to submit to workflow', (done) => {
    const action$ = ActionsObservable.of(
      {
        type: types.SUBMIT_TO_WORKFLOW,
        data: {},
        variableName: 'variableName',
        processKey: 'processKey'
      }
    );
    const client = () => Observable.of({
      entity: { data: {} }
    });

    epic(action$, store, { client })
      .subscribe((actualOutput) => {
        expect(actualOutput.type).toEqual(types.SUBMIT_TO_WORKFLOW_SUCCESS);
        expect(PubSub.publish).toHaveBeenCalled();
        done();
      });
  })
});


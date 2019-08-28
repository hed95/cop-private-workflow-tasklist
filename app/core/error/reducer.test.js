import Immutable from 'immutable';
import * as actions from './actions';
import reducer, { initialState as reducerInitialState } from './reducer';


describe('error reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducerInitialState;
  });
  it('handles unauthorized', () => {
    const state = reducer(initialState, actions.handleUnauthorised());
    expect(state.get('unauthorised')).toEqual(true);
  });
  it('handle reset errors', () => {
    const state = reducer(Immutable.fromJS({
      hasError: true,
      unauthorised: true,
    }), actions.resetErrors());
    expect(state.get('unauthorised')).toEqual(false);
    expect(state.get('hasError')).toEqual(false);
  });
  it('handle error', () => {
    const action = actions.handleError({
      status: {
        code: 401,
      },
      request: {
        method: 'GET',
        path: '/api/test',
      },
      entity: {
        message: 'Failed',
      },
    });
    const updatedState = reducer(initialState, action);
    expect(updatedState.get('hasError')).toEqual(true);
    expect(updatedState.get('errors').size).toEqual(1);
  });
  it('handles duplicate errors', () => {
    const error = {
      status: {
        code: 401,
      },
      request: {
        method: 'GET',
        path: '/api/test',
      },
      entity: {
        message: 'Failed',
      },
    };

    const action = actions.handleError(error);
    const updatedState = reducer(Immutable.fromJS({
      hasError: true,
      errors: [{
        message: 'Failed',
      }],
      unauthorised: true,
    }), action);
    expect(updatedState.get('hasError')).toEqual(true);
    expect(updatedState.get('errors').size).toEqual(1);
  });
});

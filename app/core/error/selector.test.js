import Immutable from 'immutable';
import { hasError, unauthorised, errors } from './selectors';

const { Map, List } = Immutable;

describe('error selector', () => {
  it('should return hasError', () => {
    const state = {
      'error-page': new Map({
        hasError: true,
      }),
    };
    const result = hasError(state);
    expect(result).toEqual(true);
  });
  it('should return unauthorised', () => {
    const state = {
      'error-page': new Map({
        unauthorised: true,
      }),
    };
    const result = unauthorised(state);
    expect(result).toEqual(true);
  });

  it('should return errors', () => {
    const state = {
      'error-page': new Map({
        errors: List([{
          status: 400,
          message: 'test',
        }]),
      }),
    };
    const result = errors(state);
    expect(result.size).toEqual(1);
  });
});

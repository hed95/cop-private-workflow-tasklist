import * as selectors from './selectors';
import Immutable from 'immutable';

const { Map } = Immutable;

describe('reports selector', () => {
  const state = {
    'reports-page': new Map({
      reports: Immutable.fromJS([{
        report: 'report',
      }]),
      loadingReports: true,
    }),
  };
  it('can get loadingReports', () => {
    const result = selectors.loadingReports(state);
    expect(result).toEqual(true);
  });
  it('can get reports', () => {
    const result = selectors.reports(state);
    expect(result.size).toEqual(1);
  });
});

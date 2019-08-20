import { initialState } from './reducer';
import reducer from './reducer';
import * as actions from './actions';

describe('reports reducer', () => {
  const initialStateToTest = initialState;
  it('can handle loadingReports', () => {
    const result = reducer(initialStateToTest, actions.fetchReportsList());
    expect(result.get('loadingReports')).toEqual(true);
  });
  it('can handle reports', () => {
    const result = reducer(initialStateToTest, actions.fetchReportsListSuccess({
      entity: [{
        name: 'reportname',
      }],
    }));
    expect(result.get('loadingReports')).toEqual(false);
    expect(result.get('reports').size).toEqual(1);
  });
});

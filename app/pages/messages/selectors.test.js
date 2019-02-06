import * as selectors from './selectors';
import Immutable from 'immutable';

const {Map, List, Set} = Immutable;
describe('Messages selector', () => {

  const state = {
    'notification-page': new Map({
      isFetching: false,
      notifications: List([Immutable.fromJS({
        'task' : {
          'id' : 'id'
        }
      })]),
      total: 1,
      nextPage: 'nextPage',
      hasMoreItems: true,
      pageSize: null,
      acknowledgingTaskIds: Set([])
    })
  };
  it('can get notifications', () => {
    const result = selectors.notifications(state);
    expect(result.size).toEqual(1);
  });
  it('can get total', () => {
    const result = selectors.total(state);
    expect(result).toEqual(1);
  });
  it('can get isFetching', () => {
    const result = selectors.isFetching(state);
    expect(result).toEqual(false);
  });
  it('can get nextPage', () => {
    const result = selectors.nextPage(state);
    expect(result).toEqual('nextPage');
  });
  it('can get hasMoreItems', () => {
    const result = selectors.hasMoreItems(state);
    expect(result).toEqual(true);
  });
  it('can get pageSize', () => {
    const result = selectors.pageSize(state);
    expect(result).toBeNull();
  });
  it('can get acknowledgingTaskIds', () => {
    const result = selectors.acknowledgingTaskIds(state);
    expect(result.size).toEqual(0);
  });
});

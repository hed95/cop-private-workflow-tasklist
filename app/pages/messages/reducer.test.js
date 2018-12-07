import reducer from './reducer';
import {initialState} from './reducer';
import * as actions from './actions';
import Immutable from "immutable";

const {Map, List, Set} = Immutable;

describe('Messages reducer', () => {
  const initialStateToTest = initialState;
  it('handles clear notifications', () => {
    const expected = reducer(initialStateToTest, actions.clearNotifications());
    expect(expected).toEqual(new Map({
      isFetching: false,
      notifications: List([]),
      total: 0,
      nextPage: null,
      hasMoreItems: false,
      pageSize: null,
      acknowledgingTaskIds: Set([])
    }))
  });
  it ('handles fetchNotifications', () => {
    const expected = reducer(initialStateToTest, actions.fetchNotifications());
    expect(expected.get('isFetching')).toEqual(true);
  });
  it('handles fetchNotificationsSuccess', () => {
    const expected = reducer(initialStateToTest, actions.fetchNotificationsSuccess({
      entity: {
        page: {
          totalElements: 1,
          size: 1
        },
        _links: {
          next: {
            href: 'next'
          },
          previous: {
            href: 'previous'
          }
        },
        _embedded: {
          tasks: [
            {
              id: 'id',
              name: 'name'
            }
          ]
        }
      }
    }));
    expect(expected.get('notifications').size).toEqual(1);
    expect(expected.get('isFetching')).toEqual(false);
    expect(expected.get('pageSize')).toEqual(1);
    expect(expected.get('nextPage')).toEqual('next');
    expect(expected.get('hasMoreItems')).toEqual(true);
  })
});

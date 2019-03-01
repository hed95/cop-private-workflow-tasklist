import reducer, { initialState } from './reducer';
import * as actions from './actions';
import Immutable from 'immutable';

const { Map } = Immutable;

describe('Tasks reducer', () => {
  it('fetches tasks assigned to you', () => {
    const expected = reducer(initialState, actions.fetchTasksAssignedToYou('sort=due,desc', 'ABC', false));
    expect(expected.getIn(['yourTasks', 'isFetchingTasksAssignedToYou']))
      .toEqual(true);
    expect(expected.getIn(['yourTasks', 'yourTasksFilterValue']))
      .toEqual('ABC');
    expect(expected.getIn(['yourTasks', 'yourTasksSortValue']))
      .toEqual('sort=due,desc');
  });
  it('successfully fetches tasks assigned to you', () => {
    const expected = reducer(initialState, actions.fetchTasksAssignedToYouSuccess({
      entity: {
        page: {
          totalElements: 1,
          size: 1
        }, _links: {
          next: {
            href: 'next'
          },
          previous: {
            href: 'previous'
          }
        }, _embedded: {
          tasks: [
            {
              id: 'id',
              name: 'name'
            }
          ]
        }
      }
    }));
    expect(expected.getIn(['yourTasks', 'isFetchingTasksAssignedToYou']))
      .toEqual(false);
    expect(expected.getIn(['yourTasks', 'total']))
      .toEqual(1);
    expect(expected.getIn(['yourTasks', 'tasks']).size)
      .toEqual(1);
    expect(expected.getIn(['yourTasks', 'yourTasksFilterValue']))
      .toBeNull();
    expect(expected.getIn(['yourTasks', 'yourTasksSortValue']))
      .toEqual('sort=due,desc');

  });
  it('returns isFetchingTasksAssignedToYou false if failed', () => {
    const expected = reducer(initialState, actions.fetchTasksAssignedToYouFailure());
    expect(expected.getIn(['yourTasks', 'isFetchingTasksAssignedToYou']))
      .toEqual(false);
  });
  it('updates your group tasks on unclaim success', () => {

    const state = Immutable.Map({
      yourGroupTasks: new Map({
        isFetchingYourGroupTasks: false,
        tasks: Immutable.fromJS([
          {
            task: {
              id: 'taskIdX',
              assignee: 'someoneB'
            }
          },
          {
            task: {
              id: 'taskId',
              assignee: 'someoneA'
            }
          },
          {
            task: {
              id: 'taskId2',
              assignee: 'someone'
            }
          }
        ]),
        total: 0,
        yourGroupTasksSortValue: 'sort=due,desc',
        yourGroupTasksFilterValue: null
      })
    });

    const expected = reducer(state, actions.handleUnclaim("taskId"));

    expect(expected.getIn(['yourGroupTasks', 'tasks']).get(0).getIn(['task', 'assignee'])).toEqual("someoneB");
    expect(expected.getIn(['yourGroupTasks', 'tasks']).get(1).getIn(['task', 'assignee'])).toBeNull();
    expect(expected.getIn(['yourGroupTasks', 'tasks']).get(2).getIn(['task', 'assignee'])).toEqual("someone");

  });
});

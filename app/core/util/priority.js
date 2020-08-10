import TaskPriorityConstants from '../../common/TaskPriorityConstants'

export const priority = priority => {
  let result = null;

  if (priority <= 50) { result = TaskPriorityConstants.LOW_PRIORITY }
  else if (priority > 50 && priority < 150) { result = TaskPriorityConstants.MEDIUM_PRIORITY }
  else if (priority >= 150) { result = TaskPriorityConstants.HIGH_PRIORITY }
  else { result = TaskPriorityConstants.HIGH_PRIORITY }
  return result;
};

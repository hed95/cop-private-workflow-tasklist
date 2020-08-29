import AppConstants from '../../common/AppConstants';

export default priority => {
  let result = AppConstants.MEDIUM_PRIORITY_LABEL;
  if (priority <= AppConstants.LOW_PRIORITY_UPPER_LIMIT) {
    result = AppConstants.LOW_PRIORITY_LABEL;
  } else if (
    priority > AppConstants.LOW_PRIORITY_UPPER_LIMIT &&
    priority < AppConstants.HIGH_PRIORITY_LOWER_LIMIT
  ) {
    result = AppConstants.MEDIUM_PRIORITY_LABEL;
  } else if (priority >= AppConstants.HIGH_PRIORITY_LOWER_LIMIT) {
    result = AppConstants.HIGH_PRIORITY_LABEL;
  }
  return result;
};

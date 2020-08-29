/* eslint-disable import/prefer-default-export */
import AppConstants from '../../common/AppConstants';

export const priority = p => {
  const high = AppConstants.HIGH_PRIORITY_LABEL;
  const medium = AppConstants.MEDIUM_PRIORITY_LABEL;
  const low = AppConstants.LOW_PRIORITY_LABEL;
  const valueHigh = AppConstants.HIGH_PRIORITY_LOWER_LIMIT;
  const valueLow = AppConstants.LOW_PRIORITY_UPPER_LIMIT;
  let result = null;

  if (p <= valueLow) {
    result = low;
  } else if (p > valueLow && p < valueHigh) {
    result = medium;
  } else if (p >= valueHigh) {
    result = high;
  } else {
    result = medium;
  }

  return result;
};

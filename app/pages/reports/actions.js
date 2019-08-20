import * as types from './actionTypes';

const fetchReportsList = () => ({
  type: types.FETCH_REPORTS_LIST,
});


const fetchReportsListSuccess = payload => ({
  type: types.FETCH_REPORTS_LIST_SUCCESS,
  payload,
});

const fetchReportsListFailure = () => ({
  type: types.FETCH_REPORTS_LIST_FAILURE,
});


export {
    fetchReportsList,
    fetchReportsListSuccess,
    fetchReportsListFailure,
};

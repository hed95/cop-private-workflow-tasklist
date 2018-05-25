import * as types from './actionTypes';

const fetchForm = (formName) => ({
   type : types.FETCH_FORM,
   formName
});

const fetchFormWithContext = (formName, dataContext) => ({
    type : types.FETCH_FORM_WITH_CONTEXT,
    formName,
    dataContext
});



const fetchFormSuccess = payload => ({
   type: types.FETCH_FORM_SUCCESS,
   payload
});

const fetchFormFailure = () => ({
    type: types.FETCH_FORM_FAILURE
});

const resetForm = () => ({
    type: types.RESET_FORM
});


const submit = (formId,  processKey, variableName, submissionData, processName)=> ({
    type: types.SUBMIT,
    formId,
    processKey,
    variableName,
    submissionData,
    processName
});

const submitSuccess = (payload) => ({
    type: types.SUBMIT_SUCCESS,
    payload
});

const submitFailure = () => ({
    type: types.SUBMIT_FAILURE
});

const submitToWorkflow = (processKey, variableName, data, processName) => ({
    type: types.SUBMIT_TO_WORKFLOW,
    processKey,
    variableName,
    data,
    processName
});

const submitToWorkflowSuccess = (payload) => ({
    type: types.SUBMIT_TO_WORKFLOW_SUCCESS,
    payload
});

const submitToWorkflowFailure = () => ({
    type: types.SUBMIT_TO_WORKFLOW_FAILURE
});


export {
    fetchForm,
    fetchFormWithContext,
    fetchFormSuccess,
    fetchFormFailure,
    submit,
    submitSuccess,
    submitFailure,
    submitToWorkflow,
    submitToWorkflowSuccess,
    submitToWorkflowFailure,
    resetForm
}
import * as React from "react";
import {PropTypes} from "react";
import StartForm from "../../../core/start-forms/components/StartForm";
import {errorMessage, hasError, isFetchingProcessDefinition, processDefinition} from "../selectors";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import queryString from 'query-string';
import {submissionToWorkflowSuccessful, submittingToWorkflow} from "../../../core/start-forms/selectors";
import Spinner from 'react-spinkit';

class ProcessStartPage extends React.Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.props.fetchProcessDefinition(params.processKey);
    }

    componentWillUnmount() {
        this.props.reset();
    }


    render() {
        const {isFetchingProcessDefinition, processDefinition, submissionToWorkflowSuccessful, submittingToWorkflow} = this.props;
        return <div className="grid-row">
            {submittingToWorkflow ?
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                    name="three-bounce" color="#005ea5"/></div> : <div></div>
            }

            {
                !submittingToWorkflow && submissionToWorkflowSuccessful ? <div className="govuk-box-highlight confirm-page new">
                    <span className="hod-checkmark"/>
                    <h2 className="heading-small">
                        {processDefinition.getIn(['process-definition', 'name'])} successfully started
                    </h2>
                </div> : <div/>
            }
            <div className="column-full">
                <fieldset>
                    {isFetchingProcessDefinition ? <div>Loading form...</div> : <div>
                        {processDefinition ? <div>
                            <legend>
                                <h3 className="heading-medium">{processDefinition.getIn(['process-definition', 'name'])}</h3>
                            </legend>

                            <StartForm formName={processDefinition.get('formKey')}
                                       processKey={processDefinition.getIn(['process-definition', 'key'])}
                                       {...this.props}/>
                        </div> : <div>
                            No process definition found
                        </div>}

                    </div>
                    }

                </fieldset>
            </div>
        </div>
    };

}

ProcessStartPage.propTypes = {
    fetchProcessDefinition: PropTypes.func.isRequired,
    processDefinition: ImmutablePropTypes.map,
    isFetchingProcessDefinition: PropTypes.bool,
    submittingToWorkflow: PropTypes.bool,
    submissionToWorkflowSuccessful: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    processDefinition: processDefinition,
    isFetchingProcessDefinition: isFetchingProcessDefinition,
    submittingToWorkflow: submittingToWorkflow,
    submissionToWorkflowSuccessful: submissionToWorkflowSuccessful,

});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessStartPage));

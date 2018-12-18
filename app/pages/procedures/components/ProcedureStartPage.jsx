import * as React from "react";
import PropTypes from 'prop-types';
import StartForm from "../../../core/start-forms/components/StartForm";
import {isFetchingProcessDefinition, processDefinition} from "../selectors";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import ImmutablePropTypes from "react-immutable-proptypes";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import queryString from 'query-string';
import {submissionToWorkflowSuccessful, submittingToWorkflow} from "../../../core/start-forms/selectors";
import Spinner from 'react-spinkit';
import { DataSpinner } from '../../../core/components/DataSpinner';

class ProcessStartPage extends React.Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.props.fetchProcessDefinition(params.processKey);
    }

    componentWillUnmount() {
        this.props.reset();
    }


    render() {
        const {isFetchingProcessDefinition, processDefinition, submittingToWorkflow} = this.props;
        const pointerStyle = {cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline'};
        return <div>
            <div style={pointerStyle} onClick={(event) => this.props.history.replace('/procedures')}>Back to
                procedures
            </div>
            <div className="grid-row">
                {submittingToWorkflow ?
                    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><DataSpinner
                       message="Starting procedure..."/></div> : <div/>
                }
                <div className="column-full">
                    <fieldset>
                        {isFetchingProcessDefinition ? <div>Loading form...</div> : <div>
                            {processDefinition ? <div>

                                <h2 className="heading-large">
                    <span
                        className="heading-secondary">Operational procedure</span> {processDefinition.getIn(['process-definition', 'name'])}
                                </h2>


                                <StartForm formName={processDefinition.get('formKey')}
                                           processKey={processDefinition.getIn(['process-definition', 'key'])}
                                           processName={processDefinition.getIn(['process-definition', 'name'])}
                                           {...this.props}/>
                            </div> : <div>
                                No process definition found
                            </div>}

                        </div>
                        }

                    </fieldset>
                </div>
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

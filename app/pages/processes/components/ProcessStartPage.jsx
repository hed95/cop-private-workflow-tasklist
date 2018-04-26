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

class ProcessStartPage extends React.Component {

    componentDidMount() {
        // this.props.fetchProcessDefinition("search-of-a-person");
    }

    render() {
        // const {processDefinition} = this.props;
        // const processKey = processDefinition.getIn(['process-definition', 'key']);
        // const formKey = processDefinition.get('formKey');

        return <div className="grid-row">
            <div className="column-full">
                <fieldset>
                    {false ? <div>Loading form...</div> : <div>
                        <legend>
                            <h3 className="heading-medium">Search Of A Person</h3>
                        </legend>
                        <StartForm formName={"searchOfPerson"} processKey={""} {...this.props}
                                   formDataContext={null}/>
                    </div>
                    }
                </fieldset>
            </div>

        </div>
    };

}

ProcessStartPage.propTypes = {
    fetchProcessDefinition: PropTypes.func.isRequired,
    isFetchingProcessDefinition: PropTypes.bool,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    processDefinition: processDefinition,
    isFetchingProcessDefinition: isFetchingProcessDefinition,
    hasError: hasError,
    errorMessage: errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProcessStartPage));

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

class ProcessStartPage extends React.Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.props.fetchProcessDefinition(params.processKey);
    }

    render() {
        const {isFetchingProcessDefinition, processDefinition} = this.props;
        return <div className="grid-row">
            <div className="column-full">
                <fieldset>
                    {isFetchingProcessDefinition ? <div>Loading form...</div> : <div>
                        <legend>
                            <h3 className="heading-medium">{this.props.processDefinition.getIn(['process-definition', 'name'])}</h3>
                        </legend>

                        <StartForm formName={processDefinition.get('formKey')} processKey={processDefinition.getIn(['process-definition', 'key'])} {...this.props}
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
    processDefinition: ImmutablePropTypes.map.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessStartPage));

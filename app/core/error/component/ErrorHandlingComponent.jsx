import React, {PropTypes} from "react";
import {errors, hasError} from "../selectors";
import * as actions from "../actions";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";
const uuidv4 = require('uuid/v4');

class ErrorHandlingComponent extends React.Component {

    render() {
        const {hasError, errors} = this.props;
        const items = errors.map((err) => {
            return <li key={uuidv4()}>{err.get('url')} - [{err.get('status')} {err.get('error')}] - {err.get('message')}</li>
        });
        return <div> {hasError ?
            <div className="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1"
                 tabIndex="-1">
                <h2 className="heading-medium error-summary-heading" id="error-summary-heading-example-1">
                   The following errors occurred:
                </h2>
                <ul className="error-summary-list">
                    {items}
                </ul>

            </div> : <div/>}

            {this.props.children}

        </div>
    }
}

ErrorHandlingComponent.propTypes = {
    hasError: PropTypes.bool,
    errors: ImmutablePropTypes.list
};

const mapStateToProps = createStructuredSelector({
    hasError: hasError,
    errors: errors
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandlingComponent);
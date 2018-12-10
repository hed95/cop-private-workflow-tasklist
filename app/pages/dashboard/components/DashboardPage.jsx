import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import DashboardTitle from "./DashboardTitle";
import DashboardPanel from "./DashboardPanel";
import {bindActionCreators} from "redux";
import * as actions from "../../../core/shift/actions";
import connect from "react-redux/es/connect/connect";
import {
    hasActiveShift, isFetchingShift, shift
} from "../../../core/shift/selectors";
import {errors, hasError} from "../../../core/error/selectors";
import ErrorPanel from "../../../core/error/component/ErrorPanel";
import {DataSpinner} from "../../../core/components/DataSpinner";
import * as errorActions from "../../../core/error/actions";

class DashboardPage extends React.Component {

    componentDidMount() {
        this.props.resetErrors();
        this.props.fetchActiveShift();
    }

    render() {
        const {hasActiveShift, isFetchingShift} = this.props;

        const headerToDisplay = !isFetchingShift && !hasActiveShift ?
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
                <div className="notice">
                    <i className="icon icon-important">
                        <span className="visually-hidden">Warning</span>
                    </i>
                    <strong className="bold-medium">
                        Please start your shift before proceeding
                    </strong>
                </div>
            </div> : (isFetchingShift ? <div style={{paddingTop: '15px'}}>
                <div>
                    <strong className="bold loading">
                        Checking if you have an active shift
                    </strong>
                </div>
            </div> : <div/>);


        if (isFetchingShift) {
            return <DataSpinner message="Checking if you have an active shift"/>;
        } else {
            return <div>
                {headerToDisplay}
                <ErrorPanel {...this.props} />
                <DashboardTitle hasActiveShift={hasActiveShift} />
                <DashboardPanel hasActiveShift={hasActiveShift} shift={this.props.shift}/>
            </div>
        }


    }
}

DashboardPage.propTypes = {
    fetchActiveShift: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, actions, errorActions), dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        hasActiveShift: hasActiveShift(state),
        hasError: hasError(state),
        errors: errors(state),
        isFetchingShift: isFetchingShift(state),
        shift: shift(state)
    }
}, mapDispatchToProps)(DashboardPage))

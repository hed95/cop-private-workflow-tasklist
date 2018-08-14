import React, {PropTypes} from 'react';
import {withRouter} from "react-router";
import DashboardTitle from "./DashboardTitle";
import DashboardPanel from "./DashboardPanel";
import ImmutablePropTypes from "react-immutable-proptypes";
import {bindActionCreators} from "redux";
import * as actions from "../../../core/shift/actions";
import connect from "react-redux/es/connect/connect";
import {
    activeShiftSuccess,
    hasActiveShift,
    isFetchingShift, isFetchingStaffDetails, loadingShiftForm, shift, shiftForm, staffDetails,
    submittingActiveShift
} from "../../../core/shift/selectors";
import {errors, hasError} from "../../../core/error/selectors";

class DashboardPage extends React.Component {

    componentDidMount() {
        this.props.fetchActiveShift();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasActiveShift !== this.props.hasActiveShift) {
            window.location.reload();
        }
    }

    render() {
        const {hasActiveShift, isFetchingShift} = this.props;

        const headerToDisplay = !isFetchingShift && !hasActiveShift ?
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
                <div className="notice">
                    <i className="icon icon-important">
                        <span className="visually-hidden">Warning</span>
                    </i>
                    <strong className="bold-small">
                        Please start your shift before proceeding
                    </strong>
                </div>
            </div> : <div/>;

        return <div>
            {headerToDisplay}
            <DashboardTitle hasActiveShift = {hasActiveShift} />
            <DashboardPanel hasActiveShift={hasActiveShift}/>
        </div>

    }
}
DashboardPage.propTypes = {
    fetchActiveShift: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        hasActiveShift: hasActiveShift(state)
    }
}, mapDispatchToProps)(DashboardPage))
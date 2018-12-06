import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isFetchingShift, hasActiveShift} from './selectors';
import * as actions from "./actions";
import {createStructuredSelector} from "reselect";
import {Redirect, Route, withRouter} from "react-router";
import ErrorHandlingComponent from "../error/component/ErrorHandlingComponent";
import * as errorActions from "../error/actions";
import {DataSpinner} from "../components/DataSpinner";

const uuidv4 = require('uuid/v4');

class ShiftScopedRoute extends React.Component {

    componentWillMount() {
        this.props.resetErrors();
        if (!this.props.location.state || !this.props.location.state.shiftPresent) {
            this.props.fetchActiveShift();
        } else {
            if (this.props.location.state.shiftPresent) {
                console.log('User has shift defined');
                this.props.setHasActiveShift();
            }
        }
    }

    render() {
        const {component: Component, hasActiveShift, isFetchingShift} = this.props;
        if (isFetchingShift) {
            return <DataSpinner message={`Checking if you have an active shift`} />
        } else {
            if (hasActiveShift) {
                return <Route render={(props) => <BackButton {...props}><ErrorHandlingComponent><Component {...props} key={uuidv4()}/></ErrorHandlingComponent></BackButton>}/>
            } else {
                return <Route render={() => <Redirect to="/dashboard"/>}/>
            }
        }

    }
}

class BackButton extends React.Component {
    render() {
        const pointerStyle = {cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline'};
        return <div>
            <div style={pointerStyle} onClick={() => this.props.history.replace('/dashboard')}>Back to dashboard</div>
            {this.props.children}
        </div>
    }
}

ShiftScopedRoute.propTypes = {
    fetchActiveShift: PropTypes.func.isRequired,
    setHasActiveShift: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    hasActiveShift: hasActiveShift,
    isFetchingShift: isFetchingShift
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, actions, errorActions), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShiftScopedRoute));

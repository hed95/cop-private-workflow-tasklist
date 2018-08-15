import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isFetchingShift, hasActiveShift} from '../../../core/shift/selectors';
import * as actions from "../../../core/shift/actions";
import {createStructuredSelector} from "reselect";
import {Redirect, Route, withRouter} from "react-router";
import ErrorHandlingComponent from "../../../core/error/component/ErrorHandlingComponent";
import * as errorActions from "../../../core/error/actions";

const uuidv4 = require('uuid/v4');

class ShiftScopedRoute extends React.Component {

    componentDidMount() {
        this.props.fetchActiveShift();
    }

    render() {
        const {component: Component, hasActiveShift, isFetchingShift} = this.props;
        this.props.resetErrors();
        if (isFetchingShift) {
            return <div style={{paddingTop: '20px'}} className="loading">Checking your shift details</div>
        } else {
            if (hasActiveShift) {
                return <Route render={(props) => <BackButton {...props}><ErrorHandlingComponent><Component {...props}
                                                                                                key={uuidv4()}/></ErrorHandlingComponent></BackButton>}/>
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
    resetErrors: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    hasActiveShift: hasActiveShift,
    isFetchingShift: isFetchingShift
});

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, actions, errorActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShiftScopedRoute);
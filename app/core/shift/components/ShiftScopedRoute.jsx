import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isFetchingShift, hasActiveShift} from '../selectors';
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {Redirect, Route} from "react-router";
import Spinner from 'react-spinkit';
import ErrorHandlingComponent from "../../error/component/ErrorHandlingComponent";

const uuidv4 = require('uuid/v4');

class ShiftScopedRoute extends React.Component {

    componentDidMount() {
        this.props.fetchActiveShift();
    }

    render() {
        const {component: Component, hasActiveShift, isFetchingShift} = this.props;
        if (isFetchingShift) {
            return <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'center'}}><Spinner
                name="three-bounce" color="#005ea5"/></div>
        } else {
            if (hasActiveShift) {
                return <Route render={(props) => <ErrorHandlingComponent><Component {...props} key={uuidv4()}/></ErrorHandlingComponent>} />
            } else {
                return <Route render={() => <Redirect to="/shift"/>}/>
            }
        }

    }
}


ShiftScopedRoute.propTypes = {
    fetchActiveShift: PropTypes.func.isRequired,
    isFetchingShift: PropTypes.bool,
    hasActiveShift: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    hasActiveShift: hasActiveShift,
    isFetchingShift: isFetchingShift
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShiftScopedRoute);
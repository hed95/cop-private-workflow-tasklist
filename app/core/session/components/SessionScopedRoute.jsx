import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isFetchingActiveSession, hasActiveSession} from '../selectors';
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {Redirect, Route} from "react-router";
import Spinner from 'react-spinkit';
import ErrorHandlingComponent from "../../error/component/ErrorHandlingComponent";
const uuidv4 = require('uuid/v4');

class SessionScopedRoute extends React.Component {

    componentDidMount() {
        this.props.fetchActiveSession();
    }

    render() {
        const {component: Component, hasActiveSession, isFetchingActiveSession} = this.props;
        if (isFetchingActiveSession) {
            return <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'center'}}><Spinner
                name="three-bounce" color="#005ea5"/></div>
        } else {
            return <Route render={(props) => <ErrorHandlingComponent >
                <Component {...props} key={uuidv4()}/>
            </ErrorHandlingComponent>}/>
        }

    }
}


SessionScopedRoute.propTypes = {
    fetchActiveSession: PropTypes.func.isRequired,
    isFetchingActiveSession: PropTypes.bool,
    hasActiveSession: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    hasActiveSession: hasActiveSession,
    isFetchingActiveSession: isFetchingActiveSession
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SessionScopedRoute);
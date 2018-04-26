import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isFetching, hasActiveSession} from '../selectors';
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {Redirect, Route} from "react-router";
import Spinner from 'react-spinkit';

class SessionScopedRoute extends React.Component {

    componentDidMount() {
        this.props.fetchActiveSession();
    }

    render() {
        const { component: Component, hasActiveSession} = this.props;
        if (this.props.isFetching) {
            return <div style={{paddingTop: '20px', display: 'flex', justifyContent: 'center'}}><Spinner name="three-bounce" color="#005ea5"/></div>
        } else {
            if (hasActiveSession) {
                return <Route render={(props) => <Component {...props }/>}/>
            } else {
                return <Route render={() => <Redirect to="/profile"/>}/>
            }
        }

    }
}


SessionScopedRoute.propTypes = {
    fetchActiveSession: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    hasActiveSession: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    hasActiveSession: hasActiveSession,
    isFetching: isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SessionScopedRoute);
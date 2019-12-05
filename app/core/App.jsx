import React, {lazy, Suspense} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import DataSpinner from '../core/components/DataSpinner';
import Main from './Main';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withLog from './error/component/withLog';
import {clearAllExceptShift} from "../common/security/SecureLocalStorage";

import config from '../config/core';

const SubmissionBanner = lazy(() => import('../core/components/SubmissionBanner'));
const { serviceDesk } = config;

export class App extends React.Component {

    componentDidMount() {
        const user = this.props.kc.tokenParsed.email;
        this.props.log([{
            level: 'info',
            user: user,
            path: this.props.location.pathname,
            message: `Route requested ${this.props.location.pathname}`
        }]);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const user = this.props.kc.tokenParsed.email;
        if (this.props.location !== prevProps.location) {
            clearAllExceptShift();
            this.props.log([{
                level: 'debug',
                user: user,
                path: this.props.location.pathname,
                message: 'cleared secure local storage'
            },
                {
                    level: 'info',
                    user: user,
                    path: this.props.location.pathname,
                    message: `Route changed from ${prevProps.location.pathname} to ${this.props.location.pathname}`
                }]);
        }
    }

    render() {
        return <React.Fragment>
            <Header/>
            <div className="govuk-width-container" style={{height: '100%'}}>
                <AppBanner {...this.props}/>
                <Suspense
                    fallback={<div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
                        <DataSpinner message="..."/></div>}>
                    <SubmissionBanner/>
                </Suspense>
                <Main/>
            </div>
            <Footer/>
        </React.Fragment>;
    }
}

const AppBanner = (props) => {
    const environment = () => {
        if (props.appConfig.uiEnvironment.toLowerCase() !== 'production') {
            return (
                <span>
                    <strong className="govuk-tag govuk-phase-banner__content__tag ">
                      {props.appConfig.uiEnvironment}
                    </strong>
                </span>
            );
        }
        return null;
    };

    return (
    <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag ">
                {props.appConfig.uiVersion}
            </strong>
            {environment()}
            <span className="govuk-phase-banner__text">
                This is a new service – your <a className="govuk-link" href={`${serviceDesk.feedback}`} target="_blank">feedback</a> will help us to improve it.
            </span>
        </p>
    </div>
    );
}


App.propTypes = {
    log: PropTypes.func,
    location: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        appConfig: state.appConfig
    };
}, mapDispatchToProps)(withLog(App)));

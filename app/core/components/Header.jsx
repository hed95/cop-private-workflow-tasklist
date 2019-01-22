import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'

import img from 'govuk_template_ejs/assets/images/gov.uk_logotype_crown_invert_trans.png?0.23.0'
import {bindActionCreators} from "redux";

class Header extends React.Component {

    componentWillMount() {
        this.dashboard = this.dashboard.bind(this);
    }

    dashboard(event) {
        event.preventDefault();
        this.props.history.push("/");
    }


    render() {
        return <div>
            <header role="banner" id="global-header" className="with-proposition">
                <div className="header-wrapper">
                    <div className="header-global">
                        <div className="header-logo">
                            <div id="logo" className="content" style={{textDecoration: 'none', pointerEvents: 'none'}}>
                                <img src={img} width="36" height="32" alt="UK Border Force Logo"/> UK Border Force
                            </div>
                        </div>
                    </div>
                    <div className="header-proposition">
                        <div className="content">
                            <div className="grid-row" style={{paddingTop: '10px'}}>
                                <div className="column-full">
                                    <a href="#" onClick={(event) => this.dashboard(event)} id="proposition-name">Operational
                                        Activities</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
            <div id="global-header-bar"/>
            <div className="phase-banner container">
                <p>
                    <strong className="phase-tag">{this.props.appConfig.uiVersion}</strong>
                    <strong className="phase-tag">{this.props.appConfig.uiEnvironment}</strong>
                </p>
            </div>
            <LoadingBar
                updateTime={100}
                maxProgress={100}
                progressIncrease={4}
                scope="header"
                className="loading-bar"
            />
        </div>
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        appConfig: state.appConfig
    }
}, mapDispatchToProps)(Header))

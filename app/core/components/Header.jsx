import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import img from 'govuk_template_ejs/assets/images/gov.uk_logotype_crown_invert_trans.png?0.23.0'


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           routerPath: this.props.location.pathname
        }
    }
    componentWillMount() {
        this.changeRoute = this.changeRoute.bind(this);
    }

    changeRoute(path) {
        this.setState({routerPath: path});
        this.props.history.replace(path);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({routerPath: nextProps.location.pathname});
        }
    }

    logout(event) {
        event.preventDefault();
        this.props.kc.logout();
    }

    render() {
        const kc = this.props.kc;
        const routerPath = this.state.routerPath;
        return <div>
            <header role="banner" id="global-header" className="with-proposition">
                <div className="header-wrapper">
                    <div className="header-global">
                        <div className="header-logo">
                            <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo"
                               className="content">
                                <img src={img} width="36" height="32" alt=""/> UK Border Force
                            </a>
                        </div>
                    </div>
                    <div className="header-proposition">
                        <div className="content">
                            <a href="#proposition-links" className="js-header-toggle menu">Menu</a>
                            <nav id="proposition-menu">
                                <a href="/" id="proposition-name">Operational Activities</a>
                                <ul id="proposition-links">
                                    <li style={{ cursor: 'pointer'}}><a onClick={() => this.changeRoute('/tasks')} className={routerPath === '/tasks' ? 'active' : ''}>Tasks</a></li>
                                    <li style={{ cursor: 'pointer'}}><a onClick={() => this.changeRoute('/processes')} className={routerPath === '/processes' ? 'active' : ''}>Processes</a></li>
                                    <li style={{ cursor: 'pointer'}}><a onClick={() => this.changeRoute('/reports')} className={routerPath === '/reports' ? 'active' : ''}>Reports</a></li>
                                    <li style={{ cursor: 'pointer'}}><a onClick={() => this.changeRoute('/notifications')} className={routerPath === '/notifications' ? 'active' : ''}>Notifications</a></li>
                                    <li style={{ cursor: 'pointer'}}><a onClick={this.logout.bind(this)}>Logout {kc.tokenParsed.name}</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </header>
            <div id="global-header-bar"/>

        </div>
    }
}

export default connect((state) => {
    return {
        kc: state.keycloak
    }
}, {})(withRouter(Header))
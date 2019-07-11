import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import secureLocalStorage from '../../common/security/SecureLocalStorage';

class Header extends React.Component {

  componentWillMount() {
    this.secureLocalStorage = secureLocalStorage;
    this.logout = this.logout.bind(this);
    this.dashboard = this.dashboard.bind(this);
  }

  dashboard(event) {
    event.preventDefault();
    this.props.history.push('/');
  }

  logout(event) {
    this.secureLocalStorage.removeAll();
    event.preventDefault();
    this.props.kc.logout();
  }

  render() {
    return (<div>
      <header className="govuk-header " role="banner" data-module="header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__content" style={{ width: '100%' }}>
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <a
                  href="#"
                  onClick={event => this.dashboard(event)}
                  className="govuk-header__link govuk-header__link--service-name"
                >Central Operations Platform</a>
              </div>
              <div className="govuk-grid-column-one-third header-nav">
                <a
                  id="support"
                  href="https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal/3"
                  className="govuk-header__link header-nav__link"
                >Support</a>
                <a
                  id="logout"
                  href="#"
                  onClick={this.logout}
                  className="govuk-header__link header-nav__link"
                >Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(state => ({
  kc: state.keycloak,
  appConfig: state.appConfig,
}), mapDispatchToProps)(Header));

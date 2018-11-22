import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './core/App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import configureStore from './core/store/configureStore';
import Keycloak from "keycloak-js";
import 'webpack-icons-installer/bootstrap';
import '../public/styles/app.scss'
import '../public/styles/fonts.css'
import 'rxjs';
import ScrollToTop from "./core/components/ScrollToTop";
import Header from './core/components/Header';
import Footer from './core/components/Footer';
import UnauthorizedPage from './core/components/UnauthorizedPage';
const store = configureStore();
let kc = null;

const THREE_MINUTES = 3 * 60000;

const renderApp = (App, authorizedRole) => {
    kc.onTokenExpired = () => {
        kc.updateToken().success((refreshed) => {
            if (refreshed) {
                store.getState().keycloak = kc;
            }
        }).error(function () {
            kc.logout();
        });
    };
    kc.init({onLoad: 'login-required', checkLoginIframe: false}).success(authenticated => {
        if (authenticated) {
          store.getState().keycloak = kc;
          const hasPlatformRoleAccess = kc.realmAccess.roles.includes(authorizedRole);
          let rootDocument = document.getElementById('root');
          if (hasPlatformRoleAccess) {
            history.pushState(null, null, location.href);
            window.onpopstate = () => {
              history.go(1);
            };
            setInterval(() => {
              kc.updateToken().success((refreshed) => {
                if (refreshed) {
                  store.getState().keycloak = kc;
                }
              }).error(function () {
                kc.logout();
              })
            }, THREE_MINUTES);
            ReactDOM.render(
              <Provider store={store}>
                <div>
                  <AppContainer>
                    <BrowserRouter>
                      <ScrollToTop>
                        <App/>
                      </ScrollToTop>
                    </BrowserRouter>
                  </AppContainer>
                </div>
              </Provider>,
              rootDocument
            );
          } else {
            ReactDOM.render(
              <Provider store={store}>
                <div>
                  <AppContainer>
                    <BrowserRouter>
                      <div>
                        <Header/>
                        <div className="container" style={{height:'100vh'}}>
                            <UnauthorizedPage />
                        </div>
                        <Footer/>
                      </div>
                    </BrowserRouter>
                  </AppContainer>
                </div>
              </Provider>,
              rootDocument
            );
          }
        }
    })
};

if (process.env.NODE_ENV === 'production') {
    fetch('/api/config')
        .then((response) => {
            return response.json()
        }).then((data) => {
        kc = Keycloak({
            "realm": data.REALM,
            "url": data.AUTH_URL,
            "clientId": data.CLIENT_ID
        });
        store.getState().appConfig = {
            "uiVersion": data.UI_VERSION,
            "uiEnvironment": data.UI_ENVIRONMENT
        };
        renderApp(App, data.AUTH_ACCESS_ROLE);
    })
} else {
    const authAccessRole = process.env.AUTH_ACCESS_ROLE;
    kc = Keycloak({
        "realm": process.env.REALM,
        "url": process.env.AUTH_URL,
        "clientId": process.env.CLIENT_ID
    });
    store.getState().appConfig = {
        "uiVersion": process.env.UI_VERSION || "ALPHA",
        "uiEnvironment": process.env.UI_ENVIRONMENT || 'LOCAL'
    };
    renderApp(App, authAccessRole);

}
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./core/App', () => {
        const NextApp = require('./core/App').default;
        render(NextApp)
    })
}

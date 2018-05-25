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

const store = configureStore();
let kc = null;

const renderApp = (App) => {
    kc.init({onLoad: 'login-required'}).success(authenticated => {
        if (authenticated) {
            store.getState().keycloak = kc;
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
                document.getElementById('root')
            );
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
        renderApp(App);
    })
} else {
    kc = Keycloak({
        "realm": process.env.REALM,
        "url": process.env.AUTH_URL,
        "clientId": process.env.CLIENT_ID
    });
    renderApp(App);

}
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./core/App', () => {
        const NextApp = require('./core/App').default;
        render(NextApp)
    })
}
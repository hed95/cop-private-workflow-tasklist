import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './core/App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import configureStore from './core/store/configureStore';
import Keycloak from "keycloak-js";

import '../public/styles/app.scss'
import '../public/styles/fonts.css'

const store = configureStore();

const kc = Keycloak({
    "realm" : process.env.REALM,
    "url": process.env.AUTH_URL,
    "clientId": process.env.CLIENT_ID
});

const renderApp = (App) => {
    kc.init({onLoad: 'login-required'}).success(authenticated => {
        if (authenticated) {
            store.getState().keycloak = kc;
            ReactDOM.render(
                <Provider store={store}>
                    <div>
                        <AppContainer>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </AppContainer>
                    </div>
                </Provider>,
                document.getElementById('root')
            );
        }
    })
};

renderApp(App);

// Hot Module Replacement API
if(module.hot) {
    module.hot.accept('./core/App', () => {
        const NextApp = require('./core/App').default;
        render(NextApp)
    })
}
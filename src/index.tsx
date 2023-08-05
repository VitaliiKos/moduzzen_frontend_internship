import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";

import reportWebVitals from './reportWebVitals';
import {App} from './App';
import {mainStore} from "./Store";
import {REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN} from './env';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const store = mainStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Auth0Provider
                domain={REACT_APP_AUTH0_DOMAIN}
                clientId={REACT_APP_AUTH0_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                <App/>
            </Auth0Provider>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();

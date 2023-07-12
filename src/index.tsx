import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { App } from './App';

// import App from './App';
import reportWebVitals from './reportWebVitals';
import {mainStore} from "./Store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const store = mainStore();

root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
);

reportWebVitals();

import React from 'react';
import {Provider} from 'react-redux';
import App from './app/App';
import store from './app/configureStore'
import {createRoot} from "react-dom/client";
import {ShopifySocketProvider} from "_src/socket/SocketContext";
import {BrowserRouter} from "react-router";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ShopifySocketProvider>
                    <App/>
                </ShopifySocketProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

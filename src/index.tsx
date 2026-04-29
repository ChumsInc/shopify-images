import React from 'react';
import {Provider} from 'react-redux';
import App from './app/App';
import store from './app/configureStore'
import {createRoot} from "react-dom/client";
import {ShopifySocketProvider} from "@/socket/ShopifySocketProvider.tsx";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ShopifySocketProvider>
                <App/>
            </ShopifySocketProvider>
        </Provider>
    </React.StrictMode>
);

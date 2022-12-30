import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Layout/App';
import 'semantic-ui-css/semantic.min.css';
import './style.scss'
import {StoreContext, store} from './Stores/Store';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Routes';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
);


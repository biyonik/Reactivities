import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Layout/App';
import 'semantic-ui-css/semantic.min.css';
import './style.scss'
import {StoreContext, store} from './Stores/Store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StoreContext.Provider value={store}>
        <App/>
    </StoreContext.Provider>
);


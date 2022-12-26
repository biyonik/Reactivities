import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Layout/App';
import 'semantic-ui-css/semantic.min.css';
import './style.scss'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);


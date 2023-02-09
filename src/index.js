import React from 'react';
import { render } from "react-dom";              
import "bulma/css/bulma.css";
import App from './app';
import ReactDOM from 'react-dom/client'
import "./app.css"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  document.getElementById('root')
);
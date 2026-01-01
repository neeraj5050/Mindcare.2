import React from 'react';
import ReactDOM from 'react-dom/client';  // or 'react-dom' if older version
import './index.css';  // optional
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';                 // fixed typo
import App from './App';              // relative to src
import reportWebVitals from './reportWebVitals'; // relative to src

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

 

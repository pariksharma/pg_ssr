import React from 'react';
import './index.css';
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
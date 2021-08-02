import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';
import reportWebVitals from './reportWebVitals';
import './components/utils/icons';
import './styles/reset.css';
import './styles/colors.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

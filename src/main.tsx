import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import './styles.css';
import App from './App';

// تضمین جهت راست‌به‌چپ حتی وقتی صفحه داخل قالب دیگری بارگذاری شود
document.documentElement.lang = 'fa';
document.documentElement.dir = 'rtl';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

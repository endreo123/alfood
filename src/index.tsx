import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

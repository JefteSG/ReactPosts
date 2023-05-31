import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global-styles.css';

import { Home } from './templates/home';

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Login from './pages/Cadastro/Login.jsx';
import Menu from './pages/Menu/Menu.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Login from "./pages/Cadastro/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import Postagem from "./pages/Postagem/Postagem.jsx";
import CreateGroup from "./pages/CreateGroup/CreateGroup.jsx";
import JoinGroup from "./pages/JoinGroup/JoinGroup.jsx";
import ChatGroup from "./pages/ChatGroup/ChatGroup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/postagem" element={<Postagem />} />
        <Route path="/criarGrupo" element={<CreateGroup />} />
        <Route path="/entrarGrupo" element={<JoinGroup />} />
        <Route path="/chatGroup" element={<ChatGroup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

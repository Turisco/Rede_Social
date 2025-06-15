import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";

function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/cadastro/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        navigate("/home");
      } else {
        alert("Login inválido");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          className="cadastro-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="cadastro-input"
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <button className="cadastro-button" type="submit">
          Entrar
        </button>

        <button
          type="button"
          className="cadastro-link"
          onClick={() => navigate("/")}
        >
          Não tem conta? Cadastre-se
        </button>
      </form>
    </div>
  );
}

export default Login;

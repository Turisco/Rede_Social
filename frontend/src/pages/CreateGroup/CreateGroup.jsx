import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../global.css";

export default function CreateGroup() {
  const [form, setForm] = useState({ nome: "", descricao: "" });
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) setUsuario(JSON.parse(dados));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario?.id) {
      alert("Erro: usuário não encontrado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/grupo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          descricao: form.descricao,
          administrador_id: usuario.id,
        }),
      });

      if (response.ok) {
        navigate("/perfil");
      } else {
        const erro = await response.json();
        alert(erro.mensagem || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de rede. Verifique sua conexão.");
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setForm({ nome: "", descricao: "" });
  };

  const toggleRouterBack = () => {
    navigate("/perfil");
  };

  return (
    <section className="section-create-group">
      <div className="section-create-data">
        <form onSubmit={handleSubmit}>
          <div className="section-perfil-back">
            <ChevronLeft
              size={45}
              cursor="pointer"
              onClick={toggleRouterBack}
            />
          </div>
          <div className="section-box-data">
            <div className="section-box-input">
              <label>Nome do grupo</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                className="input-createGroup"
                onChange={handleChange}
                required
              />
            </div>
            <div className="section-box-input">
              <label>Descrição do grupo</label>
              <input
                type="text"
                name="descricao"
                value={form.descricao}
                className="input-createGroup"
                onChange={handleChange}
                required
              />
            </div>
            <div className="section-group-button">
              <button className="button-clear-field" onClick={handleClear}>
                Limpar campos
              </button>
              <button type="submit" className="button-create-group">
                Criar grupo
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

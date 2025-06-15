import { useEffect, useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function JoinGroup() {
  const [grupos, setGrupos] = useState([]);
  const [usuariosPorGrupo, setUsuariosPorGrupo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch("http://localhost:3001/grupos/getGroups")
      .then((res) => res.json())
      .then(async (data) => {
        setGrupos(data);
        setLoading(false);
  
        const usuariosMap = {};
        for (const grupo of data) {
          try {
            const res = await fetch(
              `http://localhost:3001/grupos/usuarios/${grupo.id}`
            );
            const usuarios = await res.json();
            usuariosMap[grupo.id] = usuarios.map((u) => u.nome);
          } catch (err) {
            console.error(`Erro ao buscar usuários do grupo ${grupo.id}`, err);
            usuariosMap[grupo.id] = [];
          }
        }
        setUsuariosPorGrupo(usuariosMap);
      })
      .catch((err) => {
        console.error("Erro ao carregar grupos:", err);
        setLoading(false);
      });
  }, []);
  

  const entrarNoGrupo = async (grupo_id) => {
    try {
      const response = await fetch("http://localhost:3001/grupos/joinGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario.id,
          grupo_id: grupo_id,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Você entrou no grupo com sucesso!");
        navigate("/perfil");
  
        const res = await fetch(`http://localhost:3001/grupos/usuarios/${grupo_id}`);
        const usuarios = await res.json();
        setUsuariosPorGrupo((prev) => ({
          ...prev,
          [grupo_id]: usuarios.map((u) => u.nome),
        }));
      } else {
        alert(data.mensagem || "Erro ao entrar no grupo");
      }
    } catch (error) {
      alert("Erro na conexão");
      console.error(error);
    }
  };

  if (loading) return <p>Carregando grupos...</p>;

  return (
    <section className="section-joinGroup">
      <div className="section-perfil-back">
        <ChevronLeft
          size={45}
          cursor="pointer"
          onClick={() => navigate("/perfil")}
        />
      </div>

      {grupos.map((grupo) => (
        <div key={grupo.id} className="section-box-joinGroup">
          <div className="section-box-joinGroup-data">
            <h3>{grupo.nome}</h3>
            <p>{grupo.descricao}</p>
            <small>
              Criado em: {new Date(grupo.data_criacao).toLocaleDateString()}
            </small>
            <p>
              <strong>Administrador:</strong> {grupo.administrador_nome}
            </p>
            <p>
              <strong>Membros:</strong>{" "}
              {usuariosPorGrupo[grupo.id]?.length
                ? usuariosPorGrupo[grupo.id].join(", ")
                : "Nenhum membro ainda"}
            </p>
          </div>
          <div className="section-button-accept-group">
            <Check
              size={50}
              className="hover-check"
              onClick={() => entrarNoGrupo(grupo.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default JoinGroup;

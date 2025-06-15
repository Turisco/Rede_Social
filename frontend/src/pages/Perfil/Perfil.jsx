import { useEffect, useState } from "react";
import { ChevronLeft, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../global.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [gruposUsuario, setGruposUsuario] = useState([]);
  const [loadingGrupos, setLoadingGrupos] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosUsuario = localStorage.getItem("usuario");
    if (dadosUsuario) {
      const user = JSON.parse(dadosUsuario);
      setUsuario(user);

      fetch(`http://localhost:3001/perfil/grupos/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setGruposUsuario(data);
          setLoadingGrupos(false);
        })
        .catch(err => {
          console.error("Erro ao carregar grupos do usuário:", err);
          setLoadingGrupos(false);
        });
    }
  }, []);

  const toggleRouterBack = () => navigate("/home");
  const toggleRouterCreateGroup = () => navigate("/criarGrupo");
  const toggleRouterJoinGroup = () => navigate("/entrarGrupo");

  if (!usuario) return <p>Carregando dados do perfil...</p>;
  if (loadingGrupos) return <p>Carregando grupos...</p>;

  const jaEstaEmGrupo = gruposUsuario.length > 0;

  return (
    <section className="section-perfil">
      <div className="section-perfil-back">
        <ChevronLeft size={45} cursor="pointer" onClick={toggleRouterBack} />
      </div>
      <div className="section-perfil-group">
        <CircleUserRound size={130} color="gray" />
        <div className="section-perfil-data">
          <h3>Nome de usuário</h3>
          <h4>{usuario.nome}</h4>
        </div>
        <div className="section-perfil-data">
          <h3>E-mail</h3>
          <h4>{usuario.email}</h4>
        </div>
        <div className="section-perfil-data">
          <h3>Data de nascimento</h3>
          <h4>
            {new Date(usuario.data_nascimento).toLocaleDateString("pt-BR")}
          </h4>
        </div>

        <div className="section-perfil-last">
          <div className="section-perfil-data">
            <h3>Função</h3>
            <h4>Administrador</h4>
          </div>
          <div className="section-perfil-data-button">
            {
              jaEstaEmGrupo ? '' : (
                <h3 className="group-title">Grupo</h3>
              )
            }
            {jaEstaEmGrupo ? (
              <div className="box-name-group">
            <h3 className="group-title">Grupo</h3>
                {gruposUsuario.map((grupo) => (
                  <div className="box-group">
                    <p key={grupo.id} className="name-group">
                    Nome do grupo:  {grupo.nome} {grupo.administrador_id === usuario.id ? "(Administrador)" : "(Membro)"}
                    </p>
                    <button className="button-postagem" onClick={() => navigate('/chatGroup')}>Chat do grupo</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="section-perfil-button-group">
                <button
                  className="button-postagem"
                  onClick={toggleRouterCreateGroup}
                >
                  Criar
                </button>
                <button
                  className="button-postagem"
                  onClick={toggleRouterJoinGroup}
                >
                  Entrar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../global.css";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [gruposUsuario, setGruposUsuario] = useState([]);
  const [loadingGrupos, setLoadingGrupos] = useState(true);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosUsuario = localStorage.getItem("usuario");
    if (dadosUsuario) {
      const user = JSON.parse(dadosUsuario);
      setUsuario(user);
      if (user.fotoPerfil) setFotoPerfil(user.fotoPerfil);

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

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setFotoPerfil(base64Image);

        const dadosAtualizados = { ...usuario, fotoPerfil: base64Image };
        localStorage.setItem("usuario", JSON.stringify(dadosAtualizados));
        setUsuario(dadosAtualizados);

        fetch(`http://localhost:3001/perfil/foto/${usuario.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fotoPerfil: base64Image }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Foto de perfil atualizada no backend:", data);
          })
          .catch((err) => {
            console.error("Erro ao atualizar foto no backend:", err);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFotoClick = () => {
    inputFileRef.current?.click();
  };

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
        <div className="foto-perfil-wrapper" onClick={handleFotoClick}>
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="foto-perfil"
            />
          ) : (
            <CircleUserRound size={130} color="gray" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputFileRef}
          onChange={handleFotoChange}
        />

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
                  <div className="box-group" key={grupo.id}>
                    <p className="name-group">
                      Nome do grupo: {grupo.nome}{" "}
                      {grupo.administrador_id === usuario.id
                        ? "(Administrador)"
                        : "(Membro)"}
                    </p>
                    <button
                      className="button-postagem"
                      onClick={() => navigate("/chatGroup")}
                    >
                      Chat do grupo
                    </button>
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

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../global.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [contentType, setContentType] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) setUsuario(JSON.parse(dados));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario?.id) {
      alert("Erro: usuário não encontrado.");
      return;
    }

    const formData = new FormData();
    formData.append("content_type", contentType);
    formData.append("text", text);
    formData.append("user_id", usuario.id);
    if (file) {
      formData.append("arquivo", file);
    }

    try {
      const response = await fetch("http://localhost:3001/postagem/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const erro = await response.json();
        alert(erro.mensagem || "Erro ao criar postagem.");
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert("Erro de rede. Tente novamente.");
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setText("");
    setFile(null);
    setContentType("text");
  };

  const toggleRouterBack = () => {
    navigate("/home");
  };

  return (
    <section className="section-create-post">
      <form onSubmit={handleSubmit}>
        <div className="section-postagem-menu">
          <ChevronLeft size={45} cursor="pointer" onClick={toggleRouterBack} />
        </div>

        <h1 className="title-postagem">Criar Postagem</h1>

        <div className="form-group">
          <label>Tipo de conteúdo</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="text">Texto</option>
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
          </select>

          <label>Texto</label>
          <textarea
            placeholder="Escreva algo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-post"
            required={contentType === "text"}
          />

          {(contentType === "image" || contentType === "video") && (
            <>
              <label>{contentType === "image" ? "Imagem" : "Vídeo"}</label>
              <input
                type="file"
                accept={contentType === "image" ? "image/*" : "video/*"}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </>
          )}

          <div className="section-group-button">
            <button className="button-clear-field" onClick={handleClear}>
              Limpar campos
            </button>
            <button type="submit" className="button-create-group">
              Publicar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

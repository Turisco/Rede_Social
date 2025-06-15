import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ThumbsUp, ThumbsDown } from "lucide-react";
import "../../global.css";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const [postagens, setPostagens] = useState([]);
  const [novoComentario, setNovoComentario] = useState({});
  const [novaResposta, setNovaResposta] = useState({});
  const [likesComentario, setLikesComentario] = useState({});
  const [dislikesComentario, setDislikesComentario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) setUsuario(JSON.parse(userData));
    buscarPostagens();
  }, []);

  const buscarPostagens = async () => {
    try {
      const res = await fetch("http://localhost:3001/postagem/posts");
      const data = await res.json();
      setPostagens(data);
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    }
  };

  const curtirPost = async (id) => {
    await fetch(`http://localhost:3001/postagem/posts/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: usuario.id }),
    });
    buscarPostagens();
  };
  
  const descurtirPost = async (id) => {
    await fetch(`http://localhost:3001/postagem/posts/${id}/dislike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: usuario.id }),
    });
    buscarPostagens();
  };
  
  const curtirComentario = async (commentId) => {
    await fetch(`http://localhost:3001/postagem/comments/${commentId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: usuario.id }),
    });
    buscarPostagens();
  };
  
  const descurtirComentario = async (commentId) => {
    await fetch(`http://localhost:3001/postagem/comments/${commentId}/dislike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: usuario.id }),
    });
    buscarPostagens();
  };

  const comentar = async (postId) => {
    if (!novoComentario[postId]) return;
    await fetch(`http://localhost:3001/postagem/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: usuario.id,
        text: novoComentario[postId],
      }),
    });
    setNovoComentario({ ...novoComentario, [postId]: "" });
    buscarPostagens();
  };

  const responder = async (commentId) => {
    if (!novaResposta[commentId]) return;
    await fetch(`http://localhost:3001/postagem/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: usuario.id,
        text: novaResposta[commentId],
      }),
    });
    setNovaResposta({ ...novaResposta, [commentId]: "" });
    buscarPostagens();
  };
  

  const toggleRouterPost = () => navigate("/postagem");
  const toggleRouterPerfil = () => navigate("/perfil");
  const toggleRouterInit = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <section className="section-menu">
      <header className="section-menu-header">
        <div className="section-menu-group">
          <button className="section-menu-button-add" onClick={toggleRouterPerfil}>
            <User />
          </button>
          <h3 className="name-menu">{usuario ? usuario.nome : "Usuário"}</h3>
        </div>
        <div className="section-menu-group-2">
          <button className="section-menu-button-add" onClick={toggleRouterPost}>
            +
          </button>
          <LogOut cursor="pointer" onClick={toggleRouterInit}/>
        </div>
      </header>

      <div className="section-posts">
  {postagens.length === 0 ? (
    <div className="none-post"><p>Nenhuma postagem disponível.</p></div>
  ) : (
    postagens.map((post) => (
      <div key={post.id} className="post-card">
        <p className="post-author">Usuário ID: {post.user_id}</p>
        <p className="post-text">{post.text}</p>

        {post.content_type === "image" && (
          <img
            src={`http://localhost:3001/uploads/${post.file_url}`}
            alt="imagem"
            className="post-media"
          />
        )}

        {post.content_type === "video" && (
          <video controls className="post-media">
            <source src={`http://localhost:3001/uploads/${post.file_url}`} type="video/mp4" />
          </video>
        )}

        <div className="post-actions">
          <button onClick={() => curtirPost(post.id)}>
            <ThumbsUp /> {post.likes || 0}
          </button>
          <button onClick={() => descurtirPost(post.id)}>
            <ThumbsDown /> {post.dislikes || 0}
          </button>
        </div>

        <div className="post-comments">
          <h4>Comentários</h4>
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <div className="comment-actions">
                <button onClick={() => curtirComentario(comment.id)}>
                  <ThumbsUp /> {comment.likes || 0}
                </button>
                <button onClick={() => descurtirComentario(comment.id)}>
                  <ThumbsDown /> {comment.dislikes || 0}
                </button>
              </div>

              <div className="replies">
                {comment.replies.map((reply) => (
                  <p key={reply.id} className="reply">
                    ↳ {reply.text}
                  </p>
                ))}
              </div>

              <div className="form-resposta">
                <input
                  type="text"
                  placeholder="Responder..."
                  value={novaResposta[comment.id] || ""}
                  onChange={(e) =>
                    setNovaResposta({ ...novaResposta, [comment.id]: e.target.value })
                  }
                />
                <button onClick={() => responder(comment.id)}>Responder</button>
              </div>
            </div>
          ))}

          <div className="form-comentario">
            <input
              type="text"
              placeholder="Adicionar comentário..."
              value={novoComentario[post.id] || ""}
              onChange={(e) =>
                setNovoComentario({ ...novoComentario, [post.id]: e.target.value })
              }
            />
            <button onClick={() => comentar(post.id)}>Comentar</button>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    </section>
  );
}

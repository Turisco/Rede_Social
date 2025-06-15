import { useEffect, useState, useRef } from "react";

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export default function ChatGroup() {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);
  const [grupoId, setGrupoId] = useState(null);
  const chatEndRef = useRef(null);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const carregarGruposESelecionar = async (usuarioId) => {
    try {
      const res = await 
      fetch(`http://localhost:3001/join/grupos/usuario/${usuarioId}`);
      if (!res.ok) throw new Error("Erro ao buscar grupos");
      const grupos = await res.json();
      if (grupos.length > 0) {
        localStorage.setItem("grupo", JSON.stringify(grupos[0]));
        setGrupoId(grupos[0].id);
      } else {
        console.warn("Usuário não pertence a nenhum grupo.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const grupoRaw = localStorage.getItem("grupo");
    const grupoObj = grupoRaw && grupoRaw !== "null" ? JSON.parse(grupoRaw) : null;

    if (grupoObj?.id) {
      setGrupoId(grupoObj.id);
    } else if (usuario?.id) {
      carregarGruposESelecionar(usuario.id);
    }
  }, [usuario]);

  useEffect(() => {
    if (!grupoId) return;
    fetch(`http://localhost:3001/chat/mensagens/${grupoId}`)
      .then((res) => res.json())
      .then((data) => {
        setChat(data);
        scrollToBottom();
      })
      .catch((err) => console.error("Erro ao carregar mensagens:", err));
  }, [grupoId]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const enviarMensagem = () => {
    if (!grupoId) {
      alert("Grupo não selecionado.");
      return;
    }

    if (mensagem.trim()) {
      const novaMensagem = {
        groupId: grupoId,
        nome: usuario.nome,
        mensagem: mensagem,
      };

      fetch("http://localhost:3001/chat/mensagens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaMensagem)
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao salvar mensagem.");
          return res.json();
        })
        .then(() => {
          setChat(prev => [
            ...prev,
            {
              ...novaMensagem,
              hora: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          ]);
          setMensagem("");
          scrollToBottom();
        })
        .catch(err => console.error(err));
    }
  };

  console.log('grupoId:', grupoId);
  console.log('usuario:', usuario);
  console.log('usuario.nome:', usuario?.nome);

  return (
    <div className="section-chat">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index} style={{ color: stringToColor(msg.nome) }}>
            <strong>{msg.nome}:</strong> {msg.mensagem} <small>{msg.hora}</small>
          </p>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button onClick={enviarMensagem} className="button-postagem">
          Enviar
        </button>
      </div>
    </div>
  );
}

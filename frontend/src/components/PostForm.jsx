import { useState } from 'react';
import axios from 'axios';

export default function PostForm() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [mediaType, setMediaType] = useState('text');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:3000/api/posts', {
        content,
        media_url: media,
        media_type: mediaType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Post criado!');
      setContent('');
      setMedia('');
    } catch (error) {
      alert('Erro ao criar post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <input type="text" value={media} placeholder="URL da imagem/vídeo (opcional)" onChange={e => setMedia(e.target.value)} />
      <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
        <option value="text">Texto</option>
        <option value="image">Imagem</option>
        <option value="video">Vídeo</option>
      </select>
      <button type="submit">Postar</button>
    </form>
  );
}

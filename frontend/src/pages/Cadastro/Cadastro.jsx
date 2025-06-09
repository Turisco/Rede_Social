import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
  const [form, setForm] = useState({nome: '',email: '',senha: '',dataNascimento: ''});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de rede. Verifique sua conexão.');
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input className="cadastro-input" name="nome" placeholder="Nome" onChange={handleChange} required/>
        <input className="cadastro-input" type="email" name="email" placeholder="Email" onChange={handleChange} required/>
        <input className="cadastro-input" type="password" name="senha" placeholder="Senha" onChange={handleChange} required/>
        <input className="cadastro-input" type="date" name="dataNascimento" onChange={handleChange} required/>
        <button className="cadastro-button" type="submit">Cadastrar</button>

        <button type="button" className="cadastro-link" onClick={() => navigate('/login')}>Já tem conta? Faça login</button>
      </form>
    </div>
  );
}

export default Cadastro;

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    profile_picture: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/register', formData);
      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Nome de usuário" onChange={handleChange} required />
      <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
      <input type="date" name="birthdate" onChange={handleChange} required />
      <input type="file" name="profile_picture" onChange={handleChange} />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Register;

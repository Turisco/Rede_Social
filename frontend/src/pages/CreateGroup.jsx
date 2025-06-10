import React, { useState } from 'react';
import { createGroup } from '../services/groupService';

function CreateGroup({ token }) {
  const [form, setForm] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGroup(form, token);
    alert('Grupo criado com sucesso!');
    setForm({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Grupo</h2>
      <input
        type="text"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>
      <button type="submit">Criar</button>
    </form>
  );
}

export default CreateGroup;

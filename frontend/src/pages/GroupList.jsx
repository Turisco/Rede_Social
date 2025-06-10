import React, { useEffect, useState } from 'react';
import { fetchGroups, joinGroup, leaveGroup } from '../services/groupService';

function GroupList({ token }) {
  const [groups, setGroups] = useState([]);

  const loadGroups = async () => {
    const response = await fetchGroups();
    setGroups(response.data);
  };

  const handleJoin = async (id) => {
    await joinGroup(id, token);
    loadGroups();
  };

  const handleLeave = async (id) => {
    await leaveGroup(id, token);
    loadGroups();
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <h2>Grupos Públicos</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <strong>{group.name}</strong> - {group.description}
            <button onClick={() => handleJoin(group.id)}>Entrar</button>
            <button onClick={() => handleLeave(group.id)}>Sair</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;


import React, { useEffect, useState } from 'react';
import {
  getGroupMembers,
  deleteGroup,
  removeMember
} from '../services/groupService';
import { useParams } from 'react-router-dom';

function GroupDetails({ token, userId }) {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState(false);

  const loadMembers = async () => {
    const res = await getGroupMembers(id);
    setMembers(res.data);
    const isAdmin = res.data.find(m => m.id === userId && m.role === 'admin');
    setAdmin(!!isAdmin);
  };

  const handleDeleteGroup = async () => {
    await deleteGroup(id, token);
    alert('Grupo excluído');
  };

  const handleRemove = async (memberId) => {
    await removeMember(id, memberId, token);
    loadMembers();
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h2>Membros do Grupo</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name} - {member.role}
            {admin && member.id !== userId && (
              <button onClick={() => handleRemove(member.id)}>Remover</button>
            )}
          </li>
        ))}
      </ul>
      {admin && <button onClick={handleDeleteGroup}>Excluir Grupo</button>}
    </div>
  );
}

export default GroupDetails;


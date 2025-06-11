import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Grupos</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <strong>{group.name}</strong><br />
            {group.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;

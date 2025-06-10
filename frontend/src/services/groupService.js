import axios from 'axios';

const API = 'http://localhost:3001/api'; // Altere conforme sua porta/backend

export const fetchGroups = () => axios.get(`${API}/groups`);
export const createGroup = (data, token) =>
  axios.post(`${API}/groups`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const joinGroup = (groupId, token) =>
  axios.post(`${API}/groups/${groupId}/join`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const leaveGroup = (groupId, token) =>
  axios.delete(`${API}/groups/${groupId}/leave`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getGroupMembers = (groupId) =>
  axios.get(`${API}/groups/${groupId}/members`);
export const deleteGroup = (groupId, token) =>
  axios.delete(`${API}/groups/${groupId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const removeMember = (groupId, memberId, token) =>
  axios.post(`${API}/groups/${groupId}/remove-member`, { member_id: memberId }, {
    headers: { Authorization: `Bearer ${token}` },
  });

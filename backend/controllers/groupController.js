const groupModel = require('../models/groupModel');

exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const creator_id = req.user.id;

  try {
    const groupId = await groupModel.createGroup(name, description, creator_id);
    await groupModel.addMember(groupId, creator_id, 'admin');
    res.status(201).json({ message: 'Grupo criado com sucesso', groupId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar grupo' });
  }
};

exports.listGroups = async (req, res) => {
  try {
    const groups = await groupModel.getAllGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar grupos' });
  }
};

exports.joinGroup = async (req, res) => {
  const group_id = req.params.id;
  const user_id = req.user.id;

  try {
    const isMember = await groupModel.isMember(group_id, user_id);
    if (isMember) return res.status(400).json({ message: 'Você já está no grupo' });

    await groupModel.addMember(group_id, user_id, 'member');
    res.json({ message: 'Você entrou no grupo' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao entrar no grupo' });
  }
};

exports.leaveGroup = async (req, res) => {
  const group_id = req.params.id;
  const user_id = req.user.id;

  try {
    await groupModel.removeMember(group_id, user_id);
    res.json({ message: 'Você saiu do grupo' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao sair do grupo' });
  }
};

exports.getGroupMembers = async (req, res) => {
  const group_id = req.params.id;

  try {
    const members = await groupModel.getMembers(group_id);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar membros' });
  }
};

exports.deleteGroup = async (req, res) => {
  const group_id = req.params.id;
  const user_id = req.user.id;

  try {
    const isAdmin = await groupModel.checkAdmin(group_id, user_id);
    if (!isAdmin) return res.status(403).json({ message: 'Apenas o admin pode excluir o grupo' });

    await groupModel.deleteGroup(group_id);
    res.json({ message: 'Grupo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir grupo' });
  }
};

exports.removeMember = async (req, res) => {
  const group_id = req.params.id;
  const { member_id } = req.body;
  const user_id = req.user.id;

  try {
    const isAdmin = await groupModel.checkAdmin(group_id, user_id);
    if (!isAdmin) return res.status(403).json({ message: 'Apenas o admin pode remover membros' });

    await groupModel.removeMember(group_id, member_id);
    res.json({ message: 'Membro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover membro' });
  }
};

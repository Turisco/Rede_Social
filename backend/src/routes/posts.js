const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  const { content, media_url, media_type } = req.body;

  try {
    const newPost = await Post.create({
      userId: req.user.id,
      content,
      media_url,
      media_type
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar post.' });
  }
});

module.exports = router;

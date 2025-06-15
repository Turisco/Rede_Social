const express = require("express");
const router = express.Router();
const multer = require("multer");
const PostagemController = require("../controllers/PostagemControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Criar post com upload de arquivo
router.post("/posts", upload.single("arquivo"), PostagemController.create);

// Buscar todos os posts
router.get("/posts", PostagemController.getAll);

// Curtir post
router.post("/posts/:id/like", PostagemController.like);

// Descurtir post
router.post("/posts/:id/dislike", PostagemController.dislike);

// Adicionar comentário ao post
router.post("/posts/:postId/comments", PostagemController.addComment);

// Adicionar resposta ao comentário
router.post("/comments/:commentId/replies", PostagemController.addReply);

// Curtir comentário
router.post("/comments/:commentId/like", PostagemController.likeComment);

// Descurtir comentário
router.post("/comments/:commentId/dislike", PostagemController.dislikeComment);

module.exports = router;

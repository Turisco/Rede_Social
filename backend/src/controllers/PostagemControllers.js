const db = require("../db");

const PostController = {
  getAll: (req, res) => {
    db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, posts) => {
      if (err) return res.status(500).json(err);

      const getCommentsAndReplies = posts.map((post) => {
        return new Promise((resolve) => {
          db.query("SELECT * FROM comments WHERE post_id = ?", [post.id], (err, comments) => {
            if (err) return resolve({ ...post, comments: [] });

            const commentPromises = comments.map((comment) => {
              return new Promise((resolveComment) => {
                db.query("SELECT * FROM replies WHERE comment_id = ?", [comment.id], (err, replies) => {
                  if (err) replies = [];

                  db.query("SELECT user_id, reaction FROM comment_reactions WHERE comment_id = ?", [comment.id], (err, commentReactions) => {
                    if (err) commentReactions = [];

                    resolveComment({ ...comment, replies, reactions: commentReactions });
                  });
                });
              });
            });

            // Buscar reações do post
            db.query("SELECT user_id, reaction FROM post_reactions WHERE post_id = ?", [post.id], (err, postReactions) => {
              if (err) postReactions = [];

              Promise.all(commentPromises).then((fullComments) => {
                resolve({ ...post, comments: fullComments, reactions: postReactions });
              });
            });
          });
        });
      });

      Promise.all(getCommentsAndReplies).then((postsWithComments) => {
        res.json(postsWithComments);
      });
    });
  },

  create: (req, res) => {
    const { user_id, content_type, text } = req.body;
    const fileURL = req.file ? req.file.filename : null;

    if (!user_id || !content_type || !text) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    db.query(
      "INSERT INTO posts (user_id, content_type, text, file_url) VALUES (?, ?, ?, ?)",
      [user_id, content_type, text, fileURL],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Post criado com sucesso!" });
      }
    );
  },

  like: (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "User ID necessário." });

    db.query(
      "SELECT reaction FROM post_reactions WHERE post_id = ? AND user_id = ?",
      [id, user_id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          db.query(
            "INSERT INTO post_reactions (post_id, user_id, reaction) VALUES (?, ?, 'like')",
            [id, user_id],
            (err) => {
              if (err) return res.status(500).json(err);

              db.query(
                "UPDATE posts SET likes = likes + 1 WHERE id = ?",
                [id],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Like adicionado." });
                }
              );
            }
          );
        } else {
          const currentReaction = results[0].reaction;
          if (currentReaction === "like") {
            return res.status(400).json({ message: "Usuário já deu like nesse post." });
          } else {
            db.query(
              "UPDATE post_reactions SET reaction = 'like' WHERE post_id = ? AND user_id = ?",
              [id, user_id],
              (err) => {
                if (err) return res.status(500).json(err);

                db.query(
                  "UPDATE posts SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = ?",
                  [id],
                  (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Reação atualizada para like." });
                  }
                );
              }
            );
          }
        }
      }
    );
  },

  dislike: (req, res) => {
    const { id } = req.params; // post id
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "User ID necessário." });

    db.query(
      "SELECT reaction FROM post_reactions WHERE post_id = ? AND user_id = ?",
      [id, user_id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          db.query(
            "INSERT INTO post_reactions (post_id, user_id, reaction) VALUES (?, ?, 'dislike')",
            [id, user_id],
            (err) => {
              if (err) return res.status(500).json(err);

              db.query(
                "UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?",
                [id],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Dislike adicionado." });
                }
              );
            }
          );
        } else {
          const currentReaction = results[0].reaction;
          if (currentReaction === "dislike") {
            return res.status(400).json({ message: "Usuário já deu dislike nesse post." });
          } else {
            db.query(
              "UPDATE post_reactions SET reaction = 'dislike' WHERE post_id = ? AND user_id = ?",
              [id, user_id],
              (err) => {
                if (err) return res.status(500).json(err);

                db.query(
                  "UPDATE posts SET dislikes = dislikes + 1, likes = likes - 1 WHERE id = ?",
                  [id],
                  (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Reação atualizada para dislike." });
                  }
                );
              }
            );
          }
        }
      }
    );
  },

  addComment: (req, res) => {
    const { postId } = req.params;
    const { user_id, text } = req.body;

    if (!user_id || !text) {
      return res.status(400).json({ message: "User ID e texto são obrigatórios." });
    }

    db.query(
      "INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)",
      [postId, user_id, text],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Comentário adicionado." });
      }
    );
  },

  addReply: (req, res) => {
    const { commentId } = req.params;
    const { user_id, text } = req.body;

    if (!user_id || !text) {
      return res.status(400).json({ message: "User ID e texto são obrigatórios." });
    }

    db.query(
      "INSERT INTO replies (comment_id, user_id, text) VALUES (?, ?, ?)",
      [commentId, user_id, text],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Resposta adicionada." });
      }
    );
  },

  likeComment: (req, res) => {
    const { commentId } = req.params;
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "User ID necessário." });

    db.query(
      "SELECT reaction FROM comment_reactions WHERE comment_id = ? AND user_id = ?",
      [commentId, user_id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          db.query(
            "INSERT INTO comment_reactions (comment_id, user_id, reaction) VALUES (?, ?, 'like')",
            [commentId, user_id],
            (err) => {
              if (err) return res.status(500).json(err);

              db.query(
                "UPDATE comments SET likes = likes + 1 WHERE id = ?",
                [commentId],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Like no comentário adicionado." });
                }
              );
            }
          );
        } else {
          const currentReaction = results[0].reaction;
          if (currentReaction === "like") {
            return res.status(400).json({ message: "Usuário já deu like nesse comentário." });
          } else {
            db.query(
              "UPDATE comment_reactions SET reaction = 'like' WHERE comment_id = ? AND user_id = ?",
              [commentId, user_id],
              (err) => {
                if (err) return res.status(500).json(err);

                db.query(
                  "UPDATE comments SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = ?",
                  [commentId],
                  (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Reação atualizada para like no comentário." });
                  }
                );
              }
            );
          }
        }
      }
    );
  },

  dislikeComment: (req, res) => {
    const { commentId } = req.params;
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "User ID necessário." });

    db.query(
      "SELECT reaction FROM comment_reactions WHERE comment_id = ? AND user_id = ?",
      [commentId, user_id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          db.query(
            "INSERT INTO comment_reactions (comment_id, user_id, reaction) VALUES (?, ?, 'dislike')",
            [commentId, user_id],
            (err) => {
              if (err) return res.status(500).json(err);

              db.query(
                "UPDATE comments SET dislikes = dislikes + 1 WHERE id = ?",
                [commentId],
                (err) => {
                  if (err) return res.status(500).json(err);
                  res.json({ message: "Dislike no comentário adicionado." });
                }
              );
            }
          );
        } else {
          const currentReaction = results[0].reaction;
          if (currentReaction === "dislike") {
            return res.status(400).json({ message: "Usuário já deu dislike nesse comentário." });
          } else {
            db.query(
              "UPDATE comment_reactions SET reaction = 'dislike' WHERE comment_id = ? AND user_id = ?",
              [commentId, user_id],
              (err) => {
                if (err) return res.status(500).json(err);

                db.query(
                  "UPDATE comments SET dislikes = dislikes + 1, likes = likes - 1 WHERE id = ?",
                  [commentId],
                  (err) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Reação atualizada para dislike no comentário." });
                  }
                );
              }
            );
          }
        }
      }
    );
  },
};

module.exports = PostController;

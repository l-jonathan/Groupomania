// Importation config database avec ORM Sequelize
const token = require("../middleware/token");
const db = require("../models/index");

// Importation modèle Post
const { Post } = db.sequelize.models;
// Importation modèle Comment
const { Comment } = db.sequelize.models;

///////////////
// CRUD POST //
///////////////

module.exports.readPost = async (req, res) => {
  try {
    var posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  console.log('1');
  const userId = token.getUserId(req);
  try {
    console.log('2');
    console.log("userId :" + userId);
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user !== null) {
      console.log('3');
      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "photo", "id"],
          },
        ],
        content: req.body.content,
        UserId: user.id,
      });
      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      console.log('4');
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    console.log('5');
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

module.exports.updatePost = async (req, res) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
      }
    : { ...req.body };

  const postId = req.params.id;

  db.Post.findOne({
    where: { id: postId },
  })
    .then((postFound) => {
      if (postFound) {
        db.Post.update(postObject, {
          where: { id: postId },
        })
          .then((post) =>
            res.status(200).json({ message: "Votre post a bien été modifié !" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(404).json({ error: "Post non trouvé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findOne({ where: { id: postId } });
    db.Post.destroy({ where: { id: postId } }); // on supprime le compte
    res.status(200).json({ messageRetour: "post supprimé" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//////////////////
// CRUD COMMENT //
//////////////////

module.exports.readComment = async (req, res) => {
  try {
    var comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
};

module.exports.createComment = async (req, res, next) => {
  try {
    const comment = req.body.content;
    const newComment = await db.Comment.create({
      content: comment,
      UserId: token.getUserId(req),
      PostId: req.params.id,
    });

    res
      .status(201)
      .json({ newComment, messageRetour: "votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

module.exports.updateComment = async (req, res) => {
  const commentObject = req.file
    ? {
        ...JSON.parse(req.body.comment),
      }
    : { ...req.body };

  const userId = token.getUserId(req);
  const commentId = req.params.id;

  db.Comment.findOne({
    where: { id: commentId, UserId: userId },
  })
    .then((commentFound) => {
      if (commentFound) {
        db.Comment.update(commentObject, {
          where: { id: commentId },
        })
          .then((comment) =>
            res
              .status(200)
              .json({ message: "Votre commentaire a bien été modifié !" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(404).json({ error: "Commentaire non trouvé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    //const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });

    if (userId === comment.UserId /* || checkAdmin.admin === true*/) {
      db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//////////
// LIKE //
//////////

module.exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    if (user) {
      await db.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vous n'aimez plus ce post" });
    } else {
      await db.Like.create({
        UserId: userId,
        PostId: postId,
      });
      res.status(201).json({ messageRetour: "vous aimez ce post" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Utilisateur ou post non trouvé" });
  }
};

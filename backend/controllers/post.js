////////////////////////////////////////////////////////////
//////////// MODULE FOR POST - COMMENTS - LIKES ////////////
////////////////////////////////////////////////////////////

// Importation config database avec ORM Sequelize
const db = require("../models/index");

// Import POST Model
const { Post } = db.sequelize.models;
// Import COMMENT Model
const { Comment } = db.sequelize.models;
// Import Like Model
const { Like } = db.sequelize.models;

///////////////
// CRUD POST //
///////////////

// Display all posts
module.exports.readPost = async (req, res) => {
  try {
    var posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

// Create a new post
module.exports.createPost = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    // Verify if the user exist
    if (user !== null) {
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
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Update a post
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

// Delete a post
module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await db.Post.findOne({ where: { id: postId } });
    db.Post.destroy({ where: { id: postId } }); // on supprime le compte
    res.status(200).json({ messageRetour: "Votre post a bien été supprimé !" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//////////////////
// CRUD COMMENT //
//////////////////

// Display all comments
module.exports.readComment = async (req, res) => {
  try {
    var comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
};

// Create a new comment
module.exports.createComment = async (req, res, next) => {
  try {
    const comment = req.body.content;
    const newComment = await db.Comment.create({
      PostId: req.params.id,
      content: comment,
      UserId: req.body.userId,
    });
    res.status(201).json({
      newComment,
      messageRetour: "Votre commentaire a bien été publié",
    });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// Update a comment
module.exports.updateComment = async (req, res) => {
  const commentObject = req.file
    ? {
        ...JSON.parse(req.body.comment),
      }
    : { ...req.body };

  const commentId = req.params.id;

  db.Comment.findOne({
    where: { id: commentId },
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

// Delete a comment
module.exports.deleteComment = async (req, res) => {
  try {
    //const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });

    db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
    res.status(200).json({ message: "Votre commentaire a bien été supprimé" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//////////
// LIKE //
//////////

// Like and Dislike
module.exports.likePost = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    if (user) {
      // If like exist => Dislike
      await db.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vous n'aimez plus ce post" });
    } else {
      // If like doesn't exist => Like
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

// Display all likes
module.exports.readLike = async (req, res, next) => {
  try {
    var likes = await Like.findAll();
    return res.status(200).json(likes);
  } catch (err) {
    console.log(err);
  }
};

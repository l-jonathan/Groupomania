// Importation config database avec ORM Sequelize
const db = require("../models/index");

// Importation modèle User
const { User } = db.sequelize.models;

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpeg"
    )
      throw Error("Invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({errors});
  }

  const fileName = req.body.firstName + "_" + req.body.lastName + "_" + req.body.createdAt + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
    )
  );

  try {
      const userId = req.body.id;
      await db.User.findByIdAndUpdate(
          userId,
          { $set : { profilePhoto: "./uploads/profil/" + filename}},
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (err, docs) => {
              if (!err) {
                  return res.send(docs);
              } else return res.status(500).send({ message: err });
          } 
      );
  } catch (err) {
      return res.status(500).send({ message: err });
  }
};

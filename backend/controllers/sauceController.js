const Sauce = require("../models/sauceModels");
const fs = require("fs");
const { type } = require("os");

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    _userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    userDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce ajouté" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "unauthorized request" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce modifié" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: "unauthorized request" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const likeValue = req.body.like;

  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const UserLiked = sauce.usersLiked;
    const UserDisliked = sauce.usersDisliked;
    const alreadyLike = UserLiked.find((test) => test == userId);
    const alreadyDislike = UserDisliked.find((test2) => test2 == userId);

    if (likeValue === 1) {
      Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: [userId] }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: "Like" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (likeValue === 0 && alreadyLike != undefined) {
      Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: { $in: [userId] } }, $inc: { likes: -1 } })
        .then(() => res.status(200).json({ message: "Unlike" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (likeValue == 0 && alreadyDislike != undefined) {
      Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: { $in: [userId] } }, $inc: { dislikes: -1 } })
        .then(() => res.status(200).json({ message: "Undislike" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (likeValue === -1) {
      Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: [userId] }, $inc: { dislikes: +1 } })
        .then(() => res.status(200).json({ message: "Dislike" }))
        .catch((error) => res.status(400).json[{ error }]);
    }
  });
};

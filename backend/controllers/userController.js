//Module
const bcrypt = require("bcrypt");
const userModels = require("../models/userModels");
const jwt = require("jsonwebtoken");

// User sign up function
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new userModels({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//User Log in function
exports.login = (req, res, next) => {
  userModels
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Identifiant ou mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Identifiant ou mot de passe incorrecte" });
            } else {
              res.status(200).json({ userId: user._id, token: jwt.sign({ userId: user._id }, process.env.tokenKey, { expiresIn: "24h" }) });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

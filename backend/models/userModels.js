// Module
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// User schema for database
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//Plugin for unique entry in database
userSchema.plugin(uniqueValidator);

//Schema export
module.exports = mongoose.model("User", userSchema);

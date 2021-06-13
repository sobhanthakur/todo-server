const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const constants = require("../constants/generalConstants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Enable mongoose unique validator plugin.
userSchema.plugin(uniqueValidator, { message: "is already taken." });

// function to Generate JWT token
userSchema.methods.generateJWT = function () {
  // Set JWT Payload
  const payload = {
    user: {
      id: this._id,
    },
  };

  // Return token
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: constants.token_expiry,
  });
};

// Hash the password using bcrypt
userSchema.methods.hashPassword = async function (pass) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(pass, salt);
};

module.exports = User = mongoose.model("user", userSchema);

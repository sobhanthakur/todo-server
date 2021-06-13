const express = require("express"),
  router = express.Router(),
  { validationResult } = require("express-validator"),
  {
    register,
    login,
    changePassword,
    userDetails,
  } = require("../services/users"),
  auth = require("../../middleware/auth"),
  {
    registrationCheck,
    loginCheck,
    updatePasswordCheck,
  } = require("../validations/userValidations");

// @route    POST api/users/register
// @desc     Register user
// @access   Public

router.post("/register", [registrationCheck], (req, res, next) => {
  const errors = validationResult(req);

  // Throw Exception if validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return register(req, res, next);
});

// @route    POST api/users/login
// @desc     Login user
// @access   Public

router.post("/login", [loginCheck], (req, res, next) => {
  const errors = validationResult(req);

  // Throw Exception if validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return login(req, res, next);
});

// @route    PUT api/users/password
// @desc     Change user password
// @access   Public

router.put("/password", [updatePasswordCheck], (req, res, next) => {
  const errors = validationResult(req);

  // Throw Exception if validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return changePassword(req, res, next);
});

// @route    GET api/users
// @desc     Get User details
// @access   Public

router.get("/", auth, (req, res, next) => {
  return userDetails(req, res, next);
});

module.exports = router;

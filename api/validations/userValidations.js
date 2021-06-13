const { check } = require("express-validator");

// Validations needed for login
module.exports.loginCheck = [
  //Checks for empty email
  check("email", "Please Include an email").not().isEmpty(),
  // Check for a valid email
  check("email", "Email is not valid").isEmail(),
  // Checks if password is present
  check("password", "Please enter a password").exists(),
];

// Validations needed for registration
module.exports.registrationCheck = [
  check("name", "Name must be present").not().isEmpty(),
  check("email", "Please Include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or mote characters"
  ).isLength({ min: 6 }),
];

// Validations needed for updating password
module.exports.updatePasswordCheck = [
  check("email", "Please Include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or mote characters"
  ).isLength({ min: 6 }),
];

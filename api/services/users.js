const bcrypt = require("bcryptjs");
const User = require("../../models/User");

require("dotenv").config();

/*
 * Register User
 */
module.exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    // Create new User
    user = new User({
      name,
      email,
    });

    // Encrypt users password using bcrypt
    await user.hashPassword(password);

    // Save to DB (Commit)
    await user.save();

    // Retun JWT - Users straight away logs in if user is registered successfully
    const token = await user.generateJWT();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Login User
 */
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // See if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: { msg: "User Not found" } });
    }

    // Validate Credentials
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: { msg: "Invalid Credentials" } });
    }

    // Retun JWT - Users straight away logs in if user is registered successfully
    const token = await user.generateJWT();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Change User Password
 */
module.exports.changePassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // See if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: { msg: "Email not found" } });
    }

    // Encrypt users password using bcrypt
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // Save to DB (Commit)
    await user.save();

    res.status(201).json({ msg: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
  return res;
};

/*
 * Get User Details
 */
module.exports.userDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
  return res;
};

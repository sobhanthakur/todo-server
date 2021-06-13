const { check } = require("express-validator");

// Validations needed to add a new todo
module.exports.newTodoCheck = [
  check("title", "Title must be present").not().isEmpty(),
  check("description", "Description must be present").not().isEmpty(),
  check("priority", "Priority must be present").not().isEmpty(),
];
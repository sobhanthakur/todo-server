const express = require("express"),
  router = express.Router(),
  { check, validationResult } = require("express-validator"),
  auth = require("../../middleware/auth"),
  checkObjectId = require("../../middleware/checkObjectId"),
  { newTodoCheck } = require("../validations/todoValidation"),
  todoService = require("../services/todo");

// @route    POST api/todo
// @desc     Create new Todo Task
// @access   Public

router.post("/", [auth, newTodoCheck], (req, res, next) => {
  const errors = validationResult(req);

  // Throw Exception if validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return todoService.add(req, res, next);
});

// @route    PUT api/todo
// @desc     Update a todo
// @access   Public

router.put(
  "/:id",
  [
    checkObjectId("id"),
    auth,
    check("description", "Description must be present").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    // Throw Exception if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return todoService.update(req, res, next);
  }
);

// @route    DELETE api/todo/:id
// @desc     Delete Todo By ID
// @access   Public

router.delete("/:id", [checkObjectId("id"), auth], (req, res, next) => {
  return todoService.deleteTodo(req, res, next);
});

// @route    DELETE api/todo
// @desc     Delete All Todos
// @access   Public

router.delete("/", auth, (req, res, next) => {
  return todoService.deleteAll(req, res, next);
});

// @route    Get api/todo/:priority
// @desc     Get All Todos
// @access   Public

router.get("/:priority", auth, (req, res, next) => {
  return todoService.getAll(req, res, next);
});

module.exports = router;

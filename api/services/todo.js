const Todo = require("../../models/Todo");

/*
 * Create new Todo
 */
const add = async (req, res, next) => {
  const { title, description, priority } = req.body;

  try {
    // Create new Todo Task
    todo = new Todo({
      title,
      description,
      priority,
      user: req.user.id,
    });

    // Save to DB (Commit)
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Update the Todo Task
 */
const update = async (req, res, next) => {
  const { description } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: "Todo Not Found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Update the todo here
    todo.description = description;

    await todo.save();

    res.json(todo);
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Delete the Todo Task By ID
 */
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: "Todo Not Found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete the todo here
    await todo.remove();

    res.json({ msg: "Todo removed" });
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Delete All Todos
 */
const deleteAll = async (req, res, next) => {
  try {
    await Todo.find({ user: req.user.id }).deleteMany();

    res.json({ msg: "Todos removed" });
  } catch (err) {
    next(err);
  }

  return res;
};

/*
 * Get All Todos
 */
const getAll = async (req, res, next) => {
  try {
    const todo = await Todo.find({
      user: req.user.id,
      priority: req.params.priority,
    });

    res.json(todo);
  } catch (err) {
    next(err);
  }

  return res;
};

module.exports = { add, update, deleteTodo, deleteAll, getAll };

const express = require("express"),
  connectDB = require("./config/db"),
  path = require("path"),
  cors = require("cors"),
  app = express();

// Connect to DB
connectDB();

// Enable cors
app.use(cors());

// Init middleware
// This helps to pass the request body to the controllers
app.use(express.json({ extended: false }));

// All apis must be prefixed with /api.
app.use("/api", require("./api/routes/index"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: "something went wrong",
    },
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));

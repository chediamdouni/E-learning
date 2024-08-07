var createError = require("http-errors");
var http = require("http");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

var mainRouter = require("./routes/index");
const { syncUsers } = require("./utils/stream");
const User = require("./models/User");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB Connected");
    syncUsers(await User.find({}));
  })
  .catch((error) => {
    console.log(`Error ${error.message}`);
  });

var app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const server = http.Server(app);
server.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});
module.exports = app;

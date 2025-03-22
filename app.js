"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

const morgan = require("morgan");

const app = express();

// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Log HTTP requests
app.use(morgan("tiny"));
// Middleware to authenticate JWT tokens
app.use(authenticateJWT);

// Routes for authentication
app.use("/auth", authRoutes);
// Routes for companies
app.use("/companies", companiesRoutes);
// Routes for users
app.use("/users", usersRoutes);
// Routes for jobs
app.use("/jobs", jobsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

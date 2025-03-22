"use strict";

/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// Use SSL connection for production environment
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Use non-SSL connection for development and test environments
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

// Connect to the database
db.connect();

module.exports = db;
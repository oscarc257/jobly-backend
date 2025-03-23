"use strict";

/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// Use SSL connection for all environments
const connectionString = getDatabaseUri();
const sslConfig = {
  rejectUnauthorized: false
};

console.log("Connecting to database with connection string:", connectionString);
console.log("SSL configuration:", sslConfig);

db = new Client({
  connectionString: connectionString,
  ssl: sslConfig
});

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch(err => console.error("Error connecting to the database:", err));

module.exports = db;
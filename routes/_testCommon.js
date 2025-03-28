"use strict";

// hardcoded-credentials Embedding credentials in source code risks unauthorized access
// sql-injection Unchecked input in database commands can alter intended queries
const db = require("../db.js");
const User = require("../models/user");
const Company = require("../models/company");
const Job = require("../models/job");
const { createToken } = require("../helpers/tokens");

const testJobIds = [];

/** Common setup before all tests. */
async function commonBeforeAll() {
  // Delete all entries from users and companies tables
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM companies");

  // Insert sample companies into the companies table
  await Company.create(
      {
        handle: "c1",
        name: "C1",
        numEmployees: 1,
        description: "Desc1",
        logoUrl: "http://c1.img",
      });
  await Company.create(
      {
        handle: "c2",
        name: "C2",
        numEmployees: 2,
        description: "Desc2",
        logoUrl: "http://c2.img",
      });
  await Company.create(
      {
        handle: "c3",
        name: "C3",
        numEmployees: 3,
        description: "Desc3",
        logoUrl: "http://c3.img",
      });

  // Insert sample jobs into the jobs table and store their IDs in testJobIds
  testJobIds[0] = (await Job.create(
      { title: "J1", salary: 1, equity: "0.1", companyHandle: "c1" })).id;
  testJobIds[1] = (await Job.create(
      { title: "J2", salary: 2, equity: "0.2", companyHandle: "c1" })).id;
  testJobIds[2] = (await Job.create(
      { title: "J3", salary: 3, /* equity null */ companyHandle: "c1" })).id;

  // Register sample users
  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  // Apply user u1 to job with id testJobIds[0]
  await User.applyToJob("u1", testJobIds[0]);
}

/** Common setup before each test. */
async function commonBeforeEach() {
  await db.query("BEGIN");
}

/** Common cleanup after each test. */
async function commonAfterEach() {
  await db.query("ROLLBACK");
}

/** Common cleanup after all tests. */
async function commonAfterAll() {
  await db.end();
}

// Create tokens for sample users
const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  u2Token,
  adminToken,
};

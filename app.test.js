const request = require("supertest");

const app = require("./app");
const db = require("./db");

// Test case for handling 404 errors for non-existent paths
test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

// Test case for handling 404 errors for non-existent paths with stack print
test("not found for site 404 (test stack print)", async function () {
  process.env.NODE_ENV = "";
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
  delete process.env.NODE_ENV;
});

// Close the database connection after all tests
afterAll(function () {
  db.end();
});

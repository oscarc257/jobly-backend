"use strict";

describe("config can come from env", function () {
  // Test case for checking if configuration values can be set from environment variables
  test("works", function() {
    // Set environment variables
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    // Require the config module to load the configuration
    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("other");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    // Clean up environment variables
    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    // Check default values
    expect(config.getDatabaseUri()).toEqual("jobly");
    process.env.NODE_ENV = "test";

    // Check test environment values
    expect(config.getDatabaseUri()).toEqual("jobly_test");
  });
})


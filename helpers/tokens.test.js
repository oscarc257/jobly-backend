const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

// hardcoded-credentials Embedding credentials in source code risks unauthorized access

describe("createToken", function () {
  // Test case for creating a token for a non-admin user
  test("works: not admin", function () {
    const token = createToken({ username: "test", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number), // Expect the issued at timestamp to be a number
      username: "test",
      isAdmin: false,
    });
  });

  // Test case for creating a token for an admin user
  test("works: admin", function () {
    const token = createToken({ username: "test", isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number), // Expect the issued at timestamp to be a number
      username: "test",
      isAdmin: true,
    });
  });

  // Test case for creating a token with default isAdmin value (false)
  test("works: default no admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number), // Expect the issued at timestamp to be a number
      username: "test",
      isAdmin: false,
    });
  });
});

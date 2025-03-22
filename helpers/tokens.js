const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** 
 * Create a signed JWT from user data.
 * 
 * @param {Object} user - The user object containing user data.
 * @param {string} user.username - The username of the user.
 * @param {boolean} user.isAdmin - Whether the user is an admin.
 * 
 * @returns {string} - The signed JWT.
 */
function createToken(user) {
  // Ensure the user object has the isAdmin property
  console.assert(user.isAdmin !== undefined,
      "createToken passed user without isAdmin property");

  // Create the payload for the JWT
  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  // Sign and return the JWT
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };

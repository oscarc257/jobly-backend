"use strict";

// Import the Express application and configuration settings
const app = require("./app");
const { PORT } = require("./config");

// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});

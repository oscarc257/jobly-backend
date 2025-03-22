const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  // Test case for updating a single field
  test("works: 1 item", function () {
    const result = sqlForPartialUpdate(
        { f1: "v1" }, // Data to update
        { f1: "f1", fF2: "f2" } // Mapping of JS field names to SQL column names
    );
    expect(result).toEqual({
      setCols: "\"f1\"=$1", // Expected SET clause
      values: ["v1"], // Expected values array
    });
  });

  // Test case for updating two fields
  test("works: 2 items", function () {
    const result = sqlForPartialUpdate(
        { f1: "v1", jsF2: "v2" }, // Data to update
        { jsF2: "f2" } // Mapping of JS field names to SQL column names
    );
    expect(result).toEqual({
      setCols: "\"f1\"=$1, \"f2\"=$2", // Expected SET clause
      values: ["v1", "v2"], // Expected values array
    });
  });
});

const assert = require("node:assert/strict");
const c = require("./core.js");
assert.equal(c.validate(c.sample), "");
assert.match(c.validate({ ...c.sample, name: "  " }), /name/);
assert.deepEqual(c.skills(" HTML, ,CSS "), ["HTML", "CSS"]);
assert.deepEqual(c.lines("\n a \n \n b"), ["a", "b"]);
assert.deepEqual(
  c.sections({ education: "", experience: "  ", projects: "Project" }),
  ["projects"],
);
assert.equal(c.sample.email, "alex.morgan@example.com");
console.log("6 helper assertions passed");

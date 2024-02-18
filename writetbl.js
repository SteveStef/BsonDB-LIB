const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);
const prodPath = path.join(dir, '../../tables.json');
// const devPath = path.join(dir, 'tables.json');

(() => {
  try {
    const basicTable = [
      {
        name: "Example_Table",
        identifier: "email",
        requires: ["email", "password"],
        entryTemplate: {email: "string", password: "string", age: "number", friendsList: "object"},
      },
    ];
    const content = { databaseID: "Put your database id here", tables: basicTable };
    fs.writeFileSync(prodPath, JSON.stringify(content, null,  2));
    console.info("Tables.json created successfully");
  } catch(err) {
    console.error(err);
  }
})();


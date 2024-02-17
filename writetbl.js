const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);
const prodPath = path.join(dir, '../../tables.json');
// const devPath = path.join(dir, 'tables.json');

(() => {
  try {
    const basicTable = [
      {
        name: "Example Table 1",
        requiredFields: ["email", "password"],
      },
      {
        name: "Example Table 2",
        requiredFields: ["message", "author"],
      }, 
    ];
    const content = { databaseID: "Put your database id here", tables: basicTable };
    fs.writeFileSync(prodPath, JSON.stringify(content, null,  2));
    console.log("tables.json created successfully");
  } catch(err) {
    console.log(err);
  }
})();


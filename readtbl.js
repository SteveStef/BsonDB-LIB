#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);

const prodPath = path.join(dir, '../../tables.json');
// const devPath = path.join(dir, 'tables.json');

const { createTable } = require('./index.js');

(async () => {
  try {
    const data = fs.readFileSync(prodPath, 'utf8');
    const { databaseID, tables } = JSON.parse(data);
    for(let i = 0; i < tables.length; i++) { tables[i].entries = {}; }
    const response = await createTable(databaseID, tables);
    if(response.error) {
      console.log("Error creating tables:");
      console.log(response.error);
      return;
    }
    console.log(response.message);
  } catch(err) {
    console.log("Error reading tables.json:");
    console.log(err);
  }
})();


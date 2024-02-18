#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);

const prodPath = path.join(dir, '../../tables.json');
// const devPath = path.join(dir, 'tables.json');

const BsonDB = require('./index.js');

(async () => {
  try {
    const data = fs.readFileSync(prodPath, 'utf8');
    const { databaseID, tables } = JSON.parse(data);
    const db = new BsonDB(databaseID);
    const validTypes = ['string', 'number', 'boolean', 'object'];
    for(let i = 0; i < tables.length; i++) { 
      tables[i].entries = {}; 
      for(let key in tables[i].entryTemplate) {
        if(!validTypes.includes(tables[i].entryTemplate[key])) {
          console.log(`Invalid type for ${key} in ${tables[i].name}`);
          console.log("Valid types are: string, number, boolean, object");
          return;
        }
      }
    }
    const response = await db.createTable(tables);
    if(response.error) {
      console.log("Error creating tables:");
      console.log(response.error);
      return;
    }

    console.log("Tables created successfully");
    console.log("Go to https://bsondb.com/api/database/" + databaseID + " to view your database.");

  } catch(err) {
    console.log("Error reading tables.json:");
    console.log(err);
  }
})();


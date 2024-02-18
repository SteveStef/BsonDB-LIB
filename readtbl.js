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
          console.error(`Invalid type for ${key} in ${tables[i].name}`);
          console.error("Valid types are: string, number, boolean, object");
          return;
        }
      }
    }
    const response = await db.createTable(tables);
    if(response.error) {
      console.error("Error creating tables:");
      console.error(response.error);
      return;
    }

    console.info("Tables created successfully");
    console.info("Go to https://bsondb.up.railway.app/api/database/" + databaseID + " to view your database.");

  } catch(err) {
    console.error("Error reading tables.json:");
    console.error(err);
  }
})();


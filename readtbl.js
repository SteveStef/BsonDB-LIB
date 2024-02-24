#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dir = path.dirname(__filename);
const prodPath = path.join(dir, '../../tables.json');
// const devPath = path.join(dir, 'tables.json');

const server = "https://bsondb.up.railway.app";
const defaultHeaders = {'Content-Type': 'application/json'};

async function apiRequest (method, path, body = null) {
  const requestOptions = {
    method,
    headers: defaultHeaders,
    ...(body && { body: JSON.stringify(body) })
  };
  const url = `${server}${path}`;
  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    return null;
  }
};

async function createTable(databaseId, tables) {
  return await apiRequest('POST', `/api/migrate-tables/${databaseId}`, tables);
}

(async () => {
  try {
    const data = fs.readFileSync(prodPath, 'utf8');
    const { databaseID, tables } = JSON.parse(data);
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
    const response = await createTable(databaseID, tables);
    if(response.error) {
      console.error("Error creating tables:");
      console.error(response.error);
      return;
    }

    console.info("Tables created successfully");
    console.info("Go to https://bsondb.netlify.app/ to view your database.");

  } catch(err) {
    console.error("Error reading tables.json:");
    console.error(err);
  }
})();


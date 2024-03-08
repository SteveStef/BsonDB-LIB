#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const dir = path.dirname(__filename);
const prodPath = path.join(dir, '../../tables.json');

let server = "https://bsondb.up.railway.app";

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
 let body = { databaseId, tables };
 return await apiRequest('POST', `/api/migrate-tables`, body);
}

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Ask for confirmation
rl.question('Are you sure you want to continue? All table data will be lost. (yes/no): ', (answer) => {
 if (answer.toLowerCase() === 'yes') {
    (async () => {
      try {
        const data = fs.readFileSync(prodPath, 'utf8');
        const { databaseID, tables } = JSON.parse(data);
        const validTypes = ['string', 'number', 'boolean', 'object'];
        for(let i = 0; i < tables.length; i++) { 
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

        console.info("\n");
        console.info("Tables created successfully");
        console.info("Go to https://bsondb.netlify.app/ to view your database.");
        console.info("\n");

      } catch(err) {
        console.error("Error reading tables.json");
        console.error(err);
      }
    })();
 } else {
    console.log('The migration has been canceled.');
 }
 rl.close();
});

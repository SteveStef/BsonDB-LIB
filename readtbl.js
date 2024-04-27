#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const axios = require('axios');

const dir = path.dirname(__filename);
const prodPath = path.join(dir, '../../tables.json');

let server = "https://bsondb.up.railway.app";

const defaultHeaders = {'Content-Type': 'application/json'};

async function apiRequest(method, path, body = null) {
 const url = `${server}${path}`;
 try {
    const response = await axios({
      method,
      url,
      headers: defaultHeaders,
      data: body ? JSON.stringify(body) : undefined
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("There was an error when generating tables: " + error.response.data.error);
      return error.response.data
    }
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

rl.question('Are you sure you want to continue? All table data will be lost. (yes/no): ', (answer) => {
 if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    (async () => {
      try {
        const data = fs.readFileSync(prodPath, 'utf8');
        const { databaseID, tables } = JSON.parse(data);
        const validTypes = ['string', 'number', 'boolean', 'object'];
        for(let i = 0; i < tables.length; i++) { 

          if(!tables[i].identifier || !tables[i].name || !tables[i].entryTemplate || !tables[i].requires) {
            console.error("Invalid table object");
            console.error("Table object must have identifier, name, entryTemplate, and requires properties");
            return;
          }

          for(let key in tables[i].entryTemplate) {
            if(!validTypes.includes(tables[i].entryTemplate[key])) {
              console.error(`Invalid type for ${key} in ${tables[i].name}`);
              console.error("Valid types are: string, number, boolean, object");
              return;
            }
          }
          if(tables[i].entryTemplate[tables[i].identifier] !== "string") {
            console.error("Identifier must be of type string");
            return;
          }
        }

        const response = await createTable(databaseID, tables);
        if(response.error) {
          console.error("Error creating tables:");
          console.error(response.error);
          return;
        }

        console.info(`${tables.length} tables have been created successfully.`);
        console.info("Go to https://bson-api.com/ to view your database.");

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

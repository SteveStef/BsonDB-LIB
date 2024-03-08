# Version 1.3.4

# Introduction

Bson Database API Documentation.
This README provides an overview of the BSON Database library, 
including the available functions and their usage. 

In order to get a key please visit bsondb.netlify.app
Here you are able to View/create/delete your database.

**Do NOT store any sensitive data in BsonDB for the time being
as this database is still in beta.

# Website Signup

Visit bsondb.netlify.app to create a bsondb account.
After signing up, you will be prompted with a database connection string

# Installation / Setup

`npm install bsondb-api`

After installation you will notice that it generates a tables.json
file in your root directoy. Here you may design the stuctures of your
tables. Place you database connection string at the `databaseID` field.

After designing your tables, enter the command:

`npx bsondb-migrate`

This commands will migrate your current table structures into your database.
Please note that when you are defining your types, the only available types
are `string`, `number`, `boolean`, `object`. Use the `object` type for all
types that are not primitive.

# Usage

`node`

# All Functions

```js

// =======================Example========================
const BsonDB = require("bsondb-api");
const db = new BsonDB(process.env.DATABASE_ID);
db.getTable("Example_Table").then(response => console.log(response));
// ======================================================

/**
 * Retrieves a specific table within a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the table object or An error object on fail.
 */
function getTable(tableName) { /* ... */ }

/**
 * Fetches a particular entry from a table within a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table containing the entry.
 * @param {object} query - an object that contains { where: identifier }
 * @returns {Promise<Object>} A promise that resolves to the entry object or an error object.
 */
function getEntry(tableName, query) { /* ... */ }

/**
 * Obtains a specific field value from an entry within a table in a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table containing the entry.
 * @param {object} query - an object that contains { where: identifier, get: field }
 * @returns {Promise<Object>} A promise that resolves to the field value or an error object.
 */
function getField(tableName, query) { /* ... */ }

/**
 * Adds a new entry to a table within a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table to add the entry to.
 * @param {object} data - an object that you want to store 
 * @returns {Promise<Object>} A promise that resolves to the entry addition result or an error object.
 */
function createEntry(tableName, data) { /* ... */ }

/**
 * Updates an entry within a table in a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table containing the entry.
 * @param {Object} query - an object in the form { where: identifier, set: { field: value } }
 * @returns {Promise<Object>} A promise that resolves to the entry update result or an error object.
 */
function updateEntry(tableName, query) { /* ... */ }

/**
 * Deletes an entire entry within a table in a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table containing the entry.
 * @param {object} - query - an object in the form { where: 'value' }
 * @returns {Promise<Object>} A promise that resolves to the entry update result or an erro object.
 */
function deleteEntry(tableName, query) { /* ... */ }

/**
 * Deletes an entire entry within a table in a database.
 * @async
 * @function
 * @param {string} tableName - The name of the table containing the entry.
 * @param {object} query - an object in the form { where: field, is: value }
 * @returns {Promise<Object>} A promise that returns a list of all occurances of the key value pair in that table or an error obect.
 */
function getEntries(tableName, query) { /* ... */ }
```

# More info
You are unable to post more than 1 MB of data to BsonDB in a single request due
to memory limitaions

If you are not recieving a verification code, try again tomorrow, the number of
emails I can send per day is limited.

Normal users are unable to create/delete their own database through this npm 
library, please visit bsondb.netlify.app to create/delete a database.

If you have any questions/suggestions or concerns about BsonDB please contact me
through my email: stephenstef456@gmail.com


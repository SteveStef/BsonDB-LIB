
# Introduction

BSON Database API Documentation
This README provides an overview of the BSON Database library, 
including the available functions and their usage. 
The API is designed to interact with a remote server hosting BSON 
databases, providing CRUD operations for databases, tables, and entries.

This is an library to make using my bson api easy 
BsonDB-api is a non-relational database written in golang 

# Installation

`npm install bsondb-api`

# Usage

`node`

# All Functions

```js
/**
 * Fetches the database with the given ID from the remote server.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @returns {Promise<Object|null>} A promise that resolves to the database object or null if an error occurs.
 */
function getDatabase(id) { /* ... */ }

/**
 * Retrieves a specific table within a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the table object or null if an error occurs.
 */
function getTable(id, tableName) { /* ... */ }

/**
 * Fetches a particular entry from a table within a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table containing the entry.
 * @param {string} entryId - The unique identifier of the entry within the table.
 * @returns {Promise<Object|null>} A promise that resolves to the entry object or null if an error occurs.
 */
function getEntry(id, tableName, entryId) { /* ... */ }

/**
 * Obtains a specific field value from an entry within a table in a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table containing the entry.
 * @param {string} entryId - The unique identifier of the entry within the table.
 * @param {string} field - The name of the field to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the field value or null if an error occurs.
 */
function getField(id, tableName, entryId, field) { /* ... */ }

/**
 * Creates a new table within a database with specified required fields.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table to create.
 * @param {Array<string>} requiredFields - An array of strings specifying the required fields for the table.
 * @returns {Promise<Object|null>} A promise that resolves to the table creation result or null if an error occurs.
 */
function createTable(id, tableName, requiredFields) { /* ... */ }

/**
 * Adds a new entry to a table within a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table to add the entry to.
 * @param {string} entryId - The unique identifier for the new entry.
 * @param {Object} entry - An object representing the entry with key-value pairs.
 * @returns {Promise<Object|null>} A promise that resolves to the entry addition result or null if an error occurs.
 */
function createEntry(id, tableName, entryId, entry) { /* ... */ }

/**
 * Updates a specific field in an entry within a table in a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table containing the entry.
 * @param {string} entryId - The unique identifier of the entry within the table.
 * @param {Object} field - An object with one property representing the updated field and its value.
 * @returns {Promise<Object|null>} A promise that resolves to the field update result or null if an error occurs.
 */
function updateField(id, tableName, entryId, field) { /* ... */ }

/**
 * Updates an entire entry within a table in a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table containing the entry.
 * @param {string} entryId - The unique identifier of the entry within the table.
 * @param {Object} entry - An object representing the updated entry with key-value pairs.
 * @returns {Promise<Object|null>} A promise that resolves to the entry update result or null if an error occurs.
 */
function updateEntry(id, tableName, entryId, entry) { /* ... */ }

/**
 * Deletes a table from a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table to delete.
 * @returns {Promise<Object|null>} A promise that resolves to the table deletion result or null if an error occurs.
 */
function deleteTable(id, tableName) { /* ... */ }

/**
 * Deletes an entire entry within a table in a database.
 * @async
 * @function
 * @param {string} id - The unique identifier of the database.
 * @param {string} tableName - The name of the table containing the entry.
 * @param {string} entryId - The unique identifier of the entry within the table.
 * @returns {Promise<Object|null>} A promise that resolves to the entry update result or null if an error occurs.
 */
function deleteEntry(id, tableName, entryId) { /* ... */ }
```


# Introduction

This is an library to make using my bson api easy 
BsonDB-api is a non-relational database written in golang 

# Installation

`npm install bsondb-api`

# Usage

`node`

** all functions are async

```js
createDatabase(): Creates a new database.
    No parameters are needed.
    Returns an id that is used to reference the database in the future DO NOT LOSE IT!

createTable(id, table, requires): Creates a new table within a database.
    id: A string representing the database ID.
    table: a string representing the name of the table. Ex. "users".
    requires: an array of string representing the types of fields. Ex. ["email", "password"].
    Returns an object containing a message on if it was successful.

updateFieldInTable(id, table, entryId, field): Updates a specific field in an entry of a table.
    id: A string representing the database ID.
    table: A string representing the table name.
    entryId: A string representing the entry ID think of this as an identifier for a user entry.
    field: An object with a single key-value pair representing the field to update.
    Returns an object containing a message on if it was successful.

updateEntryInTable(id, table, entryId, entry): Updates an entire entry in a table.
    id: A string representing the database ID.
    table: A string representing the table name.
    entryId: A string representing the entry ID.
    entry: An object representing the updated entry data.
    Returns a Promise that resolves to the data returned from the API upon successful update of the entry.

deleteDatabase(id): Deletes a database.
    id: A string representing the database ID.
    Returns a Promise that resolves to the data returned from the API upon successful deletion of the database.

addEntry(id, table, entry): Adds an entry to a table.
    id: A string representing the database ID.
    table: A string representing the table name.
    entry: An object representing the entry data to be added.
    Returns a Promise that resolves to the data returned from the API upon successful addition of the entry.

deleteTable(id, table): Deletes a table from a database.
    id: A string representing the database ID.
    table: A string representing the table name.
    Returns a Promise that resolves to the data returned from the API upon successful deletion of the table.

GetDatabase(id): Retrieves information about a database.
    id: A string representing the database ID.
    Returns a Promise that resolves to the data returned from the API upon successful retrieval of the database information.

GetTable(id, tableName): Retrieves information about a table within a database.
    id: A string representing the database ID.
    tableName: A string representing the table name.
    Returns a Promise that resolves to the data returned from the API upon successful retrieval of the table information.

GetEntry(id, tableName, entryId): Retrieves an entry from a table within a database.
    id: A string representing the database ID.
    tableName: A string representing the table name.
    entryId: A string representing the entry ID.
    Returns a Promise that resolves to the data returned from the API upon successful retrieval of the entry.

GetField(id, tableName, entryId, field): Retrieves a specific field from an entry in a table within a database.
    id: A string representing the database ID.
    tableName: A string representing the table name.
    entryId: A string representing the entry ID.
    field: A string representing the field name.
    Returns a Promise that resolves to the data returned from the API upon successful retrieval of the field.
```


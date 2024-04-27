# Version 1.4.4

# Introduction

Bson Database API Documentation.
This README provides an overview of the BSON Database library, 
including the available functions and their usage. 

In order to get a key please visit bsondb.netlify.app
Here you are able to View/create/delete your database.

**Do NOT store any sensitive data in BsonDB for the time being
as this database is still in beta.

# Website Signup

Visit https://bson-api.com/ to create a bsondb account.
After signing up, you will be prompted with a database connection string
After you recieve this connection string move on to the next step.

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

const BsonDB = require("bsondb-api");
const db = new BsonDB(process.env.DATABASE_ID);
db.getTable("Example_Table").then(table => console.log(table));

db.createEntry("Example_Table",{
    email: "john@gmail.com",
    password: "password123",
    age: 24,
    friendsList: ["Mike", "Steve"]
}).then(response => console.log(response));

db.updateEntry("Example_Table", {
    where: "john@gmail.com",
    set: {password: "password321", age: 25}
}).then(response => console.log(response));

db.getEntry("Example_Table", {
    where: "john@gmail.com"
}).then(entry => console.log(entry));

db.getField("Example_Table", {
    where: "john@gmail.com",
    get: "friendsList"
}).then(friends => console.log(friends));

db.getEntries("Example_Table", {
    where: "age", is: 25
}).then(entries => console.log(entries));


db.deleteEntry("Example_Table", {
    where: "john@gmail.com"
}).then(deleted => console.log(deleted));

```

# More info
You are unable to post more than 1 MB of data to BsonDB in a single request due
to memory limitaions

Users are unable to create/delete their own database through this npm 
library, please visit https://bson-api.com/ to create/delete a database.

If you have any questions/suggestions or concerns about BsonDB please contact me
through my email: stephenstef456@gmail.com


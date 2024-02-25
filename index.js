const fetch = require('node-fetch');
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
    console.error("Internal Server Error");
    return null;
  }
};

class BsonDB {
  constructor(databaseId) {
    this.databaseId = databaseId;
  }

  async updateEntry(table, query) {
    if(!query || !query.where || !query.set) {
      console.error("Invalid query, use the form {where: string, set: object}");
      return null;
    }
    const body = { databaseId: this.databaseId, table, entryId: query.where, entry: query.set };
    return await apiRequest('PUT', `/api/update-field`, body);
  }

  async deleteEntry(table, query) {
    if(!query || !query.where) {
      console.error("Invalid query, use the form {where: 'value'}");
      return null;
    }
    let body = { databaseId: this.databaseId, table, entryId: query.where };
    return await apiRequest('POST', `/api/delete-entry`, body);
  }

  async createEntry(tableName, entry) {
    let body = { databaseId: this.databaseId, table: tableName, entry };
    return await apiRequest('POST', `/api/add-entry`, body);
  }

  async getDatabase() {
    let body = { databaseId: this.databaseId };
    return await apiRequest("POST", `/api/database`, body);
  }

  async getTable(tableName) {
    let body = { databaseId: this.databaseId, table: tableName};
    return await apiRequest("POST", `/api/table`, body);
  }

  async getEntry(tableName, query) {
    if(!query || !query.where) {
      console.error("Invalid query, use the form {where: 'value'}");
      return null;
    }
    let body = { databaseId: this.databaseId, table: tableName, entryId: query.where };
    return await apiRequest("POST",`/api/entry`, body);
  }

  async getField(tableName, query) {
    if(!query || !query.where || !query.get) {
      console.error("Invalid query, use the form {where: 'value', find: 'value'}");
      return null;
    }
    let body = { databaseId: this.databaseId, table: tableName, entryId: query.where, field: query.get };
    return await apiRequest("POST",`/api/field`, body);
  }

  async getEntries(tableName, query) {
    if(!query || !query.where || !query.is) {
      console.error("Invalid query, use the form {where: 'value', is: 'value'}");
      return null;
    }
    let key = query.where;
    let value = query.is;
    let body = { databaseId: this.databaseId, table: tableName, field: key, value };
    return await apiRequest("POST", `/api/entries`, body);
  }
}

module.exports = BsonDB;

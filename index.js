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
    return null;
  }
};

async function get(path) {
  return await this.apiRequest('GET', path);
}

class BsonDB {
  constructor(databaseId) {
    this.databaseId = databaseId;
  }

  /*async createDatabase(auth, email) {
    defaultHeaders['Authorization'] = auth;
    let result = await apiRequest('POST', '/api/createdb', {email});
    defaultHeaders['Authorization'] = null;
    return result;
  }*/

  async createTable(tables) {
    return await apiRequest('POST', `/api/migrate-tables/${this.databaseId}`, tables);
  }

  async updateField(table, entryId, object) {
    return await apiRequest('PUT', `/api/update-field/${this.databaseId}/${table}/${entryId}`, object);
  }

  async updateEntry(table, entryId, entry) {
    return await apiRequest('PUT', `/api/update-entry/${this.datbase}/${table}/${entryId}`, entry);
  }

  /*async deleteDatabase(auth, email) {
    defaultHeaders['Authorization'] = auth;
    let result = await apiRequest('POST', `/api/deletedb/${this.databaseId}`, {email});
    defaultHeaders['Authorization'] = null;
    return result;
  }*/

  async deleteTable(table) {
    return await apiRequest('DELETE', `/api/delete-table/${this.databaseId}/${table}`);
  }

  async deleteEntry(table, entryId) {
    return await apiRequest('DELETE', `/api/delete-entry/${this.databaseId}/${table}/${entryId}`);
  }

  async createEntry(tableName, entryId, entry) {
    return await apiRequest('POST', `/api/add-entry/${this.databaseId}/${tableName}/${entryId}`, entry);
  }



  async getDatabase() {
    return await get(`/api/database/${this.databaseId}`);
  }

  async getTable(tableName) {
    return await get(`/api/table/${this.databaseId}/${tableName}`);
  }

  async getEntry(tableName, entryId) {
    return await get(`/api/entry/${this.databaseId}/${tableName}/${entryId}`);
  }

  async getField(tableName, entryId, field) {
    return await get(`/api/field/${this.databaseId}/${tableName}/${entryId}/${field}`);
  }

  async getEntries(tableName, field, value) {
    return await get(`/api/entries/${this.databaseId}/${tableName}/${field}/${value}`);
  }

  /*async checkAccount(email, code, auth) {
    defaultHeaders['Authorization'] = auth;
    let response = await apiRequest('POST', `/api/check-account`, { email, code });
    defaultHeaders['Authorization'] = null;
    return response;
  }*/
}

module.exports = BsonDB;

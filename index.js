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
  return await apiRequest('GET', path);
}

class BsonDB {
  constructor(databaseId) {
    this.databaseId = databaseId;
  }

  async updateEntry(table, query) {
    if(!query || !query.where || !query.data) {
      console.error("Invalid query, use the form {where: string, data: object}");
      return null;
    }
    return await apiRequest('PUT', `/api/update-field/${this.databaseId}/${table}/${query.where}`, query.data);
  }

  /*async createDatabase(auth, email) {
    defaultHeaders['Authorization'] = auth;
    let result = await apiRequest('POST', '/api/createdb', {email});
    defaultHeaders['Authorization'] = null;
    return result;
  }*/

  /*async deleteDatabase(auth, email) {
    defaultHeaders['Authorization'] = auth;
    let result = await apiRequest('POST', `/api/deletedb/${this.databaseId}`, {email});
    defaultHeaders['Authorization'] = null;
    return result;
  }*/

  /*async checkAccount(email, code, auth) {
    defaultHeaders['Authorization'] = auth;
    let response = await apiRequest('POST', `/api/check-account`, { email, code });
    defaultHeaders['Authorization'] = null;
    return response;
  }*/

  /*
  async deleteTable(table) {
    return await apiRequest('DELETE', `/api/delete-table/${this.databaseId}/${table}`);
  }*/

  async deleteEntry(table, query) {
    if(!query || !query.where) {
      console.error("Invalid query, use the form {where: 'value'}");
      return null;
    }
    return await apiRequest('DELETE', `/api/delete-entry/${this.databaseId}/${table}/${query.where}`);
  }

  async createEntry(tableName, entry) {
    return await apiRequest('POST', `/api/add-entry/${this.databaseId}/${tableName}`, entry);
  }

  async getDatabase() {
    return await get(`/api/database/${this.databaseId}`);
  }

  async getTable(tableName) {
    return await get(`/api/table/${this.databaseId}/${tableName}`);
  }

  async getEntry(tableName, query) {
    if(!query || !query.where) {
      console.error("Invalid query, use the form {where: 'value'}");
      return null;
    }
    return await get(`/api/entry/${this.databaseId}/${tableName}/${query.where}`);
  }

  async getField(tableName, query) {
    if(!query || !query.where || !query.find) {
      console.error("Invalid query, use the form {where: 'value', find: 'value'}");
      return null;
    }
    return await get(`/api/field/${this.databaseId}/${tableName}/${query.where}/${query.find}`);
  }

  async getEntries(tableName, property) {
    let key = Object.keys(property)[0];
    let value = property[key];
    return await get(`/api/entries/${this.databaseId}/${tableName}/${key}/${value}`);
  }
}

module.exports = BsonDB;

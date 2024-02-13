const fetch = require('node-fetch');
let server = "https://bsondb.up.railway.app";
const defaultHeaders = {'Content-Type': 'application/json'};

const apiRequest = async (method, path, body = null) => {
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

async function createDatabase() {
  return await apiRequest('POST', '/api/createdb', { tables: [] });
}

async function createTable(id, tableName, fields) {
  let table = { name: tableName, requires: fields, entries: {} };
  return await apiRequest('POST', `/api/add-table/${id}`, table);
}

async function updateField(id, table, entryId, object) {
  return await apiRequest('PUT', `/api/update-field/${id}/${table}/${entryId}`, object);
}

async function updateEntry(id, table, entryId, entry) {
  return await apiRequest('PUT', `/api/update-entry/${id}/${table}/${entryId}`, entry);
}

async function deleteDatabase(id) {
  return await apiRequest('DELETE', `/api/deletedb/${id}`);
}

async function deleteTable(id, table) {
  return await apiRequest('DELETE', `/api/delete-table/${id}/${table}`);
}

async function deleteEntry(id, table, entryId) {
  return await apiRequest('DELETE', `/api/delete-entry/${id}/${table}/${entryId}`);
}

async function createEntry(id, tableName, entryId, entry) {
  return await apiRequest('POST', `/api/add-entry/${id}/${tableName}/${entryId}`, entry);
}


async function get(path) {
  return await apiRequest('GET', path);
}

async function getDatabase(id) {
  return await get(`/api/readdb/${id}`);
}

async function getTable(id, tableName) {
  return await get(`/api/${id}/${tableName}`);
}

async function getEntry(id, tableName, entryId) {
  return await get(`/api/${id}/${tableName}/${entryId}`);
}

async function getField(id, tableName, entryId, field) {
  return await get(`/api/${id}/${tableName}/${entryId}/${field}`);
}

module.exports = {
  createDatabase,
  createTable,
  updateField,
  updateEntry,
  deleteDatabase,
  createEntry,
  deleteTable,
  getDatabase,
  getTable,
  getEntry,
  getField,
  deleteEntry
};

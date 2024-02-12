const fetch = require('node-fetch');
const server = "https://bsondb.up.railway.app";
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
    throw error;
  }
};

async function createDatabase() {
  return await apiRequest('POST', '/api/createdb', { tables: [] });
}

async function createTable(id, tableName, fields) {
  let table = { name: tableName, requires: fields, entries: [] };
  return await apiRequest('POST', `/api/add-table/${id}`, table);
}

async function updateField(id, table, entryId, field) {
  let entryField = {key: Object.keys(field)[0], value: Object.values(field)[0]};
  return await apiRequest('PUT', `/api/update-field/${id}/${table}/${entryId}`, entryField);
}

async function updateEntry(id, table, entryId, entry) {
  let fields = [];
  for (const key in entry) {
    fields.push({key: key, value: entry[key]});
  }
  let entryData = {id: entryId, fields: fields};
  return await apiRequest('PUT', `/api/update-entry/${id}/${table}/${entryId}`, entryData);
}

async function deleteDatabase(id) {
  return await apiRequest('DELETE', `/api/deletedb/${id}`);
}

async function addEntry(id, tableName, entryId, entry) {
  let fields = [];
  for (const key in entry) {
    fields.push({key: key, value: entry[key]});
  }
  return await apiRequest('POST', `/api/add-entry/${id}/${tableName}`, {id: entryId, fields: fields});
}

async function deleteTable(id, table) {
  return await apiRequest('DELETE', `/api/delete-table/${id}/${table}`);
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
  addEntry,
  deleteTable,
  getDatabase,
  getTable,
  getEntry,
  getField,
};

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

async function createDatabase(auth, email) {
  defaultHeaders['Authorization'] = auth;
  let result = await apiRequest('POST', '/api/createdb', {email});
  defaultHeaders['Authorization'] = null;
  return result;
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

async function deleteDatabase(id, auth, email) {
  defaultHeaders['Authorization'] = auth;
  let result = await apiRequest('POST', `/api/deletedb/${id}`, {email});
  defaultHeaders['Authorization'] = null;
  return result;
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
  return await get(`/api/database/${id}`);
}

async function getTable(id, tableName) {
  return await get(`/api/table/${id}/${tableName}`);
}

async function getEntry(id, tableName, entryId) {
  return await get(`/api/entry/${id}/${tableName}/${entryId}`);
}

async function getField(id, tableName, entryId, field) {
  return await get(`/api/field/${id}/${tableName}/${entryId}/${field}`);
}

async function getEnties(id, tableName, field, value) {
  return await get(`/api/field/${id}/${tableName}/${field}/${value}`);
}

async function checkAccount(email, code, auth) {
  defaultHeaders['Authorization'] = auth;
  let response = await apiRequest('POST', `/api/check-account`, { email, code });
  defaultHeaders['Authorization'] = null;
  return response;
}


module.exports = {
  createDatabase,
  createTable,
  createEntry,

  updateField,
  updateEntry,

  deleteTable,
  deleteDatabase,
  deleteEntry,

  getDatabase,
  getTable,
  getEntry,
  getField,
  getEnties,

  checkAccount
};

const fetch = require('node-fetch');

const server = "https://bsondb.up.railway.app";

const req = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

async function createDatabase() {
  const body = {tables: []};
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const url = server+"/api/createdb";
  const data = await req(url, requestOptions)
  return data;
}

async function createTable(id, table) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(table),
  };
  const url = server+"/api/add-table/"+id;
  const data = await req(url, requestOptions)
  return data;
}


async function updateFieldInTable(id, table, entryId, field) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(field),
  };
  const url = `${server}/api/update-field/${id}/${table}/${entryId}`;
  const response = await req(url, requestOptions);
  return response;
}

async function updateEntryInTable(id, table, entryId, entry) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  };
  const url = `${server}/api/update-entry/${id}/${table}/${entryId}`;
  const response = await req(url, requestOptions);
  return response;
}

async function deleteDatabase(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const url = `${server}/api/deletedb/${id}`;
  const response = await req(url, requestOptions);
  return response;
}


async function addEntry(id, table, entry) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  };
  const url = `${server}/api/add-entry/${id}/${table}`;
  const response = await req(url, requestOptions);
  return response;
}

async function deleteTable(id, table) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const url = `${server}/api/delete-table/${id}/${table}`;
  console.log(url);
  const response = await req(url, requestOptions);
  return response;
}


async function GetDatabase(id) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const url = `${server}/api/readdb/${id}`;
    const response = await req(url, requestOptions);
    return response;
  } catch(error) {
    return null;
  }
}

async function GetTable(id, tableName) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const url = `${server}/api/${id}/${tableName}`;
    const response = await req(url, requestOptions);
    return response;
  } catch(error) {
    return null;
  }
}

async function GetEntry(id, tableName, entryId) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const url = `${server}/api/${id}/${tableName}/${entryId}`;
    const response = await req(url, requestOptions);
    return response;
  } catch(error) {
    return null;
  }
}

async function GetField(id, tableName, entryId, field) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const url = `${server}/api/${id}/${tableName}/${entryId}/${field}`;
    const response = await req(url, requestOptions);
    return response;
  } catch(error) {
    return null;
  }
}


async function CreateBsonDB() {
  try {
    let data = await createDatabase();
    return data.id;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function CreateBsonTable(id, tableName, requiredFields) {
  try {
    const table = {
      name: tableName,
      requires: requiredFields,
      entries: []
    };
    const response = await createTable(id, table);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function AddBsonEntry(id, tableName, entryId, entry) {
  try {
    let fields = [];
    for (const key in entry) {
      fields.push({key: key, value: entry[key]});
    }
    let entryData = { 
      id: entryId,
      fields: fields
    }
    const response = await addEntry(id, tableName, entryData);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function UpdateBsonField(id, tableName, entryId, field) {
  try {
    let entryField = {key: Object.keys(field)[0], value: Object.values(field)[0]};
    const response = await updateFieldInTable(id, tableName, entryId, entryField);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function UpdateBsonEntry(id, tableName, entryId, entry) {
  try {

    let fields = [];
    for (const key in entry) {
      fields.push({key: key, value: entry[key]});
    }

    let entryData = {
      id: entryId,
      fields: fields
    }

    const response = await updateEntryInTable(id, tableName, entryId, entryData);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function DeleteBsonTable(id, tableName) {
  try {
    console.log(id, tableName);
    const response = await deleteTable(id, tableName);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

async function DeleteBsonDatabase(id) {
  try {
    const response = await deleteDatabase(id);
    return response;
  } catch(error) {
    console.error('An error occurred:', error);
    return null;
  }
}

const bson = {
  CreateBsonDB,
  CreateBsonTable,
  AddBsonEntry,
  UpdateBsonField,
  UpdateBsonEntry,
  GetDatabase,
  GetTable,
  GetEntry,
  GetField,
  DeleteBsonTable,
  DeleteBsonDatabase
}

module.exports = bson;

// login

const sendLoginToApi = (data) => {
  return fetch('//localhost:4500/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// signup

const sendSingUpToApi = (data) => {
  return fetch('//localhost:4500/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId, data) => {
  return fetch(`//localhost:4500/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getProfileFromApi = (userId) => {
  return fetch(`//localhost:4500/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// user instruments

const getUserInstruments = (userId) => {
  console.log(
    'Se están pidiendo datos de los instrumentos del usuario:',
    userId
  );
  return fetch(`//localhost:4500/api/instruments?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserInstruments: getUserInstruments,
};

export default objToExport;

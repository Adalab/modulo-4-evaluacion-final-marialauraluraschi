const getInstrumentsFromApi = () => {
  console.log('Se están pidiendo los instrumentos de la app');
  return fetch('//localhost:4500/api/instruments')
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getInstrumentDetailFromApi = (id) => {
  console.log(`Se está pidiendo el detalle del instrumento con id ${id}`);
  return fetch(`//localhost:4500/api/instruments/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const getInstrumentsByFamilyFromApi = (familyName) => {
  console.log(`Se están pidiendo los instrumentos de la familia ${familyName}`);
  return fetch(`//localhost:4500/api/instruments?family=${familyName}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getInstrumentsFromApi: getInstrumentsFromApi,
  getInstrumentDetailFromApi: getInstrumentDetailFromApi,
  getInstrumentsByFamilyFromApi: getInstrumentsByFamilyFromApi,
};

export default objToExport;

const getInstrumentDetailFromApi = (id) => {
  console.log(`Se está pidiendo el detalle del instrumento con id ${id}`);
  return fetch(`//localhost:4500/api/instruments/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
const getInstrumentsByFamilyFromApi = (familyName, sortOption) => {
  console.log(`Se están pidiendo los instrumentos de la familia ${familyName}`);
  return fetch(
    `//localhost:4500/api/instruments?family=${familyName}&sort=${sortOption}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getInstrumentDetailFromApi: getInstrumentDetailFromApi,
  getInstrumentsByFamilyFromApi: getInstrumentsByFamilyFromApi,
};

export default objToExport;

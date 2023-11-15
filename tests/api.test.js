//Configurar los módulos que necesito para hacer test

const supertest = require('supertest');
const assert = require('assert');
const server = require('../src/index');
const { error } = require('console');
const api = supertest(server);

describe('API TEST Listar instrumentos', () => {
  test('Comprobar que devuelve un array de instrumentos', async () => {
    await api
      .get('/api/instruments')
      .expect(200)
      .expect('Content-type', /json/)
      .expect((res) => {
        assert(
          Array.isArray(res.body),
          'El cuerpo de la petición devuelve un array'
        );
      });
  });

  test('Comprobar que devuelve un elemento filtrado de los instrumentos', async () => {
    const familyName = 'Cordófonos';
    await api
      .get(`/api/instruments?family=${familyName}`)
      .expect(200)
      .expect('Content-type', /json/)
      .expect((res) => {
        assert(
          Array.isArray(res.body),
          'El cuerpo de la petición devuelve un array'
        );
        assert(res.body.length > 0);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  });
});

describe('API TEST Añadir instrumentos', () => {
  test('Crear un instrumento', async () => {
    const newInstrument = {
      name: 'Guitarra',
      family: 'Cordófonos',
    };
    const response = await api.post('/api/instruments/add').send(newInstrument);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.idNewInstrument).toBeDefined();
  });

  test('Crear un instrumento sin nombre', async () => {
    const newInstrument = {
      name: '',
      family: 'Cordófonos',
    };
    const response = await api.post('/api/instruments/add').send(newInstrument);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
  });
});

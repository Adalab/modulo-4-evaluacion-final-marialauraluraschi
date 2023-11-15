// Imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/conexion');

// Arrancar el servidor
const server = express();

// Configuración del servidor
server.use(cors());
server.use(express.json({ limit: '25mb' }));
server.set('view engine', 'ejs');
// Conexión a la base de datos
dbConnect();

// Poner a escuchar el servidor
const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});

// Endpoints
const instrumentController = require('./controllers/InstrumentsControllers');
const familyController = require('./controllers/FamilyControllers');

// GET http://localhost:4500/api/instruments?family=Cordófonos
// GET http://localhost:4500/api/instruments
server.get('/api/instruments', (req, res) => {
  if (req.query.family) {
    instrumentController.filterByFamily(req, res);
  } else {
    instrumentController.getInstruments(req, res);
  }
});
// GET http://localhost:4500/api/instruments/1
server.get('/api/instruments/:id', (req, res) => {
  instrumentController.detailInstrument(req, res);
});
// POST http://localhost:4500/api/instruments
server.post('/api/instruments', async (req, res) => {
  instrumentController.createInstrument(req, res);
});
// PUT http://localhost:4500/api/instruments/instrumentId
server.put('/api/instruments/:instrumentId', async (req, res) => {
  instrumentController.updateInstrument(req, res);
});
// DELETE http://localhost:4500/api/instruments/instrumentId
server.delete('/api/instruments/:instrumentId', async (req, res) => {
  instrumentController.deleteInstrument(req, res);
});

// GET http://localhost:4500/api/family?name=Cordófonos
// GET http://localhost:4500/api/family
server.get('/api/family', (req, res) => {
  if (req.query.name) {
    familyController.detailFamily(req, res);
  } else {
    familyController.getFamily(req, res);
  }
});

// POST http://localhost:4500/api/signin
server.post('/api/signin', async (req, res) => {
  res.status(501).send('Not implemented');
});

// POST /api/login
server.post('/api/login', async (req, res) => {
  res.status(501).send('Not implemented');
});

module.exports = server;

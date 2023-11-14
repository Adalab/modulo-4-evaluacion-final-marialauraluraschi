// Servidor Express

// Para probar el API, entrar en <http://localhost:4500/api/instruments>

// Imports

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/conexion');

// Arracar el servidor

const server = express();

// Configuración del servidor

server.use(cors());
server.use(express.json({ limit: '25mb' }));

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

// GET /api/instruments?family=_id
server.get('/api/instruments', (req, res) => {
  if (req.query.family) {
    instrumentController.filterByFamily(req, res);
  } else {
    instrumentController.getInstruments(req, res);
  }
});

// POST /api/instruments
server.post('/api/instruments', async (req, res) => {
  instrumentController.createInstrument(req, res);
});

// PUT /api/instruments/xxxXXXxxx
server.put('/api/instruments/:instrumentId', async (req, res) => {
  instrumentController.updateInstrument(req, res);
});

// DELETE /api/instruments/xxxXXXxxx
server.delete('/api/instruments/:instrumentId', async (req, res) => {
  instrumentController.deleteInstrument(req, res);
});

// GET /api/family
server.get('/api/family', async (req, res) => {
  familyController.getFamily(req, res);
});

// POST /api/signin
server.post('/api/signin', async (req, res) => {
  res.status(501).send('Not implemented');
});

// POST /api/login
server.post('/api/login', async (req, res) => {
  res.status(501).send('Not implemented');
});

module.exports = server;

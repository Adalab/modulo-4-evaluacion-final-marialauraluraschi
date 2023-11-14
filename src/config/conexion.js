const mongoose = require('mongoose');

const dbConnect = () => {
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const dbName = process.env.DB_NAME;
  const dbCluster = process.env.DB_CLUSTER;
  const uri = `mongodb+srv://${user}:${pass}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a MongoDB'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;

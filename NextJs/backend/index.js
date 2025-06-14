const express = require('express');
require('dotenv').config();
const cors = require('cors')
const routes = require('./routes/syncRoutes');
const { dbA, dbB, authenticateDatabases } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(
  {
    origin:'http://localhost:3000',
    credentials:true,
  }
));


(async () => {
  try {
    await authenticateDatabases();
    app.use(express.json());
    app.use('/api', routes);
    app.set('view engine', 'ejs');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server not started due to DB connection failure:', error.message);
    process.exit(1);
  }
})();

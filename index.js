const express = require('express');
const syncRoutes = require('./routes/syncRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();
const PORT = 3000;

const { dbA, dbB } = require('./config/db');

(async () => {
  try {
    await dbA.authenticate();
    console.log('Connected to Database A (zaapko_prod)');
    await dbB.authenticate();
    console.log('Connected to Database B (zaapko_crm)');
  } catch (error) {
    console.error('Unable to connect to the databases:', error.message);
  }
})();

app.use(express.json());
app.use('/api', orderRoutes); 
app.use('/api', syncRoutes);  
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

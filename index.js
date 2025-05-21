const express = require('express');
const syncRoutes = require('./routes/syncRoutes')
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use('/api',syncRoutes)
app.set('view engine','ejs');

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

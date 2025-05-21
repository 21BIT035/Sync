const express = require('express');
const syncRoutes = require('./routes/syncRoutes')

const app = express();
const PORT = 3000;

app.use('/api',syncRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

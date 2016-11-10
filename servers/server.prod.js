const express = require('express');

const PORT = process.env.PORT || 3000;

// Initialize express
const app = express();

// Serve the build file
app.use('/', express.static(process.cwd() + '/build'));

// Start up our express server
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log('Production server listening on port', PORT);
});

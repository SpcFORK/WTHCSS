const express = require('express');
const path = require('path');

const app = express();

const mimeTypes = require('mime-types');

app.use(express.static(path.join(process.cwd(), 'dist')));
app.get('/*', (req, res) => {
  // Send any file requested
  res.sendFile(path.join(process.cwd(), req.url));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
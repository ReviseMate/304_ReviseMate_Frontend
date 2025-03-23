const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/fuse/')));

// Handle all other routes by serving the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/fuse/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

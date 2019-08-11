//require statements
const express = require('express');
const apiRouter = require('./api/api.js');

//initialize app
const app = express();

//use apiRouter for fetches
app.use(apiRouter);

//determine and listen on port
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = app;
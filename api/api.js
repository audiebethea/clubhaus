//require statements
const express = require('express');
const clubsRouter = require('./clubs.js');

//create & mount router, export
const apiRouter = express.Router();

apiRouter.use('/clubs', clubsRouter);

module.exports = apiRouter;
//require statements
const express = require('express');
const bodyParser = require('body-parser');
const clubsRouter = require('./clubs.js');

//create & mount router, export
const apiRouter = express.Router();

apiRouter.use('/clubs', clubsRouter);
apiRouter.use(bodyParser);


module.exports = apiRouter;
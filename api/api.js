//require statements
const express = require('express');
const interestRouter = require('./interestclubs.js');
const filterRouter = require('./filterclubs.js');


//create & mount router, export
const apiRouter = express.Router();

apiRouter.use('/interest', interestRouter);
apiRouter.use('/filter', filterRouter);


module.exports = apiRouter;
//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const clubsRouter = express.Router();
clubsRouter.use(errorhandler());

const db = new sqlite3.Database('../database/localtesting/database.sqlite');

clubsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Clubs', (error, result) => {
        if(error){
            next(error);
        }
        else{
            res.json(result);
        }
    })
});

module.exports = clubsRouter;

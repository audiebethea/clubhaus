//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
//const path = require('path');
const errorhandler = require('errorhandler');

const clubsRouter = express.Router();
clubsRouter.use(errorhandler());

//const dbPath = path.resolve('../database/localtesting', './database.sqlite')

const db = new sqlite3.Database('./api/database.sqlite');

clubsRouter.get('/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');

    console.log(university);

    db.all('SELECT * FROM Clubs WHERE Clubs.university = $university', {$university : university},
        (error, result) => {
            if(error){
                next(error);
            }
            else{
                console.log(result);
                res.send(result);
            }
        }
    )
});


module.exports = clubsRouter;

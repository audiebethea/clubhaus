//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const clubsRouter = express.Router();
clubsRouter.use(errorhandler());

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
                res.json(result);
            }
        }
    )
});


module.exports = clubsRouter;

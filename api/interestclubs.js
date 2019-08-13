//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const interestRouter = express.Router();
interestRouter.use(errorhandler());

const db = new sqlite3.Database('./api/database.sqlite');

interestRouter.get('/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');

    console.log('Got Here! Just slow as fuck');

    db.all('SELECT * FROM InterestClubs WHERE InterestClubs.university = $university', {$university : university},
        (error, result) => {
            if(error){
                next(error);
            }
            else{
                console.log(result);

                res.json(result);
            }
        }
    )
});


module.exports = interestRouter;

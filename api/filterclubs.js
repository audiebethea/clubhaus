//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const filterRouter = express.Router();
filterRouter.use(errorhandler());

const db = new sqlite3.Database('./api/database.sqlite');

filterRouter.post('/:filter/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');
    const filterType = req.params.filter.substring(0, 3) + 'filters';

    console.log('Connected to FilterClubs.');

    db.all("SELECT * FROM FilterClubs WHERE FilterClubs.university = $university", 
        {$university : university},
        (error, result) => {
            if(error){
                next(error);
            }
            else{
                let filteredResults = result.filter(club => club[filterType] !== null);

                console.log(filterType);

                filteredResults = findSpecClubs(filteredResults, filterType, req.body);

                res.json(filteredResults);
            }
        }
    )
});

//return clubs that have no contradictions with this filter field
function findSpecClubs(clubs, filterType, receivedFilters){
    return clubs.filter(club => {
        //create an array of filters
        const clubFilters = club[filterType].split(', ');

        return clubFilters.every(clubFilter => {
            return receivedFilters.includes(clubFilter);
        })
    });
}


module.exports = filterRouter;

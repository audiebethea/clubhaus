//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const filterRouter = express.Router();
filterRouter.use(errorhandler());

const db = new sqlite3.Database('./api/database.sqlite');

filterRouter.get(':filter/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');
    const table = req.params.filter + "Clubs";

    console.log('Got Here! Just slow as fuck');

    db.all('SELECT * FROM $filtertable WHERE $filtertable.university = $university', {$university : university, $filtertable : table},
        (error, result) => {
            if(error){
                next(error);
            }
            else{
                const filteredResults = filterResults(result, req.body.filters);

                console.log(result);

                res.json(result);
            }
        }
    )
});

/*receivedFilters is an array of filter strings
result is an array of club objects
returns an array of clubs that don't have conflicting filters*/
function filterResults(clubs, receivedFilters){

    console.log(receivedFilters);

    return clubs.filter(club => {
        //create an array of filters
        const clubFilters = club.filters.split(', ');

        return receivedFilters.every(receivedFilter, index => {
            return receivedFilter === clubFilters[index] || clubFilters[index] === 'Prefer Not To Answer';
        })
    });
}


module.exports = filterRouter;

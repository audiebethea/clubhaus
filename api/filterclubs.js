//require statements
const express = require('express');
const errorhandler = require('errorhandler');
const {Client} = require('pg');

const filterRouter = express.Router();
filterRouter.use(errorhandler());



filterRouter.post('/:filter/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');
    const filterType = req.params.filter.substring(0, 3) + 'filters';

    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });

    client.connect(error => {
        if(error){
            console.log(error);
            throw error;
        }
        else{
            const query = "SELECT * FROM FilterClubs WHERE FilterClubs.university = '" + university + "'";

            client.query(query,
                (error, rawResult) => {
                    if(error){
                        next(error);
                    }
                    else{
                        client.end();
    
                        const result = rawResult.rows;

                        let filteredResults = result.filter(club => club[filterType] !== null);

                        filteredResults = findSpecClubs(filteredResults, filterType, req.body);

                        filteredResults.sort((clubA, clubB) => clubB.matchCount - clubA.matchCount);

                        res.status(200).json(filteredResults);
                    }
                }
            )
        }
    })

});

//return clubs that have no contradictions with this filter field
function findSpecClubs(clubs, filterType, receivedFilters){
    return clubs.filter(club => {
        //create an array of filters
        const clubFilters = club[filterType].split(', ');

        let matchCount = 0;

        //this is killing my inner boolean zen
        return clubFilters.every(clubFilter => {
            if(receivedFilters.includes(clubFilter)){
                club.matchCount = matchCount++;
                return true;
            }
            return false;
        })
    });
}


module.exports = filterRouter;

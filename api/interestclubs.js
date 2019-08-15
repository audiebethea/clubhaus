//require statements
const express = require('express');
const sqlite3 = require('sqlite3');
const errorhandler = require('errorhandler');

const interestRouter = express.Router();
interestRouter.use(errorhandler());

const db = new sqlite3.Database('./api/database.sqlite');

//already mounted router at /interest
interestRouter.post('/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');

    console.log('Connected.');

    db.all('SELECT * FROM InterestClubs WHERE InterestClubs.university = $university', {$university : university},
        (error, result) => {
            if(error){
                next(error);
            }
            else{
                //pull interests and non-interests out of req.body
                let interested = [];
                let notInterested = [];
                for (let [key, value] of Object.entries(req.body)){
                    if(value === 'Interested'){
                        interested.push(key);
                    }
                    if(value === 'Not Interested'){
                        notInterested.push(key);
                    }
                }

                let filteredResults = eliminateNotInterested(notInterested, result);

                filteredResults = computeMatchPercent(interested, filteredResults);

                //remove clubs with less than a 50% match
                filteredResults = clubs.filter(club => club.matchPercent > 50);

                filteredResults.sort((clubA, clubB) => clubA.matchPercent - clubB.matchPercent);

                console.log(filteredResults);

                res.json(result);
            }
        }
    )
});

//eliminate any clubs that have the interests marked at Not Interested
function eliminateNotInterested(notInterested, clubs){
    return clubs.filter(club => {
        const clubInterests = club.interests.split(', ');

        return notInterested.every(nonInterest => {
            return !clubInterests.includes(nonInterest);
        })
    })
}

//find match percent between club interests & selected interests
function computeMatchPercent(selectedInterests, clubs){
    clubs.forEach(club => {
        const clubInterests = club.interests.split(', ');
        const totalInterestCount = clubInterests.length;
        let matchCount = 0;

        clubInterests.forEach(clubInterest => {
            if(selectedInterests.includes(clubInterest)){
                matchCount++;
            }
        })

        club.matchPercent = (matchCount * 1.0 / totalInterestCount) * 100;
    })

    return clubs;
}



module.exports = interestRouter;

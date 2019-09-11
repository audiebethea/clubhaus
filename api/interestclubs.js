//require statements
const express = require('express');
const errorhandler = require('errorhandler');
const {Client} = require('pg');

const interestRouter = express.Router();
interestRouter.use(errorhandler());

//already mounted router at /interest
interestRouter.post('/:university', (req, res, next) => {
    const university = req.params.university.replace(/\+/g, ' ');

    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });

    client.connect(error => {
        if(error){
            throw error;
        }
        else{
            const query = "SELECT * FROM InterestClubs WHERE InterestClubs.university = '" + university + "'";

            client.query(query,
                (error, rawResult) => {
                    if(error){
                        next(error);
                    }
                    else{
                        client.end();

                        const result = rawResult.rows;

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
                        //consider also filtering out clubs that have < 3 interests associated
                        let filteredResults = eliminateNotInterested(notInterested, result);
        
                        filteredResults = computeMatchPercent(interested, filteredResults);
        
                        //sort first by match percent, then by absolute number of matches
                        filteredResults.sort((clubA, clubB) => {
                            //if match counts are low, we want to sort based on match count
                            if(clubA.matchCount < 3 || clubB.matchCount < 3){
                                return clubA.matchCount === clubB.matchCount ? clubB.matchPercent - clubA.matchPercent : clubB.matchCount - clubA.matchCount;

                            }
                            //other wise sort based on match percent
                            else{
                                return clubA.matchPercent === clubB.matchPercent ? clubB.matchCount - clubA.matchCount : clubB.matchPercent - clubA.matchPercent;
                            }
                        });
        
                        //limit filtered results to just the highest
                        if(filteredResults.length > 50){
                            filteredResults.length = 50;
                        }
        
                        filteredResults = filteredResults.filter(club => club.matchPercent > 0);
                        
                        res.status(200).json(filteredResults);
                    }
                }
            )
        }
    })
    
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
        let matchedInterests = [];
        let unrelatedInterests = [];

        clubInterests.forEach(clubInterest => {
            if(selectedInterests.includes(clubInterest)){
                matchCount++;
                matchedInterests.push(clubInterest);
            }
            else{
                unrelatedInterests.push(clubInterest);
            }
        })

        club.matchCount = matchCount;
        club.matchPercent = (matchCount * 1.0 / totalInterestCount) * 100;
        club.matchedInterests = matchedInterests;
        club.unrelatedInterests = unrelatedInterests;
    })

    return clubs;
}



module.exports = interestRouter;

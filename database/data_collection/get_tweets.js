//import fetch
const fetch = require('node-fetch');
const fs = require('fs');

//clubs to scrape is process.argv[2]
const UTclubs = require('./scraping/university_of_texas_at_austin/UTclubs.json');
const TCUclubs = require('./scraping/texas_christian_university/TCUclubs.json');
const AMclubs = require('./scraping/texas_am_university/AMclubs.json');
const IUclubs = require('./scraping/indiana_university_bloomington/IUclubs.json');

const universities = [UTclubs, TCUclubs, AMclubs, IUclubs];


void (async () => {
    let index = 0;

    for(const clubs of universities){
        const newData = [];

        for(const club of clubs){
            if(club.twitterLink){
                const clubData = await getTweets(club);
                newData.push(clubData);
            }
            else{
                newData.push(club);
            }
        }
        
        //update the json file
        switch(index){
            case 0:
                fs.writeFile('./scraping/university_of_texas_at_austin/UTclubs.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 1: 
                fs.writeFile('./scraping/texas_christian_university/TCUclubs.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 2:
                fs.writeFile('./scraping/texas_am_university/AMclubs.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 3:
                fs.writeFile('./scraping/indiana_university_bloomington/IUclubs.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
        }

        index++;
    }
})()


//makes request to the twitter api and returns clubs
async function getTweets(club){
    //extract the username from the link
    let username = club.twitterLink.split(/\//);
    username = username.pop();

    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=50`

    //make the call
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers : {
                //real bearer token goes here
                "Authorization" : "Bearer " + process.env.TWITTER_BEARER
            }
        });
        if(response.ok){
            //need get "description" field of each tweet and combine them into a new string
            const jsonResponse = await response.json();

            jsonResponse.forEach(tweet => {
                if(!club.twitterDescription){
                    club.twitterDescription = tweet.user.description
                }
                club.tweets += tweet.text;
            })
        }
    }
    catch (error) {
        console.log(error);
    }

    return club;
}

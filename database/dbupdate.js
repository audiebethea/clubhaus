//initialize the connection
const {Client} = require('pg');
const alldata = require('./data_collection/final_club_data/alldata.json');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

client.connect(async error => {
    if(error){
        throw error;
    }
    console.log('Connected.');

    client.query('DROP TABLE IF EXISTS InterestClubs');
    client.query('DROP TABLE IF EXISTS interestclubs');
    client.query('DROP TABLE IF EXISTS FilterClubs');
    
    client.query('CREATE TABLE IF NOT EXISTS InterestClubs '
    + '(name TEXT NOT NULL, '
    + 'clublink TEXT NOT NULL, '
    + 'university TEXT NOT NULL, '
    + 'description TEXT, '
    + 'logo TEXT, '
    + 'interests TEXT)');

    client.query('CREATE TABLE IF NOT EXISTS FilterClubs '
    + '(name TEXT NOT NULL, '
    + 'clublink TEXT NOT NULL, '
    + 'university TEXT NOT NULL, '
    + 'description TEXT, '
    + 'logo TEXT, '
    + 'polfilters TEXT, '
    + 'relfilters TEXT, '
    + 'culfilters TEXT)');


    for(const club of alldata){
        client.query("INSERT INTO InterestClubs (name, clublink, university, description, logo, interests) VALUES ($1, $2, $3, $4, $5, $6)", [club.title, club.clubLink, club.university, club.descriptionSnippet, club.logoLink, club.interests], error => console.log(club.title + ' Interests: ' + error))
        client.query("INSERT INTO FilterClubs (name, clublink, university, description, logo, polfilters, relfilters, culfilters) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [club.title, club.clubLink, club.university, club.descriptionSnippet, club.logoLink, club.politicalFilters, club.religiousFilters, club.culturalFilters], error => console.log(club.title + ' Filters: ' + error));
    }

})
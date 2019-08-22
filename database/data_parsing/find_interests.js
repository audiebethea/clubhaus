const fs = require('fs');

//clubs to scrape is process.argv[2]
const UTclubs = require('./scraping/university_of_texas_at_austin/UTclubs.json');
const TCUclubs = require('./scraping/texas_christian_university/TCUclubs.json');
const AMclubs = require('./scraping/texas_am_university/AMclubs.json');
const IUclubs = require('./scraping/indiana_university_bloomington/IUclubs.json');

const interests = {}
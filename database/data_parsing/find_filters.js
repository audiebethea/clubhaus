//importing
const fs = require('fs');

const UTclubs = require('../data_collection/scraping/university_of_texas_at_austin/UTclubs.json');
const TCUclubs = require('../data_collection/scraping/texas_christian_university/TCUclubs.json');
const AMclubs = require('../data_collection/scraping/texas_am_university/AMclubs.json');
const IUclubs = require('../data_collection/scraping/indiana_university_bloomington/IUclubs.json');

const universities = [UTclubs, TCUclubs, AMclubs, IUclubs];

const politicalFilters = {
    'Conservative' : ['conservative', 'republican', 'right-wing'],
    'Liberal' : ['liberal', 'democrat', 'democratic', 'left-wing'],
    'LGBTQ+' : ['lgbtq', 'lesbian', 'gay', 'homosexual', 'queer', 'transgender', 'bisexual', 'pansexual'],
    'Pro-Choice' : ['pro-choice', 'pro-abortion'],
    'Pro-Life' : ['pro-life', 'anti-abortion']
}

const religiousFilters = {
    'Christian' : ['christian', 'christ', 'jesus', 'bible', 'gospel', 'church'],
    'Muslim' : ['islam', 'muslim', 'allah', 'quran', 'koran', 'mosque'],
    'Hindu' : ['hindu', 'vedas', 'mandir', 'puranas', 'ramayana'],
    'Buddhist' : ['buddhis', 'theraveda', 'mahayana', 'vajrayana', 'siddhartha', 'guatama', 'gandhi'],
    'Jewish' : ['jew', 'hebrew', 'semitic', 'abraham', 'torah', 'synagogue'],
    'Athiest' : ['athies', 'agnos'],
    'Sikh' : ['sikh', 'guru granth sahib']
}

const culturalFilters = {
    'Korean' : ['korea'],
    'Japanese' : ['japan'],
    'Chinese' : ['china', 'chinese'],
    'Taiwanese' : ['taiwan'],
    'Thai' : ['thai'],
    'Vietnamese' : ['vietnam'],
    'Filipino' : ['filipino', 'philippines'],
    'Indonesian' : ['indonesia'],
    'Indian' : ['india'],
    'Pakistani' : ['pakistan'],
    'Saudi Arabian' : ['saudi', 'arabia'],
    'Afghanistani' : ['afghan'],
    'Scottish' : ['scottish', 'scotland'],
    'Irish' : ['irish', 'ireland'],
    'Russian' : ['russia'],
    'Italian' : ['italia', 'italy'],
    'Spanish' : ['spain', 'spanish'],
    'German' : ['german'],
    'French' : ['french', 'france'],
    'Greek' : ['greece'],
    'Nigerian' : ['nigeria'],
    'Egyptian' : ['egypt'],
    'Ethiopian' : ['ethiopia'],
    'Cuban' : ['cuba'],
    'Mexican' : ['mexic'],
    'Brazilian' : ['brazil'],
    'Argentinian' : ['argentina', 'argentinian']
}

const filters = [politicalFilters, religiousFilters, culturalFilters];

void (() => {
    let index = 0;

    for(const clubs of universities){
        const newData = [];

        for(const club of clubs){
            const clubData = findFilters(club);
            newData.push(clubData);  
        }
        
        //update the json file
        switch(index){
            case 0:
                fs.writeFile('../final_club_data/UTdata.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 1: 
                fs.writeFile('../final_club_data/TCUdata.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 2:
                fs.writeFile('../final_club_data/AMdata.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
            case 3:
                fs.writeFile('../final_club_data/IUdata.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
                break;
        }

        index++;
    }
})()

//loops through each filter and sees if any keywords match up
function findFilters(club) {
    let ftIndex = 0;

    //for each type of filter, loop through the topics and keywords and add if not already there
    for(const xxxFilter of filters){
        for(const [topic, keywords] of Object.entries(xxxFilter)){
            notFound = true;
            kIndex = 0;
            while(notFound && kIndex < keywords.length){
                const keyword = keywords[kIndex];
                if((club.title.includes(keyword) || club.descriptionSnippet.includes(keyword)
                    || club.fullDescription.includes(keyword)) || (club.twitterDescription && club.twitterDescription.includes(keyword))
                    || (club.tweets && club.tweets.includes(keyword))){
                        switch(ftIndex){
                            case 0:
                                club.politicalFilters ? club.politicalFilters += ', ' + topic : club.politicalFilters = topic;
                                break;
                            case 1:
                                club.religiousFilters ? club.religiousFilters += ', ' + topic : club.religiousFilters = topic;                               
                                break;
                            case 2: 
                                club.culturalFilters ? club.culturalFilters += ', ' + topic : club.culturalFilters = topic;                                
                                break;
                        }
                        notFound = false;
                }
                kIndex++;
            }
        }
        ftIndex++;
    }

    //if there were no matches, set to empty string
    if(!club.politicalFilters){
        club.politicalFilters = '';
    }
    if(!club.religiousFilters){
        club.religiousFilters = '';
    }
    if(!club.culturalFilters){
        club.culturalFilters = '';
    }

    return club;
}
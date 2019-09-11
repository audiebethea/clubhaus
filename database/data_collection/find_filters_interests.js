//importing
const fs = require('fs');

const UTclubs = require('../data_collection/scraping/university_of_texas_at_austin/UTclubs.json');
const TCUclubs = require('../data_collection/scraping/texas_christian_university/TCUclubs.json');
const AMclubs = require('../data_collection/scraping/texas_am_university/AMclubs.json');
const IUclubs = require('../data_collection/scraping/indiana_university_bloomington/IUclubs.json');

const universities = [UTclubs, TCUclubs, AMclubs, IUclubs];

const possibleInterests = {
    'Acting' : ['acting', 'theatre', 'actor', 'improv', 'thespian', 'theater'],
    'Chess' : ['chess'],
    'Gaming' : ['gaming', 'video games', 'esports', 'tabletop gam'],
    'Greek Life' : ['greek', 'frat', 'sorority', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'theta', 'iota', 'kappa', 'lambda', 'omicron', ' pi ', ' phi ', 'rho', ' tau ', ' chi ', ' psi ', 'omega', 'sigma'],
    'Reading/Writing' : ['reading', 'writing', 'books', 'author', 'editor', 'publish', 'poet'],
    'Dancing' : ['dance', 'contemporary', 'hip hop', 'hip-hop', 'breakdanc', 'b-boy', 'b-girl', 'kpop', 'ballet', 'tap danc'],
    'Spirit Organization' : ['principles', 'spirit'],
    'Yoga' : ['yoga', 'pilates', 'meditation'],
    'Food' : ['cook', 'eating', 'baking', 'food'],
    'Computer Science' : ['robotic', 'machinery', 'computing', 'computer science', 'coding', 'programming', 'security'],
    'Engineering' : ['engineer', 'mechanical', 'chemical', 'electrical'],
    'Health Studies' : ['health stud', 'hospital', 'health science', 'surgery', 'medicine', 'cancer', 'premed', 'pre-med', 'pre med', 'biology', 'chemistry', 'pre-health', 'pharmacy', 'doctor', 'medical'],
    'Student Government' : ['student gov', 'council'],
    'Intramurals' : ['intramural', 'hockey', 'racquetball', 'volleyball', 'golf', 'sport', 'soccer', 'football', 'basketball', 'baseball', 'tennis', 'swimming', 'track'],
    'Music Performance/Production' : ['music', 'song', 'acoustic', 'drum', 'rap', 'instrument', 'recording', 'guitar', 'piano', 'singing', 'orchestra', 'band', 'choir', 'acapella', 'karaoke'],
    'Business' : ['business', 'accounting', 'finance', 'marketing', 'presentation'],
    'Teaching' : ['teaching', 'education', 'teacher', 'mentor', 'tutor', 'staff'],
    'Photography/Videography' : ['photo', 'film', 'camera', 'video'],
    'Outdoors' : ['garden', 'outdoors', 'hiking', 'nature', 'stargaz', 'adventure'],
    'Culture' : ['culture', 'diversity'],
    'Politics' : ['politic', 'government'],
    'Religion' : ['religio', 'faith'],
    'Art' : ['art', 'drawing', 'painting', 'sculpting'],
    'Chess' : ['chess', 'puzzle'],
    'Fitness' : ['bodybuilding', 'running', 'cycling', 'workout', 'work out', 'bike', 'gym', 'rock climb', 'athletic'],
    'Radio' : ['radio', 'media'],
    'Swordplay' : ['fencing', 'swordfighting', 'kendo'],
    'Martial Arts' : ['wrestle', 'jiu-jitsu', 'karate', 'tae kwon do', 'taekwondo', 'judo', 'boxing', 'aikido'],
    'Skating' : ['skate', 'longboard', 'roller blad'],
    'Sailing' : ['sail', 'boat', ' row '],
    'Volunteering' : ['volunteer', 'donate', 'homeless', 'community', 'cancer', 'philanthro'],
    'Research' : ['research'],
    'Fashion' : ['clothing', 'fashion', 'design'],
    'Debate' : ['debate', 'argument'],
    'Study Abroad' : ['study abroad', 'travel'],
    'Comedy' : [' improv ', 'funny', ' skit ', 'comedy', 'improvistation'],
    'Magic Tricks' : ['magic', 'card trick', ' wand '],
    'Origami' : ['origami'],
    'Event Hosting' : ['event hosting', 'entertainment', 'event plan', 'events'],
    'Academic' : ['academic', 'school'],
    'Cars' : ['cars', 'trucks', 'automobile'],
    'Geology' : ['geology', 'jackson', 'excavation', 'fossil'],
    'Law' : ['law', 'attorney', 'judge', 'court'],
    'Astronomy' : ['astronomy', 'stargazing', 'star-gazing', 'star gazing', 'outer space', 'astronaut'],
    'Animation/Graphic Design' : ['graphic design', 'animation', 'anime'],
    'Movies' : ['cinema', 'movie', 'film', 'television', 'media'],
    'Magazine' : ['magazine', 'design', 'mode', 'newspaper', 'journal'],
    'Architecture' : ['architect', 'construction'],
    'Leadership' : ['leadership', 'integrity'],
    'Communications' : ['communication', 'communicate', 'radio', 'advertis'],
    'Graduate' : ['grad student', 'graduate student'],
    'Tech' : ['tech',],
    'Co-op' : ['co-op', ' coop ', 'co op'],
    'Human Rights' : ['human right', 'humanity', 'protest', 'activis'],
    '3-D printing' : ['3-d', '3d', ' 3 d ', 'printing'],
    'Stock Market' : ['stock', 'market'],
    'ROTC' : ['air force', 'army', 'navy', 'military'],
    'Consulting' : ['consult']
}

const politicalFilters = {
    'Conservative' : ['conservative', 'republican', 'right-wing'],
    'Liberal' : ['democrat', 'left-wing'],
    'LGBTQ+' : ['lgbtq', 'lesbian', 'gay', 'homosexual', 'queer', 'transgender', 'bisexual', 'pansexual', 'asexual'],
    'Feminist': ['feminis'],
    'Environmental' : ['environment']
}

const religiousFilters = {
    'Christian' : ['christian', 'christ', 'jesus', 'bible', 'gospel', 'church'],
    'Muslim' : ['islam', 'muslim', 'allah', 'quran', 'koran', 'mosque'],
    'Hindu' : ['hindu', 'vedas', 'mandir', 'puranas', 'ramayana'],
    'Buddhist' : ['buddhis', 'theraveda', 'mahayana', 'vajrayana', 'siddhartha', 'guatama', 'gandhi'],
    'Jewish' : ['jew', 'hebrew', 'semitic', 'abraham', 'torah', 'synagogue'],
    'Athiest' : ['athies', 'agnos', 'non secular', 'non-secular', 'thiest'],
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
    'Argentinian' : ['argentina', 'argentinian'],
    'Bengali' : ['bengal'],
    'Armenian' : ['armenia'],
    'Asian' : ['asian', 'korea', 'japan', 'china', 'chinese', 'taiwan', 'thai', 'vietnam', 'filipino', 'indonesian', 'indian', 'bengal'],
    'African' : ['african', 'nigeria', 'egypt', 'egyptian', 'ethiopian', 'black'],
    'Arab' : ['arab', 'pakistani', 'saudi', 'afghan', 'middle east'],
    'European' : ['europe', 'scottish', 'scotland', 'welsh', 'irish', 'russia', ' ital', 'spain', 'german', 'french', 'greece', 'armenia'],
    'Latin' : ['latin', 'hispanic', 'cuba', 'mexic', 'brazil', 'argentina'],
}

const filters = [politicalFilters, religiousFilters, culturalFilters];

void (() => {
    const newData = [];

    for(const clubs of universities){

        for(const club of clubs){
            let clubData = findFilters(club);
            clubData = findInterests(club);
            delete clubData.fullDescription;
            delete clubData.tweets;
            delete clubData.twitterDescription;
            delete clubData.facebookLink;
            delete clubData.twitterLink;
            newData.push(clubData);  
        }
    }
    fs.writeFile('./final_club_data/alldata.json', JSON.stringify(newData, null, 2), (err) => err ? console.error('Data not written!', err) : console.log('Data Written!'));
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
                if(club.title.toLowerCase().includes(keyword) || club.descriptionSnippet.toLowerCase().includes(keyword)
                    || club.fullDescription.toLowerCase().includes(keyword)){
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

function findInterests(club) {
    for(const [interest, keywords] of Object.entries(possibleInterests)){
        notFound = true;
        kIndex = 0;
        while(notFound && kIndex < keywords.length){
            const keyword = keywords[kIndex];
            //if our descriptions/titles include this word
            if((club.title.toLowerCase().includes(keyword) || club.descriptionSnippet.toLowerCase().includes(keyword) || club.fullDescription.toLowerCase().includes(keyword)
                || (club.twitterDescription && club.twitterDescription.toLowerCase().includes(keyword)))){
                    club.interests ? club.interests += ', ' + interest : club.interests = interest;
                    notFound = false;
            }
            kIndex++;
        }
    }

    if(!club.interests){
        club.interests = '';
    }

    return club;
}
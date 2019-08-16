//creating some local dummy data and testing program with it


const sqlite3 = require('sqlite3');


const db = new sqlite3.Database('./database.sqlite');

db.serialize(function(){

    db.run('DROP TABLE IF EXISTS InterestClubs'),
    db.run('DROP TABLE IF EXISTS FilterClubs'),

    db.run("CREATE TABLE IF NOT EXISTS InterestClubs "
        + "(id INTEGER NOT NULL, " 
        + "name STRING NOT NULL, "
        + "clublink STRING NOT NULL, "
        + "university STRING NOT NULL, "
        + "description STRING, "
        + "logo STRING, "
        + "interests STRING NOT NULL) "    
    ),

    db.run("CREATE TABLE IF NOT EXISTS FilterClubs "
        + "(id INTEGER NOT NULL, " 
        + "name STRING NOT NULL, "
        + "clublink STRING NOT NULL, "
        + "university STRING NOT NULL, "
        + "description STRING, "
        + "logo STRING, "
        + "polfilters STRING, "   
        + "relfilters STRING, " 
        + "culfilters STRING) "  
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (1, 'ABC Residence Hall Council', 'The University of Texas at Austin', "
        + "'https://utexas.campuslabs.com/engage/organization/abcrhc', " 
        + "'To create a friendly and fun living environment for residents of ABC.', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/baa4422d-f682-4818-b127-1d4d76445bd654bc22b4-db47-466a-85d0-9241601cf5b4.jpg?preset=med-sq', "
        + " 'Bowling, Chess, Hair Styling') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (2, 'Absolute Texxas', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/absolutetexxas', "
        + "'Absolute Texxas is dedicated to developing men and women based upon the principles of individual leadership, personal integrity, and teamwork.', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/619e7f58-17c3-4a71-90f4-80e3ee2e3e37388ca14a-9b7e-47cd-8c12-5e1b5ec0d778.png?preset=med-sq', "
        + " 'Acting, Chess, Dancing, Fencing, Ice Skating') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (3, 'B-Boy Session', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/bboysession', "
        + "'Anyone who is interested in Bboying/Bgirling is welcomed to join, as we have no membership fee or requirement.', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/6ca67e07-dbe1-4dd8-88c7-ec11958070f5d78e80e1-b948-4085-8f1b-e90f7bfdc953.jpg?preset=med-sq', "
        + " 'Bowling, Chess, Dancing, Guitar, Ice Skating, Jump Roping') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (5, 'Mystery Club', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/texaslawaggiesociety', "
        + "'', "
        + "'', "
        + " 'Acting, Eating, Hair Styling, Ice Skating') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (6, 'Har-D-Har Improv', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/har-d-har_improv', "
        + "'Har-D-Har Improv is UT Austins newest improv troupe!', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/41d61eb9-78e5-4c26-9e92-be98d8dc060f46f9d8de-4475-4e06-9b80-9b2d2c8b9bc3.png?preset=med-sq', "
        + " 'Acting, Bowling, Dancing, Eating, Guitar') "
    ),

   db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (7, 'e-NABLE at UT Austin', 'The University of Texas at Austin', "
        + "'https://utexas.campuslabs.com/engage/organization/e-nableut', " 
        + "'e-NABLE at UT Austin encourages students to take advantage of the 3D printing resources on the UT Austin.', "
        + "'', "
        + " 'Fencing') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (8, 'Interfraternity Council', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/texasifc',"
        + "'', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/781530aa-7438-4a14-a1e4-3c82adc4dcbb38c804e3-0236-49a7-8046-fbb4ad056a09.png?preset=med-sq', "
        + " 'Acting, Bowling, Chess, Dancing, Eating, Fencing, Guitar, Hair Styling, Ice Skating, Jump Roping') "
    ),

    db.run("INSERT INTO InterestClubs (id, name, university, clublink, description, logo, interests) "
        + "VALUES (9, 'Richland Club', 'Richland College', " 
        + "'https://utexas.campuslabs.com/engage/organization/clubtennis',"
        + "'Sample club to see if we filter by university correctly', "
        + "'', "
        + " 'Acting, Bowling, Chess, Dancing, Eating, Fencing, Guitar, Hair Styling, Ice Skating, Jump Roping') "
    ),

    db.run("INSERT INTO FilterClubs (id, name, university, clublink, description, logo, polfilters, relfilters, culfilters) "
        + "VALUES (1, 'Capital Community', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/capitalcommunity',"
        + "'The mission statement of Capital Community is to provide education about affordable credit options for people in under-served groups in the Austin community', "
        + "'', "
        + " 'Conservative', "
        + "'', "
        + "'') "
    ),

    db.run("INSERT INTO FilterClubs (id, name, university, clublink, description, logo, polfilters, relfilters, culfilters) "
        + "VALUES (2, 'Hindu Students Association', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/1996',"
        + "'The Hindu Students Association aims to cultivate and foster cross-cultural dialogue and interaction on issues that pertain to Hindus domestically and globally', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/1e6cad27-5620-478b-965c-82706ecb90d914187e09-78f6-45c6-8149-e0a9513f7445.jpg?preset=med-sq', "
        + " '', "
        + " 'Hindu', "
        + " '') "
    ),

    db.run("INSERT INTO FilterClubs (id, name, university, clublink, description, logo, polfilters, relfilters, culfilters) "
        + "VALUES (3, 'Filipino Students Association', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/utfsa',"
        + "'The purpose of the organization shall be to serve as a social group for Filipinos, their friends, and anyone interested in the Philippines', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/7c58e7ff-e4aa-42a7-8768-5fe1fe6000a70a059042-8fee-42ec-8192-0cae8720d161.png?preset=med-sq', "
        + " '', "
        + " '', "
        + " 'Asian') "
    ),

    db.run("INSERT INTO FilterClubs (id, name, university, clublink, description, logo, polfilters, relfilters, culfilters) "
        + "VALUES (4, 'Latin Christian Association', 'The University of Texas at Austin', " 
        + "'https://utexas.campuslabs.com/engage/organization/utfsa',"
        + "'Big Latin Chrisitan Club', "
        + "'https://se-infra-imageserver2.azureedge.net/clink/images/7c58e7ff-e4aa-42a7-8768-5fe1fe6000a70a059042-8fee-42ec-8192-0cae8720d161.png?preset=med-sq', "
        + " '', "
        + " 'Christian', "
        + " 'Latin') "
    )

});
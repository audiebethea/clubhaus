//import statements
const puppeteer = require('puppeteer');
const fs = require('fs');

const UNIVERSITY = 'Indiana University Bloomington';

//query selectors

const TITLE_QUERY_SELECTOR = 'a > div > div > div > span > div > div > div:nth-child(2)';
//this will be displayed in results
const DESCRIPTION_SNIPPET_QUERY_SELECTOR = 'a > div > div > div > span > div > div > p';
const CLUBLINK_QUERY_SELECTOR = 'a'; //use node => node.href.trim()
//use a try-catch block to overcome issues with clubs that have no logo
const LOGOLINK_QUERY_SELECTOR = 'a > div > div > div > span > div > div > img'; //use node => node.src.trim()
//used for tagging
const DESCRIPTION_FULL_QUERY_SELECTOR = '#react-app > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.bodyText-large.userSupplied > p';
//use try catch blocks for facebook & twitter queries
const FACEBOOK_LINK_QUERY_SELECTOR = '#react-app > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(5) > a[aria-label = "Visit our facebook"]';
const TWITTER_LINK_QUERY_SELECTOR = '#react-app > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(5) > a[aria-label = "Visit our twitter"]';


void (async () => {
    try{
        //create new browser instance & page within browser
        const browser = await puppeteer.launch();
        const rootPage = await browser.newPage();
        //navigate to website
        await rootPage.goto('https://beinvolved.indiana.edu/organizations');

        //need to see how many times we have to click show more button (should be num clubs / 10 + 1)
        let numClubs = await rootPage.$eval('#react-app > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1)', (node) => node.innerText.trim());
        numClubs = numClubs.split('of ');
        numClubs = numClubs[1].substring(0, numClubs[1].length - 1);
        numClubs = parseInt(numClubs, 10);
        const numClicks = numClubs / 10;

        //grab button anc click it a bunch
        const showMoreButton = await rootPage.$('#react-app > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > button');
        for(let i = 0; i < numClicks - 1; i++){
            await showMoreButton.click();
            await rootPage.waitFor(1000);
        }

        await rootPage.waitFor(25000);


        //get clubs
        const clubs = await rootPage.$$('#org-search-results > div > div > div');
        const clubData = [];

        for(let club of clubs){
            //using queries, scrape data for that club
            const title = await club.$eval(TITLE_QUERY_SELECTOR, node => node.innerText.trim());
            const descriptionSnippet = await club.$eval(DESCRIPTION_SNIPPET_QUERY_SELECTOR, node => node.innerText.trim());
            const clubLink = await club.$eval(CLUBLINK_QUERY_SELECTOR, node => node.href.trim());
            const logoLink = await tryCatchScrape(club, LOGOLINK_QUERY_SELECTOR, node => node.src.trim());
            
            //open new page to club page to get more info
            const clubPage = await browser.newPage();
            await clubPage.goto(clubLink);

            //scrape data from within that club's more detailed page
            const fullDescription = await tryCatchScrape(clubPage, DESCRIPTION_FULL_QUERY_SELECTOR, node => node.innerText.trim());
            const facebookLink = await tryCatchScrape(clubPage, FACEBOOK_LINK_QUERY_SELECTOR, node => node.href.trim());
            const twitterLink = await tryCatchScrape(clubPage, TWITTER_LINK_QUERY_SELECTOR, node => node.href.trim());

            clubData.push({
                title : title,
                descriptionSnippet: descriptionSnippet,
                clubLink : clubLink,
                logoLink : logoLink,
                fullDescription : fullDescription,
                facebookLink : facebookLink,
                twitterLink : twitterLink,
                university : UNIVERSITY
            });

            await clubPage.close();
        }

        fs.writeFile(
            './IUclubs.json',
            JSON.stringify(clubData, null, 2),
            (err) => err ? console.error('Data not written!', err) : console.log('Data Written!')
        )

        await browser.close();
    }
    //something went wrong
    catch(error){
        console.log(error);
    }
})()


//if data may or may not be there, use this function to scrape
const tryCatchScrape = async (club, query, func) => {
    let data;
    try{
        data = await club.$eval(query, func);
    }
    catch{
        data = '';
    }
    return data;
}
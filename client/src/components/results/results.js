//this is the javascript file to describe the functions of the results page

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



//some dummy club data
//clubs should appear in order of match percent, then recent fb activity
const club1 = {
    name : "Sky @ UT Austin",
    matchPercent : "78",
    matchedInterests : ["Meditation", "Well Being", "Self Care"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/artofliving",
    mostRecentFacebookActivity : "07042017",
    facebookLink : "https://www.facebook.com/ArtOfLivingUT"
};
const club2 = {
    name : "Absolute Texxas",
    matchPercent : "65",
    matchedInterests : ["Social", "Greek Life"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/absolutetexxas",
    mostRecentFacebookActivity : "10102019",
    facebookLink : "https://www.facebook.com/Absolute-Texxas-102591403180373/"
};
const club3 = {
    name : "American Constitution Society",
    matchPercent : "31",
    matchedInterests : ["Political"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/americanconstitutionsociety",
    mostRecentFacebookActivity : "N/A",
    facebookLink : "N/A"
}
const clubs = [club1, club2, club3];


export default class Results extends React.Component{
    //data will come in as a prop array "clubs"
    constructor(props){
        super(props);


    }

    //this function will check if the passed in dates are within 
    //one year of today's date
    checkIfActive(recentFBActivity){
        if(recentFBActivity === "N/A"){
            return false;
        }

        //parse into ints and add up total days for this date
        const recentFBActivityYear = parseInt(recentFBActivity.substring(4));
        const recentFBActivityMonth = parseInt(recentFBActivity.substring(2, 4));
        const recentFBActivityDate = parseInt(recentFBActivity.substring(0, 1));

        const recentTotal = (recentFBActivityYear * 365) + (recentFBActivityMonth - 1) + recentFBActivityDate;

        //count up total days for this date
        const today = new Date();
        const todaysTotal = (today.getFullYear * 365) + (today.getMonth * 31) + today.getDate;

        //return whether these dates are within a year of each other or not
        return recentTotal + 365 >= todaysTotal;
    }

    render(){
        return(
            <div>
                <Card> 
                    <CardContent>
                        <h3>{clubs[0].name}</h3>
                        <p align = "start">
                            Match % : ${clubs[0].matchPercent}
                        </p>
                        <p align = "start">
                            Matched Interests : {clubs[0].matchedInterests.toString()}
                        </p>
                        <a href={clubs[0].clubLink} align="end">More Info About This Club</a>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
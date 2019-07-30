//this is the javascript file to describe the functions of the results page

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



//some dummy club data
//clubs should appear in order of match percent, then recent fb activity
const club1 = {
    name : "Sky @ UT Austin",
    logoLink : "https://se-infra-imageserver2.azureedge.net/clink/images/0194ab57-32ab-4123-abde-d411913e60402e9e7de8-d2a8-4c55-95c4-1322f50f9130.jpg?preset=med-sq",
    matchPercent : "78",
    matchedInterests : ["Meditation", "Well Being", "Self Care"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/artofliving",
    mostRecentFacebookActivity : "07042017",
    facebookLink : "https://www.facebook.com/ArtOfLivingUT"
};
const club2 = {
    name : "Absolute Texxas",
    logoLink : "https://se-infra-imageserver2.azureedge.net/clink/images/619e7f58-17c3-4a71-90f4-80e3ee2e3e37388ca14a-9b7e-47cd-8c12-5e1b5ec0d778.png?preset=med-sq",
    matchPercent : "65",
    matchedInterests : ["Social", "Greek Life"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/absolutetexxas",
    mostRecentFacebookActivity : "10102018",
    facebookLink : "https://www.facebook.com/Absolute-Texxas-102591403180373/"
};
const club3 = {
    name : "American Constitution Society",
    logoLink : "www.youtube.com",
    matchPercent : "31",
    matchedInterests : ["Political"],
    clubLink : "https://utexas.campuslabs.com/engage/organization/americanconstitutionsociety",
    mostRecentFacebookActivity : "",
    facebookLink : ""
}
const clubs = [club1, club2, club3];


export default class Results extends React.Component{
    //data will come in as a prop array "clubs"
    constructor(props){
        super(props);

        this.checkIfActive = this.checkIfActive.bind(this);
    }

    //this function will check if the passed in dates are within 
    //one year of today's date
    checkIfActive(recentFBActivity){
        if(!recentFBActivity){
            return false;
        }

        //parse into ints and add up total days for this date
        const recentFBActivityYear = parseInt(recentFBActivity.substring(4));
        const recentFBActivityMonth = parseInt(recentFBActivity.substring(2, 4));
        const recentFBActivityDate = parseInt(recentFBActivity.substring(0, 1));

        const recentTotal = (recentFBActivityYear * 365) + ((recentFBActivityMonth - 1) * 30.5) + recentFBActivityDate;

        //count up total days for this date
        const today = new Date();
        const todaysTotal = (today.getFullYear() * 365) + (today.getMonth() * 30.5) + today.getDate();

        //return whether these dates are within a year of each other or not
        return recentTotal + 365 >= todaysTotal;
    }

    render(){
        return(
            <div>
                {clubs.map(club => {
                    return (<Card> 
                                <CardContent>
                                    <h3>{club.name}</h3>
                                    <img src={club.logoLink} alt="(Not Found)"></img>
                                    <p align = "start">
                                        Match % : {club.matchPercent}
                                    </p>
                                    <p align = "start">
                                        Matched Interests : {club.matchedInterests.toString()}
                                    </p>
                                    <a href={club.clubLink} align="end">More Info About This Club</a>
                                    {this.checkIfActive(club.mostRecentFacebookActivity) ? <p></p> : 
                                        <p>
                                            It has been over 365 days since this club's last facebook
                                            post, so it is likely that this club is no longer active.
                                        </p>
                                    }
                                </CardContent>
                            </Card>)
                })}
            </div>
        )
    }
}


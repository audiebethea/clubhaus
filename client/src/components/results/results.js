//this is the javascript file to describe the functions of the results page
//import statements
import React from 'react';
import ResultCard from '../higherordercomponents/resultcard.js';
import HeaderBar from '../higherordercomponents/headerbar.js';

//some dummy club data
//clubs should appear in order of match percent, then recent fb activity
const club1 = {
    name : "Sky @ UT Austin",
    logoLink : "https://se-infra-imageserver2.azureedge.net/clink/images/0194ab57-32ab-4123-abde-d411913e60402e9e7de8-d2a8-4c55-95c4-1322f50f9130.jpg?preset=med-sq",
    matchPercent : "78",
    matchedInterests : ["Meditation", "Well Being", "Self Care"],
    description : 'The purpose of the Sky @ UT Austin is to bring the benefits of the Art of Living workshops to UT students and faculty.',
    clubLink : "https://utexas.campuslabs.com/engage/organization/artofliving",
};
const club2 = {
    name : "Absolute Texxas",
    logoLink : "https://se-infra-imageserver2.azureedge.net/clink/images/619e7f58-17c3-4a71-90f4-80e3ee2e3e37388ca14a-9b7e-47cd-8c12-5e1b5ec0d778.png?preset=med-sq",
    matchPercent : "65",
    matchedInterests : ["Social", "Greek Life"],
    description : 'Absolute Texxas is dedicated to developing men and women based upon the principles of individual leadership, personal integrity, and teamwork.',
    clubLink : "https://utexas.campuslabs.com/engage/organization/absolutetexxas",
};
const club3 = {
    name : "American Constitution Society",
    logoLink : "www.youtube.com",
    matchPercent : "31",
    matchedInterests : ["Political"],
    description : 'ACS is a progressive, law student organization at The University of Texas School of Law.',
    clubLink : "https://utexas.campuslabs.com/engage/organization/americanconstitutionsociety",
}
const clubs = [club1, club2, club3];


export default class Results extends React.Component{
    //data will come in as a prop array "clubs"
    constructor(props){
        super(props);
    }

    //happens as soon as component is called
    componentDidMount(){
        window.scrollTo(0,0);
    }

    //displayed
    render(){
        return(
            <div>
                <HeaderBar showBackButton={true} gotoPage={this.props.gotoPage} destination='Questionnaire'/>

                {clubs.map(club => {
                    return (
                            <ResultCard club={club}/>
                        )
                })}
            </div>
        )
    }
}


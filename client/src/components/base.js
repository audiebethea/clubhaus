//import statements
import React from 'react';
import UniversitySelect from './universityselect/universityselect.js';
import Questionnaire from './questionnaire/questionnaire.js';
import InterestResults from './results/interestresults.js';
import PoliticalResults from './results/politicalresults.js';
import ReligiousResults from './results/religiousresults.js';
import CulturalResults from './results/culturalresults.js';




//this component will serve as a starting point in my application
export default class Base extends React.Component{

    //constructor, which initializes state and binds gotoPage function
    constructor(props){
        super(props);

        this.state = {
            curPage : "UniversitySelect",
            chosenUniversity : "",
            chosenInterests : {},
            politicalAnswers : [],
            religiousAnswers : [],
            culturalAnswers : []
        }

        this.gotoPage = this.gotoPage.bind(this);
        this.updateUniversity = this.updateUniversity.bind(this);
        this.updateInterests = this.updateInterests.bind(this);
        this.updatePolitical = this.updatePolitical.bind(this);
        this.updateReligious = this.updateReligious.bind(this);
        this.updateCultural = this.updateCultural.bind(this);
    }

    //this function is used to navigate from one component to another
    gotoPage(pageName){
        this.setState({curPage : pageName});
    }

    //accepts university selected at universityselect to pass to questionnaire
    updateUniversity(university){
        this.setState({chosenUniversity : university});
    }

    //accepts interests from questionnaire, passed to results to make call
    updateInterests(interests){
        this.setState({chosenInterests : interests});
    }

    //accepts political answers from questionniare, passed to results to make call
    updatePolitical(filters){
        //make deep copy
        let newPolAnswers = [];
        filters.forEach(filter => newPolAnswers.push(filter));

        this.setState({politicalAnswers : newPolAnswers});
    }

    //accepts religious answers from questionniare, passed to results to make call
    updateReligious(filters){
        //make deep copy
        let newRelAnswers = [];
        filters.forEach(filter => newRelAnswers.push(filter));

        this.setState({religiousAnswers : newRelAnswers});
    }
    //accepts cultural answers from questionniare, passed to results to make call
    updateCultural(filters){
        //make deep copy
        let newCulAnswers = [];
        filters.forEach(filter => newCulAnswers.push(filter));

        this.setState({culturalAnswers : newCulAnswers});
    }

    //renders a specific component based on state
    render(){        
        // eslint-disable-next-line
        switch(this.state.curPage){
            case "UniversitySelect":
                return(
                    <div>
                        <UniversitySelect 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity} 
                            updateUniversity={this.updateUniversity}
                        />
                    </div>
                );
            case "Questionnaire":
                return(
                    <div>
                        <Questionnaire 
                            gotoPage={this.gotoPage} 
                            chosenUniversity={this.state.chosenUniversity}
                            chosenInterests={this.state.chosenInterests}
                            politicalAnswers={this.state.politicalAnswers}
                            religiousAnswers={this.state.religiousAnswers}
                            culturalAnswers={this.state.culturalAnswers}
                            updateInterests={this.updateInterests}
                            updatePolitical={this.updatePolitical}
                            updateReligious={this.updateReligious}
                            updateCultural={this.updateCultural}
                        />
                    </div>
                );
            case "InterestResults":
                return(
                    <div>
                        <InterestResults 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity}
                            chosenInterests={this.state.chosenInterests}
                            curPage={this.state.curPage}
                        />
                    </div>
                );
            case "PoliticalResults":
                return(
                    <div>
                        <PoliticalResults 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity}
                            politicalAnswers={this.state.politicalAnswers}
                            curPage={this.state.curPage}
                        />
                    </div>
                );
            case "ReligiousResults":
                return(
                    <div>
                        <ReligiousResults 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity}
                            religiousAnswers={this.state.religiousAnswers}
                            curPage={this.state.curPage}
                        />
                    </div>
                );
            case "CulturalResults":
                return(
                    <div>
                        <CulturalResults 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity}
                            culturalAnswers={this.state.culturalAnswers}
                            curPage={this.state.curPage}
                        />
                    </div>
                );
        }
    }
}



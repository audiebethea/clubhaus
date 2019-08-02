//import statements
import React from 'react';
import UniversitySelect from './universityselect/universityselect.js';
import Questionnaire from './questionnaire/questionnaire.js';
import Results from './results/results.js';



//this component will serve as a starting point in my application
export default class Base extends React.Component{

    //constructor, which initializes state and binds gotoPage function
    constructor(props){
        super(props);

        this.state = {
            curPage : "UniversitySelect",
            chosenUniversity : "",
            chosenInterests : [],
            chosenFilters : []
        }

        this.gotoPage = this.gotoPage.bind(this);
        this.updateUniversity = this.updateUniversity.bind(this);
        this.updateInterests = this.updateInterests.bind(this);
        this.updateFilters = this.updateFilters.bind(this);
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

    updateFilters(filters){
        this.setState({chosenFilters : filters});
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
                            updateInterests={this.updateInterests}
                            updateFilters={this.updateFilters}
                        />
                    </div>
                );
            case "Results":
                return(
                    <div>
                        <Results 
                            gotoPage={this.gotoPage}
                            chosenUniversity={this.state.chosenUniversity}
                            chosenInterests={this.state.chosenInterests}
                            chosenFilters={this.state.chosenFilters}
                        />
                    </div>
                );
        }
    }
}



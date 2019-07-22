//import statements
import React from 'react';
import UniversitySelect from './universityselect/universityselect.js';
//import Questionnaire from './questionnaire.js';
//import Results from './results.js';



//this component will serve as a starting point in my application
export default class Base extends React.Component{

    //constructor, which initializes state and binds gotoPage function
    constructor(props){
        super(props);

        this.state = {
            curPage : "UniversitySelect"
        }

        this.gotoPage = this.gotoPage.bind(this);
    }

    //this function is used to navigate from one component to another
    gotoPage(pageName){
        this.setState({curPage : pageName});
    }

    //renders a specific component based on state
    render(){        
        switch(this.state.curPage){
            case "UniversitySelect":
                return(
                    <div>
                        <UniversitySelect gotoPage={this.gotoPage} />
                    </div>
                );
            
        }
    }
}


/*case "Questionnaire":
                return(
                    <div>
                        <Questionnaire gotoPage={this.gotoPage} />
                    </div>
                );
            case "Results":
                return(
                    <div>
                        <Results gotoPage={this.gotoPage} />
                    </div>
                );
*/
//This file is the javascript used for the questionnaire portion of the app

//import statements
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import HeaderBar from '../higherordercomponents/headerbar.js';
import CheckboxGrid from '../higherordercomponents/checkboxgrid.js';
import NavButton from '../higherordercomponents/navbutton.js';
import './questionnaire.css';



//interests array
const INTERESTS = ['Academic', "Acting", 'Animation/Graphic Design', 'Architecture', "Art", 'Astronomy', 'Business', 'Cars', "Chess", 'Comedy', 
                        'Communications', 'Computer Science', 'Culture', '3-D printing', "Dancing", 'Debate', 'Event Hosting', 'Fashion', 'Fitness', "Food", 
                        "Gaming", 'Geology', 'Graduate', 'Greek Life', "Health Studies", 'Human Rights', "Intramurals", 'Law', 'Leadership', 'Magazine', 'Martial Arts', 'Magic Tricks',
                        'Music Performance/Production', 'Movies', 'Origami', 'Outdoors', 'Photography/Videography', 'Politics', 'Radio',
                        'Reading/Writing', 'Religion', 'Research', 'ROTC', 'Teaching', 'Sailing', 'Skating', 'Spirit Organization', 'Stock Market',
                        'Student Government', 'Study Abroad', 'Swordplay', 'Volunteering', 'Yoga'];
//questions array
const QUESTIONS = ["What political groups would you like to see?", "What religious groups would you like to see?", "What cultural groups would you like to see?"];
//answers arrays
const politicalAnswers = ["Not Interested", "Conservative", "Liberal", 'LGBTQ+', 'Pro-Choice', 'Pro-Life'];
const religiousAnswers = ["Not Interested", "Christian", "Muslim", "Hindu", 'Buddhist', 'Jewish', 'Sikh', 'Athiest'];
const culturalAnswers = ["Not Interested", "Asian", "European", "Latin", 'African', 'Arab', 
                            'Korean', 'Japanese', 'Chinese', 'Taiwanese', 'Thai', 'Vietnamese', 'Filipino', 'Indonesian', 'Indian', 'Bengali',
                            'Pakistani', 'Saudi Arabian', 'Afghanistani', 
                            'Scottish', 'Irish', 'Russian', 'Italian', 'Spanish', 'German', 'French', 'Greek', 'Armenian',
                            'Nigerian', 'Egyptian', 'Ethiopian', 
                            'Cuban', 'Mexican', 'Brazilian', 'Argentinian'];
const ANSWERS = [politicalAnswers, religiousAnswers, culturalAnswers];


export default class Questionnaire extends React.Component{
    //there will be a prop with the name of the chosen university
    constructor(props){
        super(props);

        this.state = {
            checkboxes : INTERESTS.reduce(
                (interests, interest) => ({
                    ...interests, [interest] : "Neutral" 
                }), 
                {}
            ),
            
            politicalAnswers : ["Not Interested"],
            religiousAnswers : ["Not Interested"],
            culturalAnswers : ["Not Interested"],
            hideErrorMessage : true,
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.myRef = React.createRef();   // Create a ref object for scrolling

    }

    //initializes the state to previous entries if they exist
    componentDidMount(){
        if(Object.keys(this.props.chosenInterests).length !== 0){
            this.setState({checkboxes : this.props.chosenInterests})
        }
        if(this.props.politicalAnswers.length !== 0){
            this.setState({politicalAnswers : this.props.politicalAnswers})
        }
        if(this.props.religiousAnswers.length !== 0){
            this.setState({religiousAnswers : this.props.religiousAnswers})
        }
        if(this.props.culturalAnswers.length !== 0){
            this.setState({culturalAnswers : this.props.culturalAnswers})
        }
        window.scrollTo(0,0);
    }

    //checkbox change event handler, changes checkbox and updates the state
    handleCheckboxChange(checkboxName, newStatus){
        this.setState(prevState => ({
            checkboxes : {
                ...prevState.checkboxes, [checkboxName] : newStatus
            }
        }))        
    }

    handleSelectionUpdate(selectedValue, relatedState, relatedStateName){
        let newState = relatedState;

        //if the client selects not interested, clear the state and input not interested
        if(selectedValue === "Not Interested"){
            newState.length = 0;
            newState.push("Not Interested");
        }
        //if the client picks something else
        else{
            //if the array contains Not Interested, must remove it
            const niIndex = relatedState.findIndex(answerValue => answerValue === "Not Interested");
            if(niIndex !== -1){
                newState.splice(niIndex, 1);
            }

            //search for selected value and add if not present, remove if present
            const selectedIndex = relatedState.findIndex(answerValue => answerValue === selectedValue);
            selectedIndex === -1 ? newState.push(selectedValue) : newState.splice(selectedIndex, 1);

            /*if the array is empty, add not interested
            since this can only happen if the user deselects
            all other options*/
            if(newState.length < 1){
                newState.length = 0;
                newState.push("Not Interested");            
            }
        }

        this.setState({[relatedStateName] : newState});
    }

    //handles submit
    onSubmit(destination){
        //check to make sure they checked at least one thing as interested
        if(destination === 'InterestResults' && !Object.values(this.state.checkboxes).includes("Interested")){
            this.setState({hideErrorMessage : false});
            window.scrollTo(0, this.myRef.current.offsetTop) 
        }
        //hides error message and sets base.js's state to track interest & filter responses
        else{
            this.setState({hideErrorMessage : true});
            this.props.updateInterests(this.state.checkboxes);
            this.props.updatePolitical(this.state.politicalAnswers);
            this.props.updateReligious(this.state.religiousAnswers);
            this.props.updateCultural(this.state.culturalAnswers);
            this.props.gotoPage(destination);
        }
    }


    render(){
        return(
            <div>
                <HeaderBar showBackButton={true} gotoPage={this.onSubmit} destination='UniversitySelect'/>

                <h1 className='section-title'>INTERESTS</h1>
                <p style={{margin : '0% 12%'}}>
                    These answers will be used to match you to clubs that you may
                    be interested in. Please specify if each activity is particularly 
                    interesting or uninteresting to you, and leave the rest at neutral.
                    You will not be shown clubs that contain activities that you find
                    uninteresting.
                </p>

                <hr className='underline'></hr>

                <p style={{color:'red', fontSize:'calc(10px + .5vw)'}} hidden={this.state.hideErrorMessage} ref={this.myRef}>
                    You must select at least one interest.
                    </p>

                <CheckboxGrid 
                    interests={INTERESTS} 
                    handleCheckboxChange={this.handleCheckboxChange}   
                    stateCheckboxes={this.state.checkboxes}
                />

                <h1 className='section-title'>QUESTIONS</h1>
                <p style={{margin : '0% 12%'}}>
                    Your answers for these questions will be used to filter out
                    clubs that you will likely not be interested in. Please select
                    every option that you are interested in seeing clubs about.
                </p>

                <hr className='underline'></hr>




                <div className='questions-grid'>
                    {QUESTIONS.map((question, index) => {
                        const answersToQuestion = ANSWERS[index];
                        let relatedState;
                        let relatedStateName;
                        if(index === 0){
                            relatedState = this.state.politicalAnswers;
                            relatedStateName = politicalAnswers;
                        }
                        else if(index === 1){
                            relatedState = this.state.religiousAnswers;
                            relatedStateName = religiousAnswers;
                        }
                        else{
                            relatedState = this.state.culturalAnswers;
                            relatedStateName = culturalAnswers;
                        }
                        return(
                            <div>
                                <h3 style={{fontSize : 'calc(12px + .8vw)'}}>{question}</h3>
                                {answersToQuestion.map(answer => {
                                    return (
                                        <FormControlLabel
                                            label =  {answer}
                                            labelPlacement = 'start'
                                            control={
                                                <Checkbox 
                                                    checked = {relatedState.includes(answer)}
                                                    onChange = {() => this.handleSelectionUpdate(answer, relatedState, relatedStateName)}
                                                    style = {{color : 'rgb(90, 201, 238)'}}
                                                />
                                            }
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

                <NavButton text="See your matched clubs!" onClick={this.onSubmit} destination='InterestResults'/>

            </div>
        )
    }
}

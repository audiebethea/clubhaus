//This file is the javascript used for the questionnaire portion of the app

//import statements
import React from 'react';
import Select from '@material-ui/core/NativeSelect';
import HeaderBar from '../higherordercomponents/headerbar.js';
import CheckboxGrid from '../higherordercomponents/checkboxgrid.js';
import NavButton from '../higherordercomponents/navbutton.js';
import './questionnaire.css';



//interests array
const INTERESTS = ["Acting", "Bowling", "Chess", "Dancing", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];
//questions array
const QUESTIONS = ["What political groups would you like to see?", "What religious groups would you like to see?", "What cultural groups would you like to see?"];
//answers arrays
const politicalAnswers = ["Not Interested", "Conservative", "Liberal",];
const religiousAnswers = ["Not Interested", "Christian", "Muslim", "Hindu",];
const culturalAnswers = ["Not Interested", "Asian", "European", "Latin"];
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

    handleSelectionUpdate(event, relatedState, relatedStateName){
        const selectedValue = event.target.value;

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
                    clubs that you will likely not be interested in. If some of the
                    questions feel too personal or you would not like to have your 
                    clubs filtered this way, please use the "Not Interested"
                    option.
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
                            <div style={{padding:'2.5%'}}>
                                <h3 className='question'>{question}</h3>
                                <Select 
                                    multiple
                                    autoWidth
                                    className='native-select'
                                    children = {answersToQuestion.map(answer => {
                                        if(relatedState.includes(answer)){
                                            return <option value={answer}>{answer} (selected)</option>
                                        }
                                        else{
                                            return <option value={answer}>{answer}</option>
                                        }
                                    })}
                                    onChange = {event => this.handleSelectionUpdate(event, relatedState, relatedStateName)}
                                />   
                            </div>
                        )
                    })}
                </div>

                <NavButton text="See your matched clubs!" onClick={this.onSubmit} destination='InterestResults'/>

                <p>{this.state.politicalAnswers.toString()}</p>
                <p>{this.state.religiousAnswers.toString()}</p>
                <p>{this.state.culturalAnswers.toString()}</p>


            </div>
        )
    }
}